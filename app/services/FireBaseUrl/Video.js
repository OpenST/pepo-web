const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
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
        title: oThis.urlParams.st,
        description: '',
        robots: 'noindex, nofollow',
        canonical: oThis._videoBaseUrl(),
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
    
    // Assign all url params
    return {
      link: oThis._fetchAppLaunchLink(),
      apn: coreConstants.PEPO_ANDROID_PACKAGE_NAME,
      ibi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      isi: coreConstants.PEPO_IOS_APP_ID,
      ipbi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      efr: '0',
      st: 'Pepo - Meet the people shaping the crypto movement',
      sd: oThis.videoShareDetails.message ? oThis.videoShareDetails.message : 'For the best experience keep the checkbox selected',
      si: oThis.videoShareDetails.poster_image_url ? oThis.videoShareDetails.poster_image_url : 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png',
      ofl: oThis._fetchOflLink()
    };
  }
  
  /**
   * Fetch ofl link
   *
   * @returns {*}
   * @private
   */
  _fetchOflLink() {
    const oThis = this;
    
    let baseLink = coreConstants.PEPO_DOMAIN;
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
    
    return `${coreConstants.PEPO_DOMAIN}/video/${oThis.videoId}`;
  }
  
}

module.exports = GetFirebaseVideoUrl;
