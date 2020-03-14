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

    await oThis._fetchChannel();

    await oThis._parseTexts();

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

    const serviceResp = await new ChannelLib(oThis.headers).getChannelDetails({permalink: oThis.permalink});
    if (serviceResp.isFailure()) {
      return Promise.reject(serviceResp);
    }
    oThis.apiResponseData = serviceResp.data;

    const channelId = oThis.apiResponseData['channel'].id,
      channelName = oThis.apiResponseData['channel'].name,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      descriptionId = channelDetails['description_id'],
      description = oThis.apiResponseData['texts'][descriptionId]['text'],
      coverImageId = channelDetails['cover_image_id'],
      imageResolutions = oThis.apiResponseData['images'][coverImageId]['resolutions'],
      channelImageUrl = imageResolutions['original']['url'];

    let pageMetaResponse = await new GetFirebaseChannelUrl({
      headers: oThis.headers,
      decodedParams: oThis.decodedParams,
      channelShareDetails: {
        title: channelName,
        description: description,
        poster_image_url: channelImageUrl
      }
    }).perform();

    if (pageMetaResponse.isFailure()) {
      return Promise.reject(pageMetaResponse);
    }

    if (pageMetaResponse.success) {
      oThis.apiResponseData.firebase_channel_url = pageMetaResponse.data.url;
      oThis.apiResponseData.share_url = pageMetaResponse.data.pageMeta.canonical;
      oThis.apiResponseData.page_meta = pageMetaResponse.data.pageMeta;
    }

    return responseHelper.successWithData({});
  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _parseTexts() {
    const oThis = this,
      texts = oThis.apiResponseData.texts;

    for(let textId in texts){
      let textDetails = texts[textId];
      textDetails.convertedText = basicHelper.replaceIncludesinText(textDetails.text, textDetails.includes);
    }

  }

  /**
   *
   * @returns {Promise<*|result>}
   * @private
   */
  async _prepareResponse() {
    const oThis = this;

    return responseHelper.successWithData({
      apiResponseData: oThis.apiResponseData,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: oThis.apiResponseData.page_meta,
      firebaseUrls: {openInApp: oThis.apiResponseData.share_url},
      showFooter: false,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser
    })
  }

}

module.exports = GetChannel;
