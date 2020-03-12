const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  ChannelShareDetails = require(rootPrefix + '/lib/pepoApi/Channel');

/**
 * Class to get firebase redirection url for channel url
 *
 */
class GetFirebaseChannelUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.permalink = oThis.decodedParams.permalink;
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._fetchChannelShareDetails();

    const url = oThis._generateFireBaseUrl();

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: oThis.urlParams.st,
        description: '',
        robots: 'noindex, nofollow',
        canonical: oThis._channelBaseUrl(),
        og: {
          title: oThis.urlParams.st,
          description: '',
          image: oThis.urlParams.si,
          url: oThis._fetchAppLaunchLink()
        },
        twitter: {
          title: oThis.urlParams.st,
          description: '',
          image: oThis.urlParams.si,
          card: "summary_large_image"
        }
      },
      current_user_data: oThis.currentUserData
    });
  }

  /**
   * Fetch video share details
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchChannelShareDetails() {
    const oThis = this;

    let shareResponse = await new ChannelShareDetails(oThis.headers).getChannelShareDetails({channel_permalink: oThis.permalink});
    if(shareResponse.success){
      let resultType = shareResponse.data.result_type;
      oThis.channelShareDetails = shareResponse.data[resultType];
      oThis.currentUserData = shareResponse.data['current_user_data'];
    }
  }

  /**
   * Get firebase url params
   *
   * @returns {Object}
   * @private
   */
  _getFirebaseUrlParams(){
    const oThis = this;

    let urlParams = oThis._getFirebaseCommonUrlParams();
    Object.assign(urlParams, {
      link: oThis._fetchAppLaunchLink(),
      st: oThis.channelShareDetails.title || '',
      sd: oThis.channelShareDetails.message ? oThis.channelShareDetails.message : coreConstants.DEFAULT_SHARE_DESCRIPTION,
      si: oThis.channelShareDetails.poster_image_url ? oThis.channelShareDetails.poster_image_url : coreConstants.DEFAULT_SHARE_IMAGE,
      ofl: oThis._fetchOflLink()
    });
    // Assign all url params
    return urlParams;
  }

  /**
   * Fetch app launch link
   * @returns {*}
   * @private
   */
  _fetchAppLaunchLink() {
    const oThis = this;

    let baseLink = oThis._channelBaseUrl();
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Channel base url
   *
   * @returns {string}
   * @private
   */
  _channelBaseUrl() {
    const oThis = this;

    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.communities}/${oThis.permalink}`;
  }

}

module.exports = GetFirebaseChannelUrl;
