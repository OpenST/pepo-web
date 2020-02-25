const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get firebase redirection url for video url
 *
 */
class GetFirebaseVideoUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.videoId = oThis.decodedParams.video_id;
    oThis.videoResponse = params.videoResponse;
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    const title = oThis._getPageTitle();
    const description = oThis._getPageDescription();
    const image = oThis._getPageImage();
    const url = oThis._generateFireBaseUrl();

    return responseHelper.successWithData({
      url: url, // firebase url
      pageMeta: {
        title: title,
        description: description,
        robots: 'index, follow',
        canonical: oThis._videoBaseUrl(),
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
   *  Get Title for video page
   *
   * @returns {string}
   * @private
   */
  _getPageTitle() {
    const oThis = this,
      userId = oThis.videoResponse.video_details[oThis.videoId].creator_user_id,
      userInfo = oThis.videoResponse.users[userId];

    return (userInfo.name + "'s Video " + oThis.videoId + " - Pepo");
  }

  /**
   *  Get Description for video page
   *
   * @returns {string}
   * @private
   */
  _getPageDescription() {
    const oThis = this,
      descId = oThis.videoResponse.video_details[oThis.videoId].description_id;

    if(descId && oThis.videoResponse.video_descriptions[descId]){
      return oThis.videoResponse.video_descriptions[descId].text;
    }

    return coreConstants.DEFAULT_SHARE_DESCRIPTION;
  }

  /**
   *  Get image for video page
   *
   * @returns {string}
   * @private
   */
  _getPageImage() {
    const oThis = this,
      imageId = oThis.videoResponse.video_details[oThis.videoId].poster_image_id;

    if(imageId && oThis.videoResponse.images[imageId]){
      return oThis.videoResponse.images[imageId].resolutions['original'].url;
    }

    return coreConstants.DEFAULT_SHARE_IMAGE;
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
      ofl: oThis._fetchAppLaunchLink()
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

    let baseLink = oThis._videoBaseUrl();
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Video base url
   *
   * @returns {string}
   * @private
   */
  _videoBaseUrl() {
    const oThis = this;

    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.video}/${oThis.videoId}`;
  }

}

module.exports = GetFirebaseVideoUrl;
