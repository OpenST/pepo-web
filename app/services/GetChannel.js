const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseChannelUrl = require(rootPrefix + '/app/services/FireBaseUrl/Channel'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  ChannelLib = require(rootPrefix + '/lib/pepoApi/Channel'),
  basicHelper = require(rootPrefix + '/helpers/basic');

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
   * Fetch channel
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchChannel() {
    const oThis = this;
    logger.log('Start::_fetchChannel');

    let promise1 = new ChannelLib(oThis.headers).getChannelDetails({permalink: oThis.permalink});
    let promise2 = new GetFirebaseChannelUrl({headers: oThis.headers, decodedParams: oThis.decodedParams}).perform();

    const promises = [
      promise1,
      promise2
    ];

    const promiseResponses = await Promise.all(promises);

    const resp1 = promiseResponses[0],
      resp2 = promiseResponses[1];

    if (resp1.isFailure()) {
      return Promise.reject(resp1);
    }

    if (resp2.isFailure()) {
      return Promise.reject(resp2);
    }

    oThis.serviceResp = resp1;

    if (resp2.success) {
      oThis.serviceResp.data.firebase_channel_url = resp2.data.url;
      oThis.serviceResp.data.share_url = resp2.data.pageMeta.canonical;
      oThis.serviceResp.data.page_meta = resp2.data.pageMeta;
    }

    if(oThis.serviceResp){
      oThis.apiResponseData = oThis.serviceResp.data;
      let texts = oThis.apiResponseData.texts;
      for(let textId in texts){
        let textDetails = texts[textId];
        textDetails.convertedText = basicHelper.replaceIncludesinText(textDetails.text, textDetails.includes);
      }
    }

    return responseHelper.successWithData(oThis.serviceResp);
  }

  async _prepareResponse() {
    const oThis = this;

    if(oThis.currentUserData){
      oThis.apiResponseData.current_user_data = oThis.currentUserData;
    }

    return responseHelper.successWithData({
      apiResponseData: oThis.serviceResp.data,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: oThis.apiResponseData.page_meta,
      firebaseUrls: {openInApp: oThis.serviceResp.data.share_url},
      showFooter: false,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser
    })
  }

}

module.exports = GetChannel;
