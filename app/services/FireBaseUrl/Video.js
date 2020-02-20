const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  VideoShareDetails = require(rootPrefix + '/lib/pepoApi/Video');

/**
 * Class to get firebase redirection url for video url
 *
 */
class GetFirebaseVideoUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.videoId = oThis.decodedParams.video_id;

    oThis.videoShareDetails = {};
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._fetchVideoShareDetails();

    const url = oThis._generateFireBaseUrl();

    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: oThis.urlParams.sd,
        description: '',
        robots: 'noindex, nofollow',
        canonical: oThis._videoBaseUrl(),
        og: {
          title: oThis.urlParams.sd,
          description: '',
          image: oThis._getImage(),
          url: oThis._fetchAppLaunchLink()
        },
        twitter: {
          title: oThis.urlParams.sd,
          description: '',
          image: oThis._getImage(),
          card: "summary_large_image"
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
  async _fetchVideoShareDetails() {
    const oThis = this;

    let videoShareResponse = await new VideoShareDetails({}).getVideoShareDetails({videoId: oThis.videoId});
    if(videoShareResponse.success){
      let resultType = videoShareResponse.data.result_type;
      oThis.videoShareDetails = videoShareResponse.data[resultType];
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
      sd: oThis.videoShareDetails.message ? oThis.videoShareDetails.message : 'For the best experience keep the checkbox selected',
      si: 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png', // Some static image.
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

  _getImage() {
    const oThis = this;

    return oThis.videoShareDetails.poster_image_url ? oThis.videoShareDetails.poster_image_url : 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png'
  }
}

module.exports = GetFirebaseVideoUrl;
