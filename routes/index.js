const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const rootPrefix = '..',
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

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
  if ( !apiResponse.success || !apiResponse.data) { 
    return res.status(500).render('error/500');
  }
  twitterRedirectUrl = coreConstants.TWITTER_OAUTH_URL + apiResponse.data.oAuthToken;


  renderResponseHelper.renderWithLayout(res, 'loggedOut', 'web/_home', {
      twitterRedirectUrl: twitterRedirectUrl
  });
});

module.exports = router;
