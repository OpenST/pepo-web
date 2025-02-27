const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/Video'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  Video = require(rootPrefix + '/lib/pepoApi/Video'),
  videoViewFormatter = require(rootPrefix + '/lib/viewFormatter/video');

/**
 * Class for Getting video
 *
 * @class GetVideo
 */
class GetVideo extends ServiceBase {
  /**
   * Constructor
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.headers = params.headers || {};
    oThis.decodedParams = params.decodedParams;
    oThis.videoId = oThis.decodedParams.video_id;

    oThis.apiResponseData = {};
    oThis.serviceResp = {};
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._validateAndSanitize();

    await oThis._fetchVideo();

    await oThis.getCurrentUser();

    return oThis._prepareResponse();

  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;

    // Render 404 page if id not valid
    if (oThis.videoId < 1 || isNaN(oThis.videoId)) {
      return Promise.reject(
        responseHelper.error({
          internal_error_identifier: 'a_s_gv_1',
          api_error_identifier: 'resource_not_found',
          debug_options: {videoId: oThis.videoId}
      }));
    }
  }

  /**
   * Fetch video
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchVideo() {
    const oThis = this;
    logger.log('Start::_fetchVideo');

    let resp = await new Video(oThis.headers).getVideoDetails({videoId: oThis.videoId});

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;
      const apiResponse = await new GetFirebaseVideoUrl({decodedParams: oThis.decodedParams, videoResponse: resp.data}).perform();

      if (apiResponse.success) {
        oThis.serviceResp.data.firebase_video_url = apiResponse.data.url;
        oThis.serviceResp.data.share_url = apiResponse.data.pageMeta.canonical;
        oThis.serviceResp.data.page_meta = apiResponse.data.pageMeta;
        oThis.apiResponseData = oThis.serviceResp.data;
      }

    }

    return responseHelper.successWithData(oThis.serviceResp);
  }

  async _prepareResponse() {
    const oThis = this;
    let formattedData = new videoViewFormatter(oThis.serviceResp.data).perform();

    if(oThis.currentUserData){
      oThis.apiResponseData.current_user_data = oThis.currentUserData;
    }

    return responseHelper.successWithData({
      apiResponseData: oThis.apiResponseData,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: formattedData.page_meta,
      firebaseUrls: {openInApp: formattedData.firebase_video_url},
      showFooter: false,
      formattedEntityData: formattedData,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser,
      highlightLink: ''
    })
  }

}

module.exports = GetVideo;
