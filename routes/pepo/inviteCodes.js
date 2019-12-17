const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const filterUtmParams = function(req) {
  let utmQueryString = '';
  utmQueryString +=  req.query.utm_campaign ? '&utm_campaign=' + req.query.utm_campaign : '';
  utmQueryString +=  req.query.utm_medium ? '&utm_medium=' + req.query.utm_medium : '';
  utmQueryString +=  req.query.utm_source ? '&utm_source=' + req.query.utm_source : '';
  utmQueryString +=  req.query.utm_term ? '&utm_term=' + req.query.utm_term : '';
  utmQueryString +=  req.query.utm_content ? '&utm_content=' + req.query.utm_content : '';
  return utmQueryString;
};

/* GET what grinds my gears. */
router.get('/whatgrindsmygears', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  
  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/whatgrindsmygears';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | What grinds my gears',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/whatgrindsmygears'
    }
  });
});

/* GET  What grinds my gears desktop. */
router.get('/whatgrindsmygears/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/whatgrindsmygears';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/epicenter';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
  }
  
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Epicenter',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/epicenter'
    }
  });
});

/* GET epicenter desktop. */
router.get('/epicenter/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/epicenter';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/brave', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/brave';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/brave/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/brave';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/linkedin', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/linkedin';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/linkedin/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/linkedin';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/facebook', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/facebook';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/facebook/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/facebook';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/etherscan', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/etherscan';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/etherscan/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/etherscan';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/ph', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/ph';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/ph/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/ph';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/reddit', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/reddit';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/reddit/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/reddit';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/google', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/google';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/google/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/google';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/stories', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/stories';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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
router.get('/stories/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/stories';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
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

/* GET tw. */
router.get('/tw', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/tw';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    hideUberBanner: 1,
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Twitter',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/tw'
    }
  });
});

/* GET tw desktop. */
router.get('/tw/desktop', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  let appDownloadLink = coreConstants.PEPO_INVITE_DOMAIN + '/tw';

  let utmQueryString = filterUtmParams(req);
  if (utmQueryString !== '') {
    appDownloadLink += '?' + utmQueryString;
  }

  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    uberBannerTxt: "To download the mobile app, please visit Pepo.com/tw in your mobile browser",
    androidAppLink: appDownloadLink,
    iosAppLink: appDownloadLink,
    pageMeta: {
      title: 'Pepo | Twitter',
      robots: 'noindex, nofollow',
      canonical: 'https://pepo.com/tw/desktop'
    }
  });
});

module.exports = router;
