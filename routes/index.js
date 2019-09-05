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
  let getRequestTokenObj = new GetRequestToken({cookies: req.cookies, decodedParams: req.decodedParams});
  let apiResponse = await getRequestTokenObj.perform();

  if (apiResponse.success) {
    cookieHelper.setNewCookies(req, res);
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', apiResponse.data);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});

/* GET home page. */
router.get('/twitter/auth', async function (req, res, next) {

  let twitterAuthenticateObj = new TwitterAuthenticate({cookies: req.cookies, decodedParams: req.decodedParams});
  let apiResponse = await twitterAuthenticateObj.perform();

  if (apiResponse.success) {
    cookieHelper.setNewCookies(req, res);
    res.redirect(pagePathConstants.account);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});


module.exports = router;
