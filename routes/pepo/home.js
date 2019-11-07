const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  DoubleOptIn = require(rootPrefix + '/app/services/DoubleOptIn'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  apiInternalCodesConstants = require(rootPrefix + '/lib/globalConstant/apiInternalCodes'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get(pagePathConstants.home, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appUpdateLinksConstants.androidUpdateLink,
    iosAppLink: appUpdateLinksConstants.iosUpdateLink
  });
});

/* GET what grinds my gears. */
router.get('/whatgrindsmygears', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appUpdateLinksConstants.androidUpdateLink,
    iosAppLink: appUpdateLinksConstants.iosUpdateLink,
    pageMeta: {
      title: 'Pepo | What grinds my gears',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET epicenter */
router.get('/epicenter', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appUpdateLinksConstants.androidUpdateLink,
    iosAppLink: appUpdateLinksConstants.iosUpdateLink,
    pageMeta: {
      title: 'Pepo | Epicenter',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET brave. */
router.get('/brave', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/brave',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/brave',
    pageMeta: {
      title: 'Pepo | Brave',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET brave desktop. */
router.get('/brave/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/brave in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/brave' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/brave' + "/desktop",
    pageMeta: {
      title: 'Pepo | Brave',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET linkedin. */
router.get('/linkedin', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/linkedin',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/linkedin',
    pageMeta: {
      title: 'Pepo | Linkedin',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET linkedin desktop. */
router.get('/linkedin/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/linkedin in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/linkedin' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/linkedin' + "/desktop",
    pageMeta: {
      title: 'Pepo | Linkedin',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET facebook. */
router.get('/facebook', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/facebook',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/facebook',
    pageMeta: {
      title: 'Pepo | Facebook',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET facebook desktop. */
router.get('/facebook/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/facebook in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/facebook' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/facebook' + "/desktop",
    pageMeta: {
      title: 'Pepo | Facebook',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET etherscan. */
router.get('/etherscan', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/etherscan',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/etherscan',
    pageMeta: {
      title: 'Pepo | Etherscan',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET etherscan desktop. */
router.get('/etherscan/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/etherscan in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/etherscan' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/etherscan' + "/desktop",
    pageMeta: {
      title: 'Pepo | Etherscan',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET ph. */
router.get('/ph', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/ph',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/ph',
    pageMeta: {
      title: 'Pepo | PH',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET ph desktop. */
router.get('/ph/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/ph in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/ph' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/ph' + "/desktop",
    pageMeta: {
      title: 'Pepo | PH',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET reddit. */
router.get('/reddit', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/reddit',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/reddit',
    pageMeta: {
      title: 'Pepo | Reddit',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET reddit desktop. */
router.get('/reddit/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/reddit in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/reddit' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/reddit' + "/desktop",
    pageMeta: {
      title: 'Pepo | Reddit',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET google. */
router.get('/google', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/google',
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/google',
    pageMeta: {
      title: 'Pepo | Google',
      robots: 'noindex, nofollow'
    }
  });
});

/* GET google desktop. */
router.get('/google/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/google in your mobile browser",
    androidAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/google' + "/desktop",
    iosAppLink: coreConstants.PEPO_INVITE_DOMAIN + '/google' + "/desktop",
    pageMeta: {
      title: 'Pepo | Google',
      robots: 'noindex, nofollow'
    }
  });
});

router.get(pagePathConstants.privacy, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1si1J9PXkW7mLplUy_CJTNXTsi1OtNRiD/view?usp=sharing');
});

router.get(pagePathConstants.terms, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1LCQ7v1BOrwwbMfHM0xjWwefDpSNu0BlG/view?usp=sharing');
});

router.get(pagePathConstants.imprint, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1oj1BvXqmaBgTTi8HwQgFCCGWtVOZiSTU/view?usp=sharing');
});

router.get(pagePathConstants.mediaKit, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://www.dropbox.com/sh/3r5zr84dyp3dvv0/AACuKAhLTNHaPcn6TttbY_BOa?dl=0');
});

/* Redirect videos */
router.get('/video/:id', function (req, res) {
  return res.redirect(302, coreConstants.PEPO_DOMAIN);
});

/* Redirect tag pages */
router.get('/tags/:tagname', function (req, res) {
  return res.redirect(302, coreConstants.PEPO_DOMAIN);
});

/* Double opt in page. */
router.get(pagePathConstants.doubleOptIn, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Always, uncomment and commit **/
  let doubleOptInObj = new DoubleOptIn({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await doubleOptInObj.perform();

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

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

router.get(pagePathConstants.contentTerms, function (req, res) {
  renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_content_terms');
});

router.get(pagePathConstants.about, function (req, res) {
  renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_about',
    {
      view_endpoint :`${coreConstants.VIEW_WEB_ROOT}`,
      etherscan_endpoint : `${coreConstants.ETHERSCAN_WEB_ROOT}`,
      chain_id : `${coreConstants.CHAIN_ID}`,
      ubt_address : `${coreConstants.UBT_ADDRESS}`,
      etherscan_address : `${coreConstants.BT_CONTRACT_ADDRESS}`,
      app_version : req.headers["x-pepo-app-version"] || '',
      build_number : req.headers["x-pepo-build-number"] || '',
    }
  );
});

router.get(pagePathConstants.faqs, function (req, res) {
  res.redirect(302, 'https://intercom.help/pepo');
});

module.exports = router;
