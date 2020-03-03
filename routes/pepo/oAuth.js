const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

/* GET twitter oauth page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', '', {});
});

/* GET github oauth page. */
router.get('/github/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', '', {});
});

/* GET apple oauth page. */
router.get('/apple/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', '', {});
});

/* GET google oauth page. */
router.get('/google/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', '', {});
});

module.exports = router;
