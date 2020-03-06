const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'github'};
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET twitter oauth page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.oauth_token && req.decodedParams.oauth_verifier){
    locals = {oauth_response: {oauth_token: req.decodedParams.oauth_token,
        oauth_verifier: req.decodedParams.oauth_verifier}, oauth_kind: 'twitter'};
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'google'};
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET apple oauth page. */
router.post('/apple/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code, identity_token: req.decodedParams.id_token},
              oauth_kind: 'apple'};
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

module.exports = router;
