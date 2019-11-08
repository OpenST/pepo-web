const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  GetFirebaseInviteUrl = require(rootPrefix + '/app/services/GetFirebaseInviteUrl');

const errorConfig = basicHelper.fetchErrorConfig();

router.get('*', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  // Extract invite code from url
  // Step 1: Remove first and last slash from path, if present.
  const parsedPath = req.path.replace(/\/*$/, "").replace(/^\/*/, "").trim();
  // Step 2: If parsedPath doesn't contain slash and is not blank, then consider it as invite code.
  req.decodedParams.code = (parsedPath === '' || parsedPath.includes('/')) ? '' : parsedPath;

  // Process the data received in req.body.
  const apiResponse = await new GetFirebaseInviteUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    res.redirect(301, apiResponse.data.url);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
