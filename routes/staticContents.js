const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  deepLinkingConstants = require(rootPrefix + '/lib/globalConstant/deepLinking'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET Deep linking for android. */
router.get('/.well-known/assetlinks.json', async function (req, res) {

  let apiResponse = deepLinkingConstants.getConfigFor(deepLinkingConstants.androidDeviceType);

  return responseHelper.renderApiResponse(apiResponse, res, errorConfig);

});

/* GET Deep linking for ios. */
router.get('/apple-app-site-association', async function (req, res) {

  let apiResponse = deepLinkingConstants.getConfigFor(deepLinkingConstants.iosDeviceType);

  return responseHelper.renderApiResponse(apiResponse, res, errorConfig);

});

module.exports = router;
