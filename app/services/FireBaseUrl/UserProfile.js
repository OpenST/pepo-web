const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  UserApi = require(rootPrefix + '/lib/pepoApi/User');

/**
 * Class to get firebase redirection url for profile url
 *
 */
class GetFirebaseUserProfileUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.permalink = oThis.decodedParams.permalink;
    oThis.profileShareDetails = {};
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._fetchProfileShareDetails();

    const url = oThis._generateFireBaseUrl();

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: oThis.urlParams.st,
        description: '',
        robots: 'noindex, nofollow',
        canonical: oThis._profileBaseUrl(),
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
          card: "summary"
        }
      }
    });
  }

  /**
   * Fetch video share details
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchProfileShareDetails() {
    const oThis = this;

    let shareResponse = await new UserApi(oThis.headers).getUserProfileShareDetails({username: oThis.permalink});
    if(shareResponse.success){
      let resultType = shareResponse.data.result_type;
      oThis.profileShareDetails = shareResponse.data[resultType];
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
      st: oThis.profileShareDetails.title || '',
      sd: oThis.profileShareDetails.message ? oThis.profileShareDetails.message : coreConstants.DEFAULT_SHARE_DESCRIPTION,
      si: oThis.profileShareDetails.poster_image_url ? oThis.profileShareDetails.poster_image_url : coreConstants.DEFAULT_SHARE_IMAGE,
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

    let baseLink = oThis._profileBaseUrl();
    let queryString = oThis._generateUtmQueryString();

    queryString += oThis.decodedParams.at? '&at=' + oThis.decodedParams.at : '';

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  _fetchOflLink() {
    const oThis = this;

    let baseLink = coreConstants.PEPO_DOMAIN;
    let queryString = oThis._generateUtmQueryString();

    queryString += oThis.decodedParams.at? '&at=' + oThis.decodedParams.at : '';

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Profile base url
   *
   * @returns {string}
   * @private
   */
  _profileBaseUrl() {
    const oThis = this;

    return `${coreConstants.PEPO_DOMAIN}/${oThis.permalink}`;
  }

}

module.exports = GetFirebaseUserProfileUrl;
