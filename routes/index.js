const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetRequestToken = require(rootPrefix + '/app/services/GetRequestToken'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  httpErrorCodes = require(rootPrefix + '/lib/globalConstant/httpErrorCodes'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get(pagePathConstants.home, async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  /** Always, uncomment and commit **/
  let getRequestTokenObj = new GetRequestToken({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getRequestTokenObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.isFailure() &&
    apiResponse._fetchHttpCode(errorConfig.api_error_config || {}) == httpErrorCodes.temporaryRedirectErrorCode) {
    responseHelper.renderApiResponse(apiResponse, res, errorConfig);
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

/* GET home page. */
router.get('/twitter/auth', async function (req, res, next) {

  if (!req.decodedParams.rd) {
    let redirectUrl = req.url + '&rd=1';
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: redirectUrl});
  }

  let twitterAuthenticateObj = new TwitterAuthenticate({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await twitterAuthenticateObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: pagePathConstants.account});
  } else {
    renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=1`});
  }

});


module.exports = router;
