const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetFirebaseMeetingPageUrl = require(rootPrefix + '/app/services/FireBaseUrl/MeetingPage'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  ChannelLib = require(rootPrefix + '/lib/pepoApi/Channel'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

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
    oThis.channelPermalink = oThis.decodedParams.permalink;
    oThis.meetingId = oThis.decodedParams.meetingId;
    oThis.leaveUrl = oThis.decodedParams.leaveUrl;

    oThis.apiResponseData = {};
    oThis.socialShareDetails = {};
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

    await oThis._fetchMeetingsPageMeta();

    await oThis._prepareSocialShareData();

    return oThis._prepareResponse();

  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    // Nothing to do here
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

    const serviceResp = await new ChannelLib(oThis.headers)
      .getMeetingDetails({
        permalink: oThis.channelPermalink, meetingId: oThis.meetingId
      });

    if (serviceResp.isFailure()) {
      return Promise.reject(serviceResp);
    }
    oThis.apiResponseData = serviceResp.data;

    return responseHelper.successWithData({});
  }

  /**
   * retrieve channel name
   *
   * @returns {*}
   * @private
   */
  _getChannelName() {
    const oThis = this,
      channelId = oThis.apiResponseData['meeting'].channel_id;
    return oThis.apiResponseData['channels'][channelId].name;
  }

  /**
   * retrieve channel tagline
   *
   * @returns {*}
   * @private
   */
  _getChannelTagLine() {
    const oThis = this,
      channelId = oThis.apiResponseData['meeting'].channel_id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      taglineId = channelDetails['tagline_id'];

    if(!taglineId || !oThis.apiResponseData['texts'] || !oThis.apiResponseData['texts'][taglineId]){
      return '';
    }

    return oThis.apiResponseData['texts'][taglineId]['text'];
  }

  /**
   * Get channel tag list.
   *
   * @private
   */
  _getShareKeywordsList() {
    const oThis = this,
      channelId = oThis.apiResponseData['meeting'].channel_id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      tagIds = channelDetails['tag_ids'],
      tagDetails = oThis.apiResponseData['tags'],
      tagNameList = ['Pepo', 'Pepo Live'];

    for(let i=0;i<tagIds.length;i++) {
      tagNameList.push(tagDetails[tagIds[i]].text);
    }

    return tagNameList.join(',')
  }

  /**
   * Append Pepo's twitter handle in the share text.
   *
   * @returns {string}
   * @private
   */
  _appendPepoTwitterHandle() {
    const oThis = this,
      pepoTwitter = oThis.apiResponseData['pepo_twitter_details'];

    if(pepoTwitter && pepoTwitter.handle){
      return ' @' + pepoTwitter.handle;
    }

    return '';
  }

  /**
   * retrieve channel original url
   *
   * @returns {*}
   * @private
   */
  _getChannelImageUrl() {
    const oThis = this,
      channelId = oThis.apiResponseData['meeting'].channel_id,
      channelDetails = oThis.apiResponseData['channel_details'][channelId],
      coverImageId = channelDetails['cover_image_id'],
      imageResolutions = oThis.apiResponseData['images'][coverImageId]['resolutions'];

    const imageUrl = imageResolutions['720w'] ? imageResolutions['720w']['url'] : imageResolutions['original']['url']
    return imageUrl;
  }

  /**
   * fetch meetings meta data
   *
   * @returns {Promise<never>}
   * @private
   */
  async _fetchMeetingsPageMeta() {
    const oThis = this;

    let pageMetaResponse = await new GetFirebaseMeetingPageUrl({
      headers: oThis.headers,
      decodedParams: oThis.decodedParams,
      channelPermalink: oThis.channelPermalink,
      meetingId: oThis.meetingId,
      shareDetails: {
        title: `Pepo Live - ${oThis._getChannelName()}`,
        description: oThis._getChannelTagLine(),
        imageUrl: oThis._getChannelImageUrl(),
        keywords: oThis._getShareKeywordsList()
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
  }

  /**
   * Prepare social share data.
   *
   * @sets oThis.socialShareDetails
   *
   * @returns {Promise<never>}
   * @private
   */
  async _prepareSocialShareData() {
    const oThis = this;

    const twitterUserData = oThis.apiResponseData['twitter_users'];

    const hostUserId = oThis.apiResponseData['meeting']['host_user_id'];
    const hostData = oThis.apiResponseData['users'][hostUserId];
    const hostName = hostData['name'];
    const hostUserHandle = twitterUserData[hostUserId] ? twitterUserData[hostUserId].handle : null;

    const channelName = await oThis._getChannelName();
    const meetingUrl = `${coreConstants.PEPO_DOMAIN}/communities/${oThis.channelPermalink}/meetings/${oThis.meetingId}`;

    const defaultCopy = `Live Now! ${channelName} with ${hostName} and community -- join the live event at ${meetingUrl}`;
    let twitterCopy = hostUserHandle ? `Live Now! ${channelName} with @${hostUserHandle} and community -- join the live event at ${meetingUrl}` : defaultCopy;
    twitterCopy += oThis._appendPepoTwitterHandle();

    oThis.socialShareDetails = {
      default: defaultCopy,
      twitter: twitterCopy
    }
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
    oThis.apiResponseData.current_meeting_id = oThis.meetingId;
    oThis.apiResponseData.social_share_details = oThis.socialShareDetails;

    return responseHelper.successWithData({
      apiResponseData: oThis.apiResponseData,
      androidAppLink: appUpdateLinksConstants.androidUpdateLink,
      iosAppLink: appUpdateLinksConstants.iosUpdateLink,
      pageMeta: oThis.apiResponseData.page_meta,
      firebaseUrls: {openInApp: oThis.apiResponseData.firebase_channel_url},
      showFooter: false,
      currentUserData: oThis.currentUserData,
      currentUser: oThis.currentUser,
      leaveUrl: oThis.leaveUrl,
      highlightLink: ''
    });
  }

}

module.exports = GetChannel;
