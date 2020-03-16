const rootPrefix = '.';

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  helmet = require('helmet'),
  customUrlParser = require('url'),
  URL = require('url').URL,
  createNamespace = require('continuation-local-storage').createNamespace;

const elbHealthCheckerRoute = require(rootPrefix + '/routes/elb_health_checker'),
  pepoRoutes = require(rootPrefix + '/routes/pepo/index'),
  storeRoutes = require(rootPrefix + '/routes/store/index'),
  inviteRoutes = require(rootPrefix + '/routes/invite/index'),
  webviewRoutes = require(rootPrefix + '/routes/webview/index'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  customMiddleware = require(rootPrefix + '/helpers/customMiddleware'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer');

const requestSharedNameSpace = createNamespace('pepoWebNameSpace');

const errorConfig = basicHelper.fetchErrorConfig();

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
  logger.step(message);

  if (!basicHelper.isProduction()) {
    logger.step(
      '\nHEADERS FOR CURRENT REQUEST=====================================\n',
      JSON.stringify(req.headers),
      '\n========================================================'
    );
  }

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

const pepoHostName = new URL(coreConstants.PEPO_DOMAIN).hostname;
const pepoStoreHostName = new URL(coreConstants.PEPO_STORE_DOMAIN).hostname;
const pepoInviteHostName = new URL(coreConstants.PEPO_INVITE_DOMAIN).hostname;

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
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Node.js body parsing middleware.
app.use(bodyParser.json());

// Parsing the URL-encoded data with the qs library (extended: true)
app.use(bodyParser.urlencoded({ extended: true }));

// Sanitize request body and query params
// NOTE: dynamic variables in URL will be sanitized in routes
app.use(sanitizer.sanitizeBodyAndQuery, assignParams);

app.use('/health-checker', elbHealthCheckerRoute);

// Start Request logging. Placed below static and health check to reduce logs
app.use(appendRequestDebugInfo, startRequestLogLine);

// set response Headers
app.use(setResponseHeader);

app.use('/', function(request, response, next){

  if (request.hostname === pepoHostName) {
    if (request.url.match('^' + pagePathConstants.webview + '/')) {
      webviewRoutes(request, response, next);
    } else {
      pepoRoutes(request, response, next);
    }
  } else if(request.hostname === pepoStoreHostName) {
    storeRoutes(request, response, next);
  } else if(request.hostname === pepoInviteHostName) {
    inviteRoutes(request, response, next);
  } else {
    next();
  }
});

// connect-assets relies on to use defaults in config
const connectAssetConfig = {
  paths: [path.join(__dirname, 'assets/css'), path.join(__dirname, 'assets/js')],
  buildDir: path.join(__dirname, 'builtAssets'),
  fingerprinting: (coreConstants.environment !== 'development'),
  servePath: 'assets'
};

if (coreConstants.environment !== 'development') {
  connectAssetConfig.servePath = coreConstants.CLOUD_FRONT_BASE_DOMAIN + coreConstants.APP_NAME + '/js-css';
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

  let errorObject = null;

  if (err.code == 'EBADCSRFTOKEN') {
    logger.error('a_3', 'Bad CSRF TOKEN', err);

    errorObject = responseHelper.error({
      internal_error_identifier: 'a_3',
      api_error_identifier: 'forbidden_api_request',
      debug_options: {}
    });
  } else {
    logger.error('a_2', 'Something went wrong', err);

    errorObject = responseHelper.error({
      internal_error_identifier: 'a_2',
      api_error_identifier: 'something_went_wrong',
      debug_options: {}
    });
  }
  return responseHelper.renderApiResponse(errorObject, res, errorConfig);
});

module.exports = app;
