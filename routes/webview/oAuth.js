const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GoogleAuthenticator = require(rootPrefix + '/app/services/Authenticate/Google'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

/* GET twitter oauth page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'webView', '', {});
});

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'webView', '', {});
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {authorization_code: req.decodedParams.code};
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

module.exports = router;
