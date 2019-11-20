const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  basicAuth = require('basic-auth');

const errorConfig = basicHelper.fetchErrorConfig();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  staticContentsRoute = require(rootPrefix + '/routes/pepo/staticContents'),
  homeRouter = require(rootPrefix + '/routes/pepo/home'),
  usersRouter = require(rootPrefix + '/routes/pepo/users'),
  redemptionsRouter = require(rootPrefix + '/routes/pepo/redemptions'),
  supportRouter = require(rootPrefix + '/routes/pepo/support'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  GetVideoUrl = require(rootPrefix + '/app/services/GetVideoUrl');

const basicAuthentication = function(req, res, next) {
  if (!coreConstants.USE_BASIC_AUTHENTICATION) {
    return next();
  }

  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

    return res.status(401).render(`error/401`, { redirectUrl: coreConstants.PEPO_DOMAIN });
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

router.use('/', staticContentsRoute);

// Add basic auth in chain
router.use(basicAuthentication);

router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

router.use(csrfProtection);

router.use(pagePathConstants.home, homeRouter);
// router.use(pagePathConstants.account, usersRouter);
router.use(pagePathConstants.redemptions, redemptionsRouter);
router.use(pagePathConstants.support, supportRouter);

router.use(pagePathConstants.video, sanitizer.sanitizeDynamicUrlParams, async function(req, res, next) {
  // Process the data received in req.body.
  req.decodedParams.video_id =  req.params.video_id;
  const apiResponse = await new GetVideoUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    res.redirect(301, apiResponse.data.url);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});
module.exports = router;
