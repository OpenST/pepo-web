const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

getRedirectPath = function(cookie) {
  const decodedCookie = decodeURIComponent(cookie),
    decodedValues = decodedCookie.split('&');

  for(let i=0; i<decodedValues.length; i++) {
    if(decodedValues[i].includes('rp=')) {
      return '/' + decodedValues[i].replace('rp=', '');
    }
  }

  return '/';
};

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'github'};
  }

  if(req.signedCookies[cookieConstants.loginRefererCookieName]) {
    locals.redirect_url = getRedirectPath(req.signedCookies[cookieConstants.loginRefererCookieName]);
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

  if(req.signedCookies[cookieConstants.loginRefererCookieName]) {
    locals.redirect_url = getRedirectPath(req.signedCookies[cookieConstants.loginRefererCookieName]);
  }
  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let locals = {};
  if(req.decodedParams.code){
    locals = {oauth_response: {authorization_code: req.decodedParams.code}, oauth_kind: 'google'};
  }

  if(req.signedCookies[cookieConstants.loginRefererCookieName]) {
    locals.redirect_url = getRedirectPath(req.signedCookies[cookieConstants.loginRefererCookieName]);
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

  if(req.signedCookies[cookieConstants.loginRefererCookieName]) {
    locals.redirect_url = getRedirectPath(req.signedCookies[cookieConstants.loginRefererCookieName]);
  }

  return renderResponseHelper.renderWithLayout(req, res, 'webView', 'web/_webView', locals);
});

module.exports = router;
