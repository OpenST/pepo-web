const rootPrefix = '../../..',
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get pepo feed page url.
 *
 * @class GetFeedUrl
 */
class GetFeedUrl extends FirebaseUrlBase {
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
        description: '',
        robots: 'index, follow',
        canonical: oThis._feedUrl(),
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

    let baseLink = `${coreConstants.PEPO_DOMAIN}`;
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Feed base url
   *
   * @returns {string}
   * @private
   */
  _feedUrl() {
    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.feed}`;
  }

}

module.exports = GetFeedUrl;
