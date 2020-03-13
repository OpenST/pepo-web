const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  GetFirebaseReplyVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/ReplyVideo'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

const errorConfig = basicHelper.fetchErrorConfig();

/* Redirect video pages */
router.get('/:reply_detail_id', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.reply_detail_id =  parseInt(req.params.reply_detail_id);

  // Render 404 page if id not valid
  if (req.decodedParams.reply_detail_id < 1 || isNaN(req.decodedParams.reply_detail_id)) {
    return responseHelper.renderApiResponse(
      responseHelper.error({
        internal_error_identifier: 'r_p_h_2',
        api_error_identifier: 'resource_not_found',
        debug_options: {}
      }),
      res,
      errorConfig
    );
  }

  const apiResponse = await new GetFirebaseReplyVideoUrl({headers: req.headers, decodedParams: req.decodedParams}).perform();
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
