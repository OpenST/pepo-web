const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get firebase redirection url for channel url
 *
 */
class GetFirebaseMeetingPageUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.channelPermalink = params.channelPermalink;
    oThis.meetingId = params.meetingId;
    oThis.shareDetails = params.shareDetails;
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

    const title = oThis.shareDetails.title,
      description = oThis.shareDetails.description,
      image = oThis.shareDetails.imageUrl,
      keywords = oThis.shareDetails.keywords || '';

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: title,
        description: description,
        keywords: keywords,
        robots: 'index, follow',
        canonical: oThis._meetingsPageBaseUrl(),
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
      st: oThis.shareDetails.title,
      sd: oThis.shareDetails.description,
      si: oThis.shareDetails.image,
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

    let baseLink = oThis._meetingsPageBaseUrl();
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Channel base url
   *
   * @returns {string}
   * @private
   */
  _meetingsPageBaseUrl() {
    const oThis = this;

    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.communities}/${oThis.channelPermalink}${pagePathConstants.meetings}/${oThis.meetingId}`;
  }

}

module.exports = GetFirebaseMeetingPageUrl;
