const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  GetFirebaseInviteUrl = require(rootPrefix + '/app/services/FireBaseUrl/Invite'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

const errorConfig = basicHelper.fetchErrorConfig();

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

router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

router.use(csrfProtection);

router.get('*', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {
  // Extract invite code from url
  // Step 1: Remove first and last slash from path, if present.
  const parsedPath = req.path.replace(/\/*$/, "").replace(/^\/*/, "").trim();
  // Step 2: If parsedPath doesn't contain slash and is not blank, then consider it as invite code.
  req.decodedParams.code = (parsedPath === '' || parsedPath.includes('/')) ? '' : parsedPath;

  // Process the data received in req.body.
  const apiResponse = await new GetFirebaseInviteUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {
      redirect_to_location: apiResponse.data.url,
      pageMeta: apiResponse.data.pageMeta
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
