const rootPrefix = '../../..',
  FirebaseUrlBase = require(rootPrefix + '/app/services/FireBaseUrl/Base'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  ReplyVideoShareDetails = require(rootPrefix + '/lib/pepoApi/ReplyVideo');

/**
 * Class to get firebase redirection url for reply video url
 *
 */
class GetFirebaseReplyVideoUrl extends FirebaseUrlBase {
  constructor(params) {
    super(params);
    
    const oThis = this;
    oThis.replyDetailId = oThis.decodedParams.reply_detail_id;
    
    oThis.replyVideoShareDetails = {};
  }
  
  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;
    
    await oThis._fetchReplyVideoShareDetails();
    
    const url = oThis._generateFireBaseUrl();
    
    return responseHelper.successWithData({
      url: url,
      pageMeta: {
        title: oThis.urlParams.st,
        description: '',
        robots: 'noindex, nofollow',
        canonical: oThis._replyVideoBaseUrl(),
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
  async _fetchReplyVideoShareDetails() {
    const oThis = this;
    
    let replyVideoShareResponse = await new ReplyVideoShareDetails({}).getReplyVideoShareDetails({reply_detail_id: oThis.replyDetailId});
    if(replyVideoShareResponse.success){
      let resultType = replyVideoShareResponse.data.result_type;
      oThis.replyVideoShareDetails = replyVideoShareResponse.data[resultType];
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
      sd: oThis.replyVideoShareDetails.message ? oThis.replyVideoShareDetails.message : 'For the best experience keep the checkbox selected',
      si: oThis.replyVideoShareDetails.poster_image_url ? oThis.replyVideoShareDetails.poster_image_url : 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png',
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
    
    let baseLink = oThis._replyVideoBaseUrl();
    let queryString = oThis._generateUtmQueryString();
    
    return baseLink + (queryString ? `?${queryString}` : '');
  }
  
  /**
   * Video base url
   *
   * @returns {string}
   * @private
   */
  _replyVideoBaseUrl() {
    const oThis = this;
    
    return `${coreConstants.PEPO_DOMAIN}${pagePathConstants.reply}/${oThis.replyDetailId}`;
  }
  
}

module.exports = GetFirebaseReplyVideoUrl;
