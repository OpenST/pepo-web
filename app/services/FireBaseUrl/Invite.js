const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get firebase redirection url for invite url
 *
 */
class GetFirebaseInviteUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.inviteCode = oThis.decodedParams.code;
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    return responseHelper.successWithData({
      url: oThis._generateFireBaseUrl(),
      pageMeta: {
        title: oThis.urlParams.st,
        description: '',
        robots: 'noindex, nofollow',
        canonical: coreConstants.PEPO_DOMAIN,
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
      sd: 'REAL PEOPLE. REAL CONNECTIONS.',
      si: 'https://d3attjoi5jlede.cloudfront.net/images/web/fav/pepo-intermittent-img.png',
      ofl: oThis._fetchOflLink()
    });
    // Assign all url params
    return urlParams;
  }

  /**
   * Fetch ofl link
   * @returns {*}
   * @private
   */
  _fetchOflLink() {
    const oThis = this;

    let whitelistedCodes = ['whatgrindsmygears', 'epicenter', 'brave', 'linkedin', 'facebook', 'etherscan', 'ph', 'reddit', 'google', 'stories', 'tw'],
      inviteCode = (oThis.inviteCode || '').toLowerCase()
    ;

    let baseLink = whitelistedCodes.includes(inviteCode) ? coreConstants.PEPO_DOMAIN + "/" + inviteCode + "/desktop" : coreConstants.PEPO_DOMAIN;
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Fetch app launch link
   * @returns {*}
   * @private
   */
  _fetchAppLaunchLink() {
    const oThis = this;

    let baseLink = coreConstants.PEPO_DOMAIN;

    let queryString = oThis._generateUtmQueryString();
    queryString +=  oThis.inviteCode ? '&invite=' + oThis.inviteCode : '';

    return baseLink + (queryString ? `?${queryString}` : '');
  }
}

module.exports = GetFirebaseInviteUrl;
