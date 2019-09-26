const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  deepLinkingConstants = require(rootPrefix + '/lib/globalConstant/deepLinking'),
  GetRequestToken = require(rootPrefix + '/app/services/GetRequestToken'),
  DoubleOptIn = require(rootPrefix + '/app/services/DoubleOptIn'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  apiInternalCodesConstants = require(rootPrefix + '/lib/globalConstant/apiInternalCodes'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  httpErrorCodes = require(rootPrefix + '/lib/globalConstant/httpErrorCodes'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get(pagePathConstants.home, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  /** Always, uncomment and commit **/
  let getRequestTokenObj = new GetRequestToken({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getRequestTokenObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.isFailure() &&
    apiResponse._fetchHttpCode(errorConfig.api_error_config || {}) == httpErrorCodes.temporaryRedirectErrorCode) {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', apiResponse.data);
  } else {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
      twitterRedirectUrl: '#',
      twitterSigninError: 0
    });
  }

});

router.get(pagePathConstants.privacy, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://www.dropbox.com/s/yg4zq9z4cz2zynb/Pepo%2520Privacy%2520Policy.pdf?dl=0');
});

router.get(pagePathConstants.terms, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://www.dropbox.com/s/v9e7hsdx9yc3eg7/Pepo%20Terms%20of%20Service.pdf?dl=0');
});

/* Redirect videos */
router.get('/videos/:id', function (req, res) {
  return res.redirect(302, coreConstants.PEPO_DOMAIN);
});

/* Double opt in page. */
router.get(pagePathConstants.doubleOptIn, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  /** Always, uncomment and commit **/
  let doubleOptInObj = new DoubleOptIn({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await doubleOptInObj.perform();


  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_doptin', {success: true});
  } else {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_doptin', {success: false});
  }

});

/* GET home page. */
router.get('/twitter/auth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  if (!req.decodedParams.rd) {
    if (!req.decodedParams.oauth_token || !req.decodedParams.oauth_verifier) {
      return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=1`});
    }

    let redirectUrl = req.path + `?oauth_token=${escape(req.decodedParams.oauth_token)}&oauth_verifier=${escape(req.decodedParams.oauth_verifier)}&rd=1`;
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: redirectUrl});
  }

  let twitterAuthenticateObj = new TwitterAuthenticate({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await twitterAuthenticateObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    let redirectUrl = pagePathConstants.account;
    if (apiResponse.data['newSignup']) {
      redirectUrl = redirectUrl + '#new'
    }
    renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: redirectUrl});
  } else {
    const parsedResponse = apiResponse.getDebugData();
    if (parsedResponse.err.code === apiInternalCodesConstants.alreadyRegisteredUserInApp) {
      renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=2`});
    } else {
      renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=1`});
    }
  }

});

module.exports = router;
