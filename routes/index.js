const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const rootPrefix = '..',
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const errorConfig = basicHelper.fetchErrorConfig();

router.use(cookieParser(cookieConstants.WEB_COOKIE_SECRET));

const setNewCookies = async function (requestObj, responseObj) {
  let newCookies = requestObj.cookies[cookieConstants.newCookieName];

  for (let cookieName in newCookies) {
    let cookieData = newCookies[cookieName];
    responseObj.cookie(cookieName, cookieData.value, cookieData.options); // Options is optional
  }
};

/* GET home page. */
router.get('/', async function (req, res, next) {

  let twitterRedirectUrl = null;

  /** Never Uncomment and Commit This **/
  // twitterRedirectUrl = "/for-local-testing-only"

  /** Always, uncomment and commit **/

  let PreLaunchInviteObj = new PreLaunchInvite(req.cookies, {});
  let apiResponse = await PreLaunchInviteObj.getRequestToken(req.decodedParams);

  setNewCookies(req, res);

  if (apiResponse.success && apiResponse.data) {
    let twitterRedirectUrl = coreConstants.TWITTER_OAUTH_URL + apiResponse.data.oAuthToken;
    renderResponseHelper.renderWithLayout(res, 'loggedOut', 'web/_home', {
      twitterRedirectUrl: twitterRedirectUrl
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});

/* GET home page. */
router.get('/twitter/auth', async function (req, res, next) {

  let PreLaunchInviteObj = new PreLaunchInvite(req.cookies, {});
  let apiResponse = await PreLaunchInviteObj.twitterLogin(req.decodedParams);

  setNewCookies(req, res);

  if (apiResponse.success) {
    res.redirect('/success');
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});


module.exports = router;
