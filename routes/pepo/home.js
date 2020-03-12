const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  DoubleOptIn = require(rootPrefix + '/app/services/DoubleOptIn'),
  GetFirebaseHomeUrl = require(rootPrefix + '/app/services/FireBaseUrl/Home'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  GetFirebaseReplyVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/ReplyVideo'),
  GetFirebaseChannelUrl = require(rootPrefix + '/app/services/FireBaseUrl/Channel'),
  GetFirebaseUserProfileUrl = require(rootPrefix + '/app/services/FireBaseUrl/UserProfile'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/webRouteHelper'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GetVideo = require(rootPrefix + '/app/services/GetVideo'),
  GetFeed = require(rootPrefix + '/app/services/GetFeed'),
  dataStoreHelper  = require(rootPrefix + '/lib/dataStoreHelper'),
  FeedsModel = require(rootPrefix + '/lib/model/Feed'),
  videoViewFormatter = require(rootPrefix + '/lib/viewFormatter/video'),
  CurrentUser = require(rootPrefix + '/lib/model/CurrentUser');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get(pagePathConstants.home, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  const apiResponse = await new GetFirebaseHomeUrl({headers: req.headers, decodedParams: req.decodedParams}).perform()
   ;
  let  layout = "loggedOut";
  let firebaseGetTheAppUrl = '';
  if ( apiResponse.success ) {
    firebaseGetTheAppUrl = apiResponse.data.url;
  }
  
  if( apiResponse && apiResponse.data && apiResponse.data.logined_in_user){
    layout = "loggedIn"
  }

  let currentUserData = apiResponse && apiResponse.data && apiResponse.data.current_user_data;

  return webRouteHelper.perform(req, res, layout, 'web/_home', {
    apiResponseData: apiResponse.data,
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appUpdateLinksConstants.androidUpdateLink,
    iosAppLink: appUpdateLinksConstants.iosUpdateLink,
    firebaseUrls: {getTheApp: firebaseGetTheAppUrl},
    currentUser: new CurrentUser(currentUserData),
    apiResponse: apiResponse,
    pageMeta : apiResponse.data.pageMeta
  });

});

/* GET feed page. */
router.get('/feed', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  let apiResponse = await new GetFeed({headers: req.headers, decodedParams: req.decodedParams}).perform();
  let firebaseGetTheAppUrl = '';
  if ( apiResponse.success ) {
    firebaseGetTheAppUrl = apiResponse.data.url;
  }



  let currentUserData = apiResponse && apiResponse.data && apiResponse.data.current_user_data;

  if (apiResponse.success) {
   const feedsModel = new FeedsModel(dataStoreHelper( apiResponse) );
    webRouteHelper.perform(req, res, 'loggedIn', 'web/_feed', {
      apiResponseData: apiResponse.data,
      success: true,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      firebaseUrls: {getTheApp: firebaseGetTheAppUrl},
      showFooter: false,
      feedsModel,
      currentUser: new CurrentUser(currentUserData)
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

/* Double opt in page. */
router.get(pagePathConstants.doubleOptIn, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Always, uncomment and commit **/
  let doubleOptInObj = new DoubleOptIn({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await doubleOptInObj.perform();

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  if (apiResponse.success) {
    webRouteHelper.perform(req, res, 'loggedOut', 'web/_doptin', {success: true});
  } else {
    webRouteHelper.perform(req, res, 'loggedOut', 'web/_doptin', {success: false});
  }

});

/* Redirect video pages */
router.get(`${pagePathConstants.video}/:video_id`, sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

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
  let currentUserData = apiResponse && apiResponse.data && apiResponse.data.current_user_data;

  if (apiResponse.success) {
    let formattedData = new videoViewFormatter(apiResponse.data).perform();

    return webRouteHelper.perform(req, res, 'loggedOut', 'web/_video', {
      apiResponseData: apiResponse.data,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: formattedData.page_meta,
      firebaseUrls: {openInApp: formattedData.firebase_video_url},
      showFooter: false,
      formattedEntityData: formattedData,
      currentUser: new CurrentUser(currentUserData)
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

/* Redirect video pages */
router.get(`${pagePathConstants.reply}/:reply_detail_id`, sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

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

/* Redirect channel pages */
router.get(`${pagePathConstants.communities}/:permalink`, sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

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

/* Redirect tag pages */
router.get('/tags/:tagname', function (req, res) {
  return res.redirect(302, coreConstants.PEPO_DOMAIN);
});

/* privacy page */
router.get(pagePathConstants.privacy, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1si1J9PXkW7mLplUy_CJTNXTsi1OtNRiD/view?usp=sharing');
});

/* terms page */
router.get(pagePathConstants.terms, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1LCQ7v1BOrwwbMfHM0xjWwefDpSNu0BlG/view?usp=sharing');
});

/* imprint page */
router.get(pagePathConstants.imprint, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1oj1BvXqmaBgTTi8HwQgFCCGWtVOZiSTU/view?usp=sharing');
});

/* media kit page */
router.get(pagePathConstants.mediaKit, function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://www.dropbox.com/sh/3r5zr84dyp3dvv0/AACuKAhLTNHaPcn6TttbY_BOa?dl=0');
});

/* content terms page */
router.get(pagePathConstants.contentTerms, function (req, res) {
  webRouteHelper.perform(req, res, 'loggedOut', 'web/_content_terms');
});

/* about page */
router.get(pagePathConstants.about, function (req, res) {
  webRouteHelper.perform(req, res, 'loggedOut', 'web/_about',
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

/* faq page */
router.get(pagePathConstants.faqs, function (req, res) {
  res.redirect(302, 'https://intercom.help/pepo');
});

/* Redirect user profile pages */
router.get(`/:permalink`, sanitizer.sanitizeDynamicUrlParams, async function (req, res) {
  req.decodedParams.permalink =  req.params.permalink;

  // Render 404 page if id not valid
  if (!req.decodedParams.permalink) {
    return responseHelper.renderApiResponse(
      responseHelper.error({
        internal_error_identifier: 'r_p_h_4',
        api_error_identifier: 'resource_not_found',
        debug_options: {}
      }),
      res,
      errorConfig
    );
  }

  const apiResponse = await new GetFirebaseUserProfileUrl({headers: req.headers, decodedParams: req.decodedParams}).perform();
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
