const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetRequestToken = require(rootPrefix + '/app/services/GetRequestToken'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get('/', async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  /** Always, uncomment and commit **/
  let getRequestTokenObj = new GetRequestToken({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getRequestTokenObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', apiResponse.data);
  } else {
    renderResponseHelper.renderWithLayout(res, 'loggedOut', 'web/_home', {twitterRedirectUrl: '#', twitterSigninError: 0});
  }

});

/* GET home page. */
router.get('/twitter/auth', async function (req, res, next) {

  let twitterAuthenticateObj = new TwitterAuthenticate({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await twitterAuthenticateObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    res.redirect(pagePathConstants.account);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});


module.exports = router;
