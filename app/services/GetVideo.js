const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/Video'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  Video = require(rootPrefix + '/lib/pepoApi/Video');

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
    oThis.headers = params.headers;
    oThis.decodedParams = params.decodedParams;

    oThis.serviceResp = {};
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._fetchVideo();

    return Promise.resolve(oThis.serviceResp);
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

    let video = new Video(oThis.headers);
    let resp = await video.getVideoDetails(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;
      const apiResponse = await new GetFirebaseVideoUrl({decodedParams: oThis.decodedParams, videoResponse: resp.data}).perform();

      if (apiResponse.success) {
        oThis.serviceResp.data.firebase_video_url = apiResponse.data.url;
        oThis.serviceResp.data.share_url = apiResponse.data.pageMeta.canonical;
        oThis.serviceResp.data.page_meta = apiResponse.data.pageMeta;
      }

    }

    return responseHelper.successWithData(oThis.serviceResp);
  }

}

module.exports = GetVideo;
