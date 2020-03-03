const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  oAuthRouter = require(rootPrefix + '/routes/socialConnect/oAuth'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

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

router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));

// router.use(csrfProtection);

router.use(pagePathConstants.connect, oAuthRouter);

module.exports = router;
