const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get pepo home page url.
 *
 * @class GetHomeUrl
 */
class GetHomeUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);
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

    const response = {
      url: url,
      pageMeta: {
        title: oThis.urlParams.st,
        description: 'Real People. Real Connections.',
        robots: 'noindex, nofollow',
        canonical: oThis._pepoHomeBaseUrl(),
        og: {
          title: oThis.urlParams.st,
          description: 'Real People. Real Connections.',
          image: oThis.urlParams.si,
          url: oThis._fetchAppLaunchLink()
        },
        twitter: {
          title: oThis.urlParams.st,
          description: 'Real People. Real Connections.',
          image: oThis.urlParams.si,
          card: "summary_large_image"
        }
      }
    };

    return responseHelper.successWithData(response);
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

    let baseLink = oThis._pepoHomeBaseUrl();
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Video base url
   *
   * @returns {string}
   * @private
   */
  _pepoHomeBaseUrl() {
    return `${coreConstants.PEPO_DOMAIN}`;
  }

}

module.exports = GetHomeUrl;
