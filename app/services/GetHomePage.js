const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseHomeUrl = require(rootPrefix + '/app/services/FireBaseUrl/Home'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks');

/**
 * Class for Getting channel
 *
 * @class GetChannel
 */
class GetChannel extends ServiceBase {
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

    oThis.apiResponseData = {};
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._validateAndSanitize();

    await oThis._fetchHomePageMeta();

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
   * Fetch channel list
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchHomePageMeta() {
    const oThis = this;
    logger.log('Start::_fetchChannel');

    let pageMetaResponse = await new GetFirebaseHomeUrl({
      headers: oThis.headers,
      decodedParams: oThis.decodedParams
    }).perform();

    if (pageMetaResponse.isFailure()) {
      return Promise.reject(pageMetaResponse);
    }

    if (pageMetaResponse.success) {
      oThis.apiResponseData.firebase_channel_list_url = pageMetaResponse.data.url;
      oThis.apiResponseData.page_meta = pageMetaResponse.data.pageMeta;
    }

    return responseHelper.successWithData({});
  }

  /**
   *
   * @returns {Promise<*|result>}
   * @private
   */
  async _prepareResponse() {
    const oThis = this;

    if(oThis.currentUserData){
      oThis.apiResponseData.current_user_data = oThis.currentUserData;
    }

    return responseHelper.successWithData({
      apiResponseData: oThis.apiResponseData,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: oThis.apiResponseData.page_meta,
      firebaseUrls: {openInApp: oThis.apiResponseData.firebase_channel_list_url},
      showFooter: false,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser
    })
  }

}

module.exports = GetChannel;
