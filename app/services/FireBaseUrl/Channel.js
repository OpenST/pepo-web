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
    oThis.channelShareDetails = params.channelShareDetails;
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    const url = oThis._generateFireBaseUrl();

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: oThis.urlParams.st,
        description: oThis.urlParams.sd,
        robots: 'index, follow',
        canonical: oThis._channelBaseUrl(),
        og: {
          title: oThis.urlParams.st,
          description: oThis.urlParams.sd,
          image: oThis.urlParams.si,
          url: oThis._fetchAppLaunchLink()
        },
        twitter: {
          title: oThis.urlParams.st,
          description: oThis.urlParams.sd,
          image: oThis.urlParams.si,
          card: "summary_large_image"
        }
      }
    });
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
      sd: oThis.channelShareDetails.description ? oThis.channelShareDetails.description : coreConstants.DEFAULT_SHARE_DESCRIPTION,
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
