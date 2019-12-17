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

    // Assign all url params
    return {
      link: oThis._fetchAppLaunchLink(),
      apn: coreConstants.PEPO_ANDROID_PACKAGE_NAME,
      ibi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      isi: coreConstants.PEPO_IOS_APP_ID,
      ipbi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      efr: '0',
      st: 'Pepo - Meet the people shaping the crypto movement',
      sd: 'For the best experience keep the checkbox selected',
      si: 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png',
      ofl: oThis._fetchOflLink()
    };
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
