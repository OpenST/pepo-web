const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  base64Helper = require(rootPrefix + '/lib/base64Helper'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

getRedirectPath = function(state) {
  let redirectPath = null;
  try {
    if (state) {
      const decodedState = JSON.parse(base64Helper.decode(state));
      //Note: Added slash to stop unwanted redirects (security fix)
      redirectPath = decodedState.hasOwnProperty('rd') ? '/' + decodedState.rd : null;
    }
  } catch (e) {
    // Logger
  }
  return redirectPath;
};

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'github'};
  }
  locals.redirect_url = getRedirectPath(req.decodedParams.state);

  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET twitter oauth page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.oauth_token && req.decodedParams.oauth_verifier){
    locals = {oauth_response: {oauth_token: req.decodedParams.oauth_token,
        oauth_verifier: req.decodedParams.oauth_verifier}, oauth_kind: 'twitter'};
  }
  locals.redirect_url = getRedirectPath(req.decodedParams.state);

  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'google'};
  }
  locals.redirect_url = getRedirectPath(req.decodedParams.state);

  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET apple oauth page. */
router.post('/apple/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code, identity_token: req.decodedParams.id_token},
              oauth_kind: 'apple'};
  }
  locals.redirect_url = getRedirectPath(req.decodedParams.state);

  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

module.exports = router;
