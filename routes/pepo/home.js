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
let utmQueryString = '';

const filterUtmParams = function(req, res, next) {
  utmQueryString +=  req.query.utm_campaign ? '&utm_campaign=' + req.query.utm_campaign : '';
  utmQueryString +=  req.query.utm_medium ? '&utm_medium=' + req.query.utm_medium : '';
  utmQueryString +=  req.query.utm_source ? '&utm_source=' + req.query.utm_source : '';
  utmQueryString +=  req.query.utm_term ? '&utm_term=' + req.query.utm_term : '';
  utmQueryString +=  req.query.utm_content ? '&utm_content=' + req.query.utm_content : '';

  next();
};

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
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/whatgrindsmygears'
    }
  });
});

/* GET  What grinds my gears desktop. */
router.get('/whatgrindsmygears/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/whatgrindsmygears';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/whatgrindsmygears in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | What grinds my gears',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/whatgrindsmygears/desktop'
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
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/epicenter'
    }
  });
});

/* GET epicenter desktop. */
router.get('/epicenter/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/epicenter';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/epicenter in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Epicenter',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/epicenter/desktop'
    }
  });
});

/* GET brave. */
router.get('/brave', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/brave';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Brave',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/brave'
    }
  });
});

/* GET brave desktop. */
router.get('/brave/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/brave';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/brave in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Brave',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/brave/desktop'
    }
  });
});

/* GET linkedin. */
router.get('/linkedin', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/linkedin';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Linkedin',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/linkedin'
    }
  });
});

/* GET linkedin desktop. */
router.get('/linkedin/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/linkedin';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/linkedin in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Linkedin',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/linkedin/desktop'
    }
  });
});

/* GET facebook. */
router.get('/facebook', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/facebook';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Facebook',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/facebook'
    }
  });
});

/* GET facebook desktop. */
router.get('/facebook/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/facebook';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/facebook in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Facebook',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/facebook/desktop'
    }
  });
});

/* GET etherscan. */
router.get('/etherscan', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/etherscan';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Etherscan',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/etherscan'
    }
  });
});

/* GET etherscan desktop. */
router.get('/etherscan/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/etherscan';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/etherscan in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Etherscan',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/etherscan/desktop'
    }
  });
});

/* GET ph. */
router.get('/ph', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/ph';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | PH',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/ph'
    }
  });
});

/* GET ph desktop. */
router.get('/ph/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/ph';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/ph in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | PH',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/ph/desktop'
    }
  });
});

/* GET reddit. */
router.get('/reddit', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/reddit';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Reddit',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/reddit'
    }
  });
});

/* GET reddit desktop. */
router.get('/reddit/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/reddit';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/reddit in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Reddit',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/reddit/desktop'
    }
  });
});

/* GET google. */
router.get('/google', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/google';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Google',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/google'
    }
  });
});

/* GET google desktop. */
router.get('/google/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/google';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/google in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Google',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/google/desktop'
    }
  });
});

/* GET stories. */
router.get('/stories', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/stories';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Stories',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/stories'
    }
  });
});

/* GET stories desktop. */
router.get('/stories/desktop', sanitizer.sanitizeDynamicUrlParams, filterUtmParams, async function (req, res, next) {
  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/stories';

  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
    utmQueryString = '';
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/stories in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Stories',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/stories/desktop'
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
