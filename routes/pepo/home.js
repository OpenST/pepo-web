const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  DoubleOptIn = require(rootPrefix + '/app/services/DoubleOptIn'),
  GetFirebaseHomeUrl = require(rootPrefix + '/app/services/FireBaseUrl/Home'),
  TwitterAuthenticate = require(rootPrefix + '/app/services/TwitterAuthenticate'),
  apiInternalCodesConstants = require(rootPrefix + '/lib/globalConstant/apiInternalCodes'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  GetFirebaseReplyVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/ReplyVideo'),
  GetFirebaseChannelUrl = require(rootPrefix + '/app/services/FireBaseUrl/Channel'),
  GetFirebaseUserProfileUrl = require(rootPrefix + '/app/services/FireBaseUrl/UserProfile'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  GetVideo = require(rootPrefix + '/app/services/GetVideo'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  videoViewFormatter = require(rootPrefix + '/lib/viewFormatter/video');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET home page. */
router.get(pagePathConstants.home, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  const apiResponse = await new GetFirebaseHomeUrl({decodedParams: req.decodedParams}).perform();
  let homeUrl = '';
  if ( apiResponse.success ) {
    homeUrl = apiResponse.data.url;
  }
  return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_home', {
    twitterRedirectUrl: '#',
    twitterSigninError: 0,
    androidAppLink: appUpdateLinksConstants.androidUpdateLink,
    iosAppLink: appUpdateLinksConstants.iosUpdateLink,
    homeUrl: homeUrl
  });

});

/* Double opt in page. */
router.get(pagePathConstants.doubleOptIn, sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Always, uncomment and commit **/
  let doubleOptInObj = new DoubleOptIn({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await doubleOptInObj.perform();

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {oAuthToken: "11", twitterRedirectUrl:"/for-local-testing-only", twitterSigninError: 0}};

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_doptin', {success: true});
  } else {
    renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_doptin', {success: false});
  }

});

/* GET home page. */
router.get('/twitter/oauth', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  if (!req.decodedParams.rd) {
    if (!req.decodedParams.oauth_token || !req.decodedParams.oauth_verifier) {
      return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=1`});
    }

    let redirectUrl = req.path + `?oauth_token=${escape(req.decodedParams.oauth_token)}&oauth_verifier=${escape(req.decodedParams.oauth_verifier)}&rd=1`;
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: redirectUrl});
  }

  let twitterAuthenticateObj = new TwitterAuthenticate({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await twitterAuthenticateObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    let redirectUrl = pagePathConstants.account;
    if (apiResponse.data['newSignup']) {
      redirectUrl = redirectUrl + '#new'
    }
    renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: redirectUrl});
  } else {
    const parsedResponse = apiResponse.getDebugData();
    if (parsedResponse.err.code === apiInternalCodesConstants.alreadyRegisteredUserInApp) {
      renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=2`});
    } else {
      renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {redirect_to_location: `${pagePathConstants.home}?e=1`});
    }
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
  console.log("apiResponse ===== ", apiResponse);

  if (apiResponse.success) {
    let formattedData = new videoViewFormatter(apiResponse.data).perform();
    console.log("apiResponse ===== ", formattedData);

    return renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_video', {
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: formattedData.page_meta,
      homeUrl: formattedData.home_url,
      showFooter: false,
      ...formattedData
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

  const apiResponse = await new GetFirebaseReplyVideoUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {
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

  const apiResponse = await new GetFirebaseChannelUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {
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
  renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_content_terms');
});

/* about page */
router.get(pagePathConstants.about, function (req, res) {
  renderResponseHelper.renderWithLayout(req, res, 'loggedOut', 'web/_about',
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

  const apiResponse = await new GetFirebaseUserProfileUrl({decodedParams: req.decodedParams}).perform();
  if (apiResponse.success) {
    return renderResponseHelper.renderWithLayout(req, res, 'redirect', '', {
      redirect_to_location: apiResponse.data.url,
      pageMeta: apiResponse.data.pageMeta
    });
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
