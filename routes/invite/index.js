const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GetFirebaseInviteUrl = require(rootPrefix + '/app/services/GetFirebaseInviteUrl');

const errorConfig = basicHelper.fetchErrorConfig();

router.get('/:code', async function (req, res) {
  // Process the data received in req.body
  const apiResponse = await GetFirebaseInviteUrl({decodedParams: req.decodedParams});
  if (apiResponse.success) {
    res.redirect(301, apiResponse.data.url);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }

});


module.exports = router;
