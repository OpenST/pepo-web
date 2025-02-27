const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  DoubleOptIn = require(rootPrefix + '/app/services/DoubleOptIn'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper'),
  webRouteHelperBack = require(rootPrefix + '/routes/pepo/helperBack'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GetFeed = require(rootPrefix + '/app/services/GetFeed');

const errorConfig = basicHelper.fetchErrorConfig();

router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  return webRouteHelper.perform(req, res, '/app/services/GetHomePage', 'loggedOut', 'web/_channel_list', 'r_p_v_1');
});

/* GET feed page. */
router.get('/feed', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let apiResponse = await new GetFeed({headers: req.headers, decodedParams: req.decodedParams}).perform();
  let firebaseGetTheAppUrl = '';
  if ( apiResponse.success ) {
    firebaseGetTheAppUrl = apiResponse.data.firebase_video_url;
  }

  if (apiResponse.success) {
    let locals = {
      apiResponseData: apiResponse.data,
      success: true,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      firebaseUrls: {openInApp: firebaseGetTheAppUrl},
      showFooter: false,
      highlightLink: 'feed-page'
    };

    webRouteHelperBack.perform(req, res, 'loggedIn', 'web/_feed', locals);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

/* Double opt in page. */
router.get('/doptin', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Always, uncomment and commit **/
  let doubleOptInObj = new DoubleOptIn({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await doubleOptInObj.perform();

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  if (apiResponse.success) {
    webRouteHelperBack.perform(req, res, 'loggedOut', 'web/_doptin', {success: true});
  } else {
    webRouteHelperBack.perform(req, res, 'loggedOut', 'web/_doptin', {success: false});
  }

});

/* about page */
router.get('/about', function (req, res) {
  webRouteHelperBack.perform(req, res, 'loggedOut', 'web/_about',
    {
      view_endpoint :`${coreConstants.VIEW_WEB_ROOT}`,
      etherscan_endpoint : `${coreConstants.ETHERSCAN_WEB_ROOT}`,
      chain_id : `${coreConstants.CHAIN_ID}`,
      ubt_address : `${coreConstants.UBT_ADDRESS}`,
      etherscan_address : `${coreConstants.BT_CONTRACT_ADDRESS}`,
      app_version : req.headers["x-pepo-app-version"] || '',
      build_number : req.headers["x-pepo-build-number"] || '',
    }
  );
});

/* zoom-meeting iframe page */
router.get('/zoom-meeting', function (req, res) {
  webRouteHelper.perform(req, res, '/app/services/GetZoomMeeting', 'zoomMeeting', 'web/_zoomMeeting', 'r_p_h_2');
});

module.exports = router;
