const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  AppleAuthenticator = require(rootPrefix + '/app/services/Authenticate/Apple'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

/* GET twitter oauth page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'login', '', {});
});

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'login', '', {});
});

/* GET apple oauth page. */
router.post('/apple/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  console.log('decodedParams: ', req.decodedParams);
  let authenticator = new AppleAuthenticator({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await authenticator.perform();

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'login', '', {});
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, {});
  }
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'login', '', {});
});

module.exports = router;
