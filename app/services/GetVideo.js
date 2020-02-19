const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  GetFirebaseVideoUrl = require(rootPrefix + '/app/services/FireBaseUrl/Video'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  Video = require(rootPrefix + '/lib/pepoApi/Video');

/**
 * Class for Getting video
 *
 * @class GetVideo
 */
class GetVideo extends ServiceBase {
  /**
   * Constructor GetAccount
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.headers = params.headers;
    logger.log('oThis.headers === ', oThis.headers);
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
   * Fetch GetAccount
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchVideo() {
    const oThis = this;
    logger.log('Start::_fetchAccountInfo');

    let video = new Video(oThis.headers);
    let resp = await video.getVideoDetails(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;
      const apiResponse = await new GetFirebaseVideoUrl({decodedParams: oThis.decodedParams}).perform();

      if (apiResponse.success) {
        oThis.serviceResp.data.firebaseVideoUrl = apiResponse.data.url;
        oThis.serviceResp.data.shareUrl = apiResponse.data.pageMeta.canonical;
        oThis.serviceResp.data.pageMeta = apiResponse.data.pageMeta;
      }

    }

    return responseHelper.successWithData(oThis.serviceResp);
  }

}

module.exports = GetVideo;
