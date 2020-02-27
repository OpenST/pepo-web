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

    let urlParams = oThis._getFirebaseCommonUrlParams();
    Object.assign(urlParams, {
      link: oThis._fetchAppLaunchLink(),
      sd: oThis.replyVideoShareDetails.message ? oThis.replyVideoShareDetails.message : coreConstants.DEFAULT_SHARE_DESCRIPTION,
      si: oThis.replyVideoShareDetails.poster_image_url ? oThis.replyVideoShareDetails.poster_image_url : coreConstants.DEFAULT_SHARE_IMAGE,
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
