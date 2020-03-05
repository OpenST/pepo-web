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
  console.log('decodedParams: ', req.decodedParams);
  let authenticator = new GoogleAuthenticator({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await authenticator.perform();

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'login', '', {});
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, {});
  }
});

module.exports = router;
