const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helperBack'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GetVideo = require(rootPrefix + '/app/services/GetVideo'),
  videoViewFormatter = require(rootPrefix + '/lib/viewFormatter/video');

const errorConfig = basicHelper.fetchErrorConfig();

/* Redirect video pages */
router.get('/:video_id', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.video_id =  parseInt(req.params.video_id);

  // Render 404 page if id not valid
  if (req.decodedParams.video_id < 1 || isNaN(req.decodedParams.video_id)) {
    return responseHelper.renderApiResponse(
      responseHelper.error({
        internal_error_identifier: 'r_p_h_1',
        api_error_identifier: 'resource_not_found',
        debug_options: {}
      }),
      res,
      errorConfig
    );
  }

  let getVideoObj = new GetVideo({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getVideoObj.perform();

  if (apiResponse.success) {
    let formattedData = new videoViewFormatter(apiResponse.data).perform();

    return webRouteHelper.perform(req, res, 'loggedOut', 'web/_video', {
      apiResponseData: apiResponse.data,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: formattedData.page_meta,
      firebaseUrls: {openInApp: formattedData.firebase_video_url},
      showFooter: false,
      formattedEntityData: formattedData
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
