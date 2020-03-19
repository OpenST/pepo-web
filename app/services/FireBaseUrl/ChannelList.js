const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get firebase redirection url for channel url
 *
 */
class GetFirebaseChannelUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
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

    const title = 'Communities - Pepo',
      description = 'Pepo communities',
      image = coreConstants.DEFAULT_SHARE_IMAGE;

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: title,
        description: description,
        robots: 'index, follow',
        canonical: oThis._channelListUrl(),
        og: {
          title: title,
          description: description,
          image: image,
          url: oThis._fetchAppLaunchLink()
        },
        twitter: {
          title: title,
          description: description,
          image: image,
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
      st: 'Pepo communities',
      sd: coreConstants.DEFAULT_SHARE_DESCRIPTION,
      si: coreConstants.DEFAULT_SHARE_IMAGE,
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
  _channelListUrl() {
    const oThis = this;

    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.communities}`;
  }

}

module.exports = GetFirebaseChannelUrl;
