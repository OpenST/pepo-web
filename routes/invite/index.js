const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  GetFirebaseInviteUrl = require(rootPrefix + '/app/services/GetFirebaseInviteUrl');

const errorConfig = basicHelper.fetchErrorConfig();

router.get('/:code?', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {
  req.decodedParams.code = req.params.code;
  // Process the data received in req.body
  const apiResponse = await new GetFirebaseInviteUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    res.redirect(301, apiResponse.data.url);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});


module.exports = router;
