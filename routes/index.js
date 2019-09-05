const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const rootPrefix = '..',
  GetRequestToken = require(rootPrefix + '/app/services/GetRequestToken'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const errorConfig = basicHelper.fetchErrorConfig();

router.use(cookieParser(cookieConstants.WEB_COOKIE_SECRET));

/* GET home page. */
router.get('/', async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11"}}; // "/for-local-testing-only"

  /** Always, uncomment and commit **/

  let getRequestTokenObj = new GetRequestToken({cookies: req.cookies, decodedParams: req.decodedParams});
  let apiResponse = await getRequestTokenObj.perform();

  if (apiResponse.success) {
    cookieHelper.setNewCookies(req, res);
    let twitterRedirectUrl = coreConstants.TWITTER_OAUTH_URL + apiResponse.data.oAuthToken;
    renderResponseHelper.renderWithLayout(res, 'loggedOut', 'web/_home', apiResponse.data);
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
