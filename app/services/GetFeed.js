const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  GetFirebaseFeedUrl = require(rootPrefix + '/app/services/FireBaseUrl/Feed'),
  Feed = require(rootPrefix + '/lib/pepoApi/Feed');

/**
 * Class for Getting feed.
 *
 * @class GetFeed
 */
class GetFeed extends ServiceBase {
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

    await oThis._fetchFeed();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch feed
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchFeed() {
    const oThis = this;
    logger.log('Start::_fetchFeed');

    let resp = await new Feed(oThis.headers).getFeed();

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;

      const firebaseResp = await new GetFirebaseFeedUrl({decodedParams: oThis.decodedParams}).perform();

      if (firebaseResp.success) {
        oThis.serviceResp.data.firebase_video_url = firebaseResp.data.url;
        oThis.serviceResp.data.share_url = firebaseResp.data.pageMeta.canonical;
        oThis.serviceResp.data.page_meta = firebaseResp.data.pageMeta;
      }
    }

    return responseHelper.successWithData(oThis.serviceResp);
  }

}

module.exports = GetFeed;
