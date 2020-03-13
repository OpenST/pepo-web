const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/Video'),
  GetFirebaseChannelUrl = require(rootPrefix + '/app/services/FireBaseUrl/Channel'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  ChannelLib = require(rootPrefix + '/lib/pepoApi/Channel'),
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
    oThis.permalink = oThis.decodedParams.permalink;

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

    await oThis._fetchChannel();

    await oThis.getCurrentUser();

    return oThis._prepareResponse();

  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
  }

  /**
   * Fetch video
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchChannel() {
    const oThis = this;
    logger.log('Start::_fetchChannel');

    let resp = await new ChannelLib(oThis.headers).getChannelDetails({permalink: oThis.permalink});

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;
      const apiResponse = await new GetFirebaseChannelUrl({decodedParams: oThis.decodedParams, videoResponse: resp.data}).perform();

      if (apiResponse.success) {
        oThis.serviceResp.data.firebase_video_url = apiResponse.data.url;
        oThis.serviceResp.data.share_url = apiResponse.data.pageMeta.canonical;
        oThis.serviceResp.data.page_meta = apiResponse.data.pageMeta;
      }

    }



    const apiResponse = await new GetFirebaseChannelUrl({headers: oThis.headers, decodedParams: oThis.decodedParams}).perform();
    if (apiResponse.success) {
      return webRouteHelper.perform(req, res, 'redirect', '', {
        apiResponseData: apiResponse.data,
        redirect_to_location: apiResponse.data.url,
        pageMeta: apiResponse.data.pageMeta
      });
    } else {
      return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
    }







    return responseHelper.successWithData(oThis.serviceResp);
  }

  async _prepareResponse() {
    const oThis = this;
    let formattedData = new videoViewFormatter(oThis.serviceResp.data).perform();

    return responseHelper.successWithData({
      apiResponseData: oThis.serviceResp.data,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: formattedData.page_meta,
      firebaseUrls: {openInApp: formattedData.firebase_video_url},
      showFooter: false,
      formattedEntityData: formattedData,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser
    })
  }

}

module.exports = GetVideo;
