const rootPrefix = '.';

const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  basicAuth = require('basic-auth'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  customUrlParser = require('url'),
  createNamespace = require('continuation-local-storage').createNamespace;

const indexRouter = require(rootPrefix + '/routes/index'),
  usersRouter = require(rootPrefix + '/routes/users'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  customMiddleware = require(rootPrefix + '/helpers/customMiddleware'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  elbHealthCheckerRoute = require(rootPrefix + '/routes/elb_health_checker');
  sanitizer = require(rootPrefix + '/helpers/sanitizer');

const requestSharedNameSpace = createNamespace('pepoWebNameSpace');

const errorConfig = basicHelper.fetchErrorConfig();

const basicAuthentication = function(req, res, next) {
  if (!coreConstants.USE_BASIC_AUTHENTICATION) {
    return next();
  }

  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

    return res.status(401).render(`error/401`);
  }

  let user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (
    user.name === coreConstants.BASIC_AUTHENTICATION_USERNAME &&
    user.pass === coreConstants.BASIC_AUTHENTICATION_PASSWORD
  ) {
    return next();
  } else {
    return unauthorized(res);
  }
};

/**
 * TODO CRITICAL: CSRF NOT INTEGRATED
 */
const csrfProtection = csrf({
  cookie: {
    key: cookieConstants.csrfCookieName,
    maxAge: 1 * 60 * 60 * 24 * 30,
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    secure: basicHelper.isProduction(), // Marks the cookie to be used with HTTPS only
    path: '/',
    sameSite: 'strict', // sets the same site policy for the cookie
    domain: coreConstants.COOKIE_DOMAIN
  }
});

morgan.token('id', function getId(req) {
  return req.id;
});

morgan.token('endTime', function getendTime(req) {
  return basicHelper.logDateFormat();
});

morgan.token('endDateTime', function getEndDateTime(req) {
  return basicHelper.logDateFormat();
});

const startRequestLogLine = function(req, res, next) {
  let message =
    "Started '" +
    customUrlParser.parse(req.originalUrl).pathname +
    "'  '" +
    req.method +
    "' at " +
    basicHelper.logDateFormat() +
    " from agent " +
    req.headers['user-agent'];
  console.log(message);

  next();
};

/**
 * Assign params
 *
 * @param req
 * @param res
 * @param next
 */
const assignParams = function(req, res, next) {
  // IMPORTANT NOTE: Don't assign parameters before sanitization
  // Also override any request params, related to signatures
  // And finally assign it to req.decodedParams
  req.decodedParams = Object.assign(getRequestParams(req), req.decodedParams);

  next();
};

/**
 * Get request params
 *
 * @param req
 * @return {*}
 */
const getRequestParams = function(req) {
  // IMPORTANT NOTE: Don't assign parameters before sanitization
  if (req.method === 'POST') {
    return req.body;
  } else if (req.method === 'GET') {
    return req.query;
  }

  return {};
};

// Set request debugging/logging details to shared namespace
const appendRequestDebugInfo = function(req, res, next) {
  requestSharedNameSpace.run(function() {
    requestSharedNameSpace.set('reqId', req.id);
    requestSharedNameSpace.set('startTime', req.startTime);
    next();
  });
};

const setResponseHeader = async function(req, res, next) {
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate, post-check=0, pre-check=0');
  res.setHeader('Vary', '*');
  res.setHeader('Expires', '-1');
  res.setHeader('Last-Modified', new Date().toUTCString());
  next();
};

// Set worker process title
process.title = 'Pepo Web node worker';

const app = express();

// Add id and startTime to request
app.use(customMiddleware());

// Load Morgan
app.use(
  morgan(
    '[:id][:endTime][' +
    coreConstants.APP_NAME +
    '] Completed with ":status" in :response-time ms at :endDateTime -  ":res[content-length] bytes" - ":remote-addr" ":remote-user" - "HTTP/:http-version :method :url" - ":referrer" - ":user-agent"'
  )
);

// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Node.js body parsing middleware.
app.use(bodyParser.json());

// Parsing the URL-encoded data with the qs library (extended: true)
app.use(bodyParser.urlencoded({ extended: true }));

// Sanitize request body and query params
// NOTE: dynamic variables in URL will be sanitized in routes
app.use(sanitizer.sanitizeBodyAndQuery);

app.use(assignParams);

app.use('/health-checker', elbHealthCheckerRoute);

// TODO LAUNCH - remove when launched and delete oldHome.ejs file
app.get('/', function(req, res, next) {
  return res.status(200).render('oldHome');
});

// Add basic auth in chain
app.use(basicAuthentication);

app.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

app.use(express.static(path.join(__dirname, 'public')));

// Start Request logging. Placed below static and health check to reduce logs
app.use(appendRequestDebugInfo, startRequestLogLine);

// set response Headers
app.use(setResponseHeader);

// TODO LAUNCH - replace /new with /

app.use(csrfProtection);

app.use('/', indexRouter);
app.use(pagePathConstants.account, usersRouter);

// connect-assets relies on to use defaults in config
const connectAssetConfig = {
  paths: [path.join(__dirname, 'assets/css'), path.join(__dirname, 'assets/js')],
  buildDir: path.join(__dirname, 'builtAssets'),
  fingerprinting: true,
  servePath: 'assets'
};

if (coreConstants.environment !== 'development') {
  connectAssetConfig.servePath = coreConstants.CLOUD_FRONT_BASE_DOMAIN + coreConstants.appName + '/js-css';
  connectAssetConfig.bundle = true;
  connectAssetConfig.compress = true;
}

let connectAssets = require('connect-assets');
app.use(connectAssets(connectAssetConfig));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return responseHelper.renderApiResponse(
    responseHelper.error({
      internal_error_identifier: 'a_1',
      api_error_identifier: 'resource_not_found',
      debug_options: {}
    }),
    res,
    errorConfig
  );
});

// Error handler
app.use(async function(err, req, res, next) {
  logger.error('a_2', 'Something went wrong', err);

  let errorObject = responseHelper.error({
    internal_error_identifier: 'a_2',
    api_error_identifier: 'something_went_wrong',
    debug_options: {}
  });

  return responseHelper.renderApiResponse(errorObject, res, errorConfig);
});

module.exports = app;
