const rootPrefix = '.';

const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  customUrlParser = require('url'),
  createNamespace = require('continuation-local-storage').createNamespace;

const responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  indexRouter = require(rootPrefix + '/routes/index'),
  usersRouter = require(rootPrefix + '/routes/users'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  customMiddleware = require(rootPrefix + '/helpers/customMiddleware'),
  coreConstant = require(rootPrefix + '/config/coreConstants');

const requestSharedNameSpace = createNamespace('pepoWebNameSpace');

const errorConfig = basicHelper.fetchErrorConfig();

const csrfProtection = csrf({
  cookie: {
    maxAge: 1000 * 5 * 60, // Cookie would expire after 5 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    secure: true, // Marks the cookie to be used with HTTPS only
    path: '/',
    sameSite: 'strict', // sets the same site policy for the cookie
    domain: coreConstant.COOKIE_DOMAIN
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
    basicHelper.logDateFormat();
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

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Start Request logging. Placed below static and health check to reduce logs
app.use(appendRequestDebugInfo, startRequestLogLine);

// set response Headers
app.use(setResponseHeader);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
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
