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

    await oThis._convertDescriptionForDisplay();

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

    let pageMetaResponse = await new GetFirebaseChannelUrl({
      headers: oThis.headers,
      decodedParams: oThis.decodedParams,
      channelShareDetails: {
        title: oThis._getChannelName(),
        description: oThis._getDescription(),
        poster_image_url: oThis._getChannelImageUrl()
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

  _getChannelName() {
    const oThis = this;
    return oThis.apiResponseData['channel'].name;
  }

  _getDescription() {
    const oThis = this,
      channelId = oThis.apiResponseData['channel'].id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      descriptionId = channelDetails['description_id'];

    return oThis.apiResponseData['texts'][descriptionId]['text'];
  }

  _getChannelImageUrl() {
    const oThis = this,
      channelId = oThis.apiResponseData['channel'].id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      coverImageId = channelDetails['cover_image_id'],
      imageResolutions = oThis.apiResponseData['images'][coverImageId]['resolutions'];

    return imageResolutions['original']['url'];
  }

  async _convertDescriptionForDisplay() {
    const oThis = this,
      maxPositionToSplit = 120,
      channelId = oThis.apiResponseData['channel'].id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      descriptionId = channelDetails['description_id'],
      description = oThis.apiResponseData['texts'][descriptionId]['text'];

    if(maxPositionToSplit > description.length){
      return;
    }

    const splitablePosition = description.lastIndexOf(' ', maxPositionToSplit);

    oThis.apiResponseData['texts'][descriptionId]['text'] = description.slice(0, splitablePosition) +
      '<span class="showMore"> ...Show More</span><span class="afterText">' + description.slice(splitablePosition) + '</span>'
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
