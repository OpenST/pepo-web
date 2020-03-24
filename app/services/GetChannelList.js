const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseChannelListUrl = require(rootPrefix + '/app/services/FireBaseUrl/ChannelList'),
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

    await oThis.getCurrentUser();

    await oThis._fetchChannelListMeta();

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
  async _fetchChannelListMeta() {
    const oThis = this;
    logger.log('Start::_fetchChannel');

    let pageMetaResponse = await new GetFirebaseChannelListUrl({
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

  _getChannelName() {
    const oThis = this;
    return oThis.apiResponseData['channel'].name;
  }

  _getDescription() {
    const oThis = this,
      channelId = oThis.apiResponseData['channel'].id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      descriptionId = channelDetails['description_id'];

    if(!descriptionId || !oThis.apiResponseData['texts'] || !oThis.apiResponseData['texts'][descriptionId]){
      return '';
    }

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
      currentUser: oThis.currentUser,
      highlightLink: 'channel-list-page'
    })
  }

}

module.exports = GetChannel;
