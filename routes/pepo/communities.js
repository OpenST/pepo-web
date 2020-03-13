const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  GetFirebaseChannelUrl = require(rootPrefix + '/app/services/FireBaseUrl/Channel'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helperBack'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

const errorConfig = basicHelper.fetchErrorConfig();

/* Redirect channel pages */
router.get('/:permalink', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.permalink =  req.params.permalink;

  // Render 404 page if id not valid
  if (!req.decodedParams.permalink) {
    return responseHelper.renderApiResponse(
      responseHelper.error({
        internal_error_identifier: 'r_p_h_3',
        api_error_identifier: 'resource_not_found',
        debug_options: {}
      }),
      res,
      errorConfig
    );
  }

  const apiResponse = await new GetFirebaseChannelUrl({headers: req.headers, decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    return webRouteHelper.perform(req, res, 'redirect', '', {
      apiResponseData: apiResponse.data,
      redirect_to_location: apiResponse.data.url,
      pageMeta: apiResponse.data.pageMeta
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
