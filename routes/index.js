var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

const rootPrefix = '..',
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

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

  let PreLaunchInviteObj = new PreLaunchInvite(req.cookies, {});
  let apiResponse = await PreLaunchInviteObj.getRequestToken(req.decodedParams);

  setNewCookies(req, res);

  if (apiResponse.success && apiResponse.data) {
    let twitterRedirectUrl = coreConstants.TWITTER_OAUTH_URL + apiResponse.data.oAuthToken;
    res.render('loggedOut',
      {
        title: 'pepo',
        page: 'Home Pepo',
        pageMeta: {css: ["home", "common"]},
        twitterRedirectUrl: twitterRedirectUrl
      }
    );
  } else {
    return res.status(500).render('error/500');
  }

});

module.exports = router;
