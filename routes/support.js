const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetSupportDetails = require(rootPrefix + '/app/services/GetSupportDetails'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET users account page. */
router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  // Comment following 3 lines for local development of pepo-web. DO NOT COMMIT COMMENTED.
  let getSupportDetailsObj = new GetSupportDetails({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getSupportDetailsObj.perform();
  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedIn', 'web/_support', apiResponse.data);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
