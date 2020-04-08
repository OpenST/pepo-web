const express = require('express'),
  cookieParser = require('cookie-parser'),
  router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

const cookieDefaultOptions = {
  httpOnly: true,
  signed: true,
  path: '/',
  domain: coreConstants.MEETLY_COOKIE_DOMAIN,
  secure: basicHelper.isProduction(),
  sameSite: 'strict'
};

//todo: use another secret for meetly?
router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

/**
 * get utm params
 *
 */
const getUtmFromParams = function (requestObj) {

  const params = requestObj.query || {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_type'];

  const utmParams = {};

  for (let i = 0; i < utmKeys.length; i++) {
    const utmKey = utmKeys[i];
    if (params[utmKey]) {
      utmParams[utmKey] = params[utmKey];
    }
  }

  return utmParams;
};

/**
 * Fetch utm cookie if present otherwise get from query params and set cookie
 *
 * @param requestObj
 */
const parseAndSetUtm = function (requestObj, responseObj, next) {
  let cookieVal = requestObj.signedCookies[cookieConstants.meetlyUtmCookieName];

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_type'];

  let utmParams = {};

  if (cookieVal) {
    cookieVal = JSON.parse(cookieVal);

    for (let i = 0; i < utmKeys.length; i++) {
      const utmKey = utmKeys[i];
      if (cookieVal[utmKey]) {
        utmParams[utmKey] = cookieVal[utmKey];
      }
    }

  } else {
    utmParams = getUtmFromParams(requestObj);
  }

  if (Object.keys(utmParams).length > 0) {

    let options = Object.assign({}, cookieDefaultOptions, {
      maxAge: 1000 * cookieConstants.meetlyUtmCookieExpiryTime
    });

    // Set cookie
    responseObj.cookie(cookieConstants.meetlyUtmCookieName, JSON.stringify(utmParams), options); // Options is optional.
    requestObj.decodedParams.utm_params = utmParams;
  }

  next();
};

router.use(parseAndSetUtm);

router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  return webRouteHelper.perform(req, res, '/app/services/GetMeetlySplashPage', 'meetlySplash', 'web/_meetlySplash', 'r_m_s_1');
});


module.exports = router;


