const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  basicAuth = require('basic-auth');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  deepLinkRoutes = require(rootPrefix + '/routes/pepo/deepLink'),
  staticRoutes = require(rootPrefix + '/routes/pepo/static'),
  videoRoutes = require(rootPrefix + '/routes/pepo/video'),
  replyRoutes = require(rootPrefix + '/routes/pepo/reply'),
  communityRoutes = require(rootPrefix + '/routes/pepo/communities'),
  tagRoutes = require(rootPrefix + '/routes/pepo/tags'),
  homeRoutes = require(rootPrefix + '/routes/pepo/home'),
  permalinkRoutes = require(rootPrefix + '/routes/pepo/permalink'),
  inviteCodesRoutes = require(rootPrefix + '/routes/pepo/inviteCodes'),
  redemptionsRoutes = require(rootPrefix + '/routes/pepo/redemptions'),
  supportRoutes = require(rootPrefix + '/routes/pepo/support'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

const basicAuthentication = function(req, res, next) {
  if (!coreConstants.USE_BASIC_AUTHENTICATION) {
    return next();
  }

  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

    return res.status(401).render(`error/401`, { redirectUrl: coreConstants.PEPO_DOMAIN });
  }

  let user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (
    user.name === coreConstants.BASIC_AUTHENTICATION_USERNAME &&
    user.pass === coreConstants.BASIC_AUTHENTICATION_PASSWORD
  ) {
    return next();
  } else {
    return unauthorized(res);
  }
};

const csrfProtection = csrf({
  cookie: {
    key: cookieConstants.csrfCookieName,
    maxAge: 1 * 60 * 60 * 24 * 30,
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    secure: basicHelper.isProduction(), // Marks the cookie to be used with HTTPS only
    path: '/',
    sameSite: 'strict', // sets the same site policy for the cookie
    domain: coreConstants.COOKIE_DOMAIN
  }
});

// Deep link routes should be above basic auth.
router.use('/', deepLinkRoutes);

// Add basic auth in chain
router.use(basicAuthentication);

router.use('/', staticRoutes);

router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

router.use(csrfProtection);

router.use(cookieHelper.setUserUtmCookie);

router.use(cookieHelper.fetchUserUtmFromCookie);

router.use('/support', supportRoutes);

router.use('/redemptions', redemptionsRoutes);

router.use('/video', videoRoutes);

router.use('/reply', replyRoutes);

router.use('/communities', communityRoutes);

router.use('/tags', tagRoutes);

router.use('/', inviteCodesRoutes);

router.use('/', homeRoutes);

// IMPORTANT NOTE: Please keep '/:permalink' route at the END.
router.use('/', permalinkRoutes);



module.exports = router;
