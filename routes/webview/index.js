const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  oAuthRouter = require(rootPrefix + '/routes/webview/oAuth'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

router.use(cookieParser(coreConstants.WEB_COOKIE_SECRET));


//NOTE: CSRF DISABLED FOR POST REQ. BUT TO BE SET IN PAGE LOAD.
/* POST apple oauth page. */
router.post(`${pagePathConstants.webview}/apple/oauth`, cookieHelper.setWebCsrf(true), sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if (req.decodedParams.code) {
    locals = {
      oauth_response: {authorization_code: req.decodedParams.code, identity_token: req.decodedParams.id_token},
      oauth_kind: 'apple'
    };
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

router.use(cookieHelper.setWebCsrf());

router.use(pagePathConstants.webview, oAuthRouter);

module.exports = router;
