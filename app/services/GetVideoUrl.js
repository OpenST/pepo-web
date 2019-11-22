const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  VideoShareDetails = require(rootPrefix + '/lib/pepoApi/Video');

const urlParser = require('url');

/**
 * Class to get firebase redirection url for video url
 *
 */
class GetVideoUrl extends ServiceBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.decodedParams = params.decodedParams;
    oThis.videoId = oThis.decodedParams.video_id;
    oThis.urlParams = {};
    
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

    return responseHelper.successWithData({
      url: oThis._generateFireBaseUrl(),
      pageMeta: {
        title: oThis.urlParams.st,
        description: oThis.urlParams.sd,
        image: oThis.urlParams.si
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
   * Generate firebase url
   *
   * @returns {string}
   * @private
   */
  _generateFireBaseUrl() {
    const oThis = this;

    let url = new urlParser.URL(coreConstants.PEPO_FIREBASE_DOMAIN);

    let oflLink = oThis._fetchOflLink();

    // Assign all url params
    oThis.urlParams = {
      link: `${coreConstants.PEPO_DOMAIN}/video/${oThis.videoId}`,
      apn: coreConstants.PEPO_ANDROID_PACKAGE_NAME,
      ibi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      isi: coreConstants.PEPO_IOS_APP_ID,
      ipbi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      efr: '0',
      st: 'Pepo - Meet the people shaping the crypto movement',
      sd: oThis.videoShareDetails.message ? oThis.videoShareDetails.message : 'For the best experience keep the checkbox selected',
      si: oThis.videoShareDetails.poster_image_url ? oThis.videoShareDetails.poster_image_url : 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png',
      ofl: oflLink
    };

    if (!basicHelper.isProduction()) {
      const s3UrlParams = {
        afl: coreConstants.PEPO_ANDROID_APP_LINK,
        ifl: coreConstants.PEPO_IOS_APP_LINK
      };

      Object.assign(oThis.urlParams, s3UrlParams);
    }

    oThis._appendUtmParams();

    return oThis._generateUrl(url);
  }

  /**
   * Fetch ofl link
   * @returns {*}
   * @private
   */
  _fetchOflLink() {
    const oThis = this;

    let oflLink = coreConstants.PEPO_DOMAIN;

    let utmQueryString = '';
    utmQueryString +=  oThis.decodedParams.utm_campaign ? '&utm_campaign=' + oThis.decodedParams.utm_campaign : '';
    utmQueryString +=  oThis.decodedParams.utm_medium ? '&utm_medium=' + oThis.decodedParams.utm_medium : '';
    utmQueryString +=  oThis.decodedParams.utm_source ? '&utm_source=' + oThis.decodedParams.utm_source : '';
    utmQueryString +=  oThis.decodedParams.utm_term ? '&utm_term=' + oThis.decodedParams.utm_term : '';
    utmQueryString +=  oThis.decodedParams.utm_content ? '&utm_content=' + oThis.decodedParams.utm_content : '';

    if (utmQueryString !== '') {
      oflLink += '?' + utmQueryString
    }

    return oflLink;
  }

  /**
   * Append utm params
   *
   * @private
   */
  _appendUtmParams() {
    const oThis = this;

    const utmParams = {
      utm_source: oThis.decodedParams.utm_source || 'default',
      utm_medium: oThis.decodedParams.utm_medium || 'default',
      utm_campaign: oThis.decodedParams.utm_campaign || 'default',
      utm_term: oThis.decodedParams.utm_term || 'default',
      utm_content: oThis.decodedParams.utm_content || 'default'
    };

    Object.assign(oThis.urlParams, utmParams);
  }

  /**
   * Generate url
   *
   * @param url
   * @returns {string}
   * @private
   */
  _generateUrl(url) {
    const oThis = this;

    const searchParams = new urlParser.URLSearchParams(url.searchParams);
    for (let key in oThis.urlParams) {
      let val = oThis.urlParams[key];
      searchParams.append(key, val);
    }
    url.search = searchParams;

    return url.href
  }

}

module.exports = GetVideoUrl;
