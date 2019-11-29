/**
 * Video
 *
 * @module lib/pepoApi/ReplyVideo
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for reply video share details Pepo Api Calls.
 *
 * @class ReplyVideo
 */
class ReplyVideo extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;
    
    oThis.serviceBaseRoute = '/v1/replies';
  }
  
  
  /**
   * Get reply video share details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getReplyVideoShareDetails(params) {
    const oThis = this;
    
    return oThis._fireRequest('GET', `/${params.reply_detail_id}/share`, params);
  }
  
  /**
   * Pepo domain
   *
   * @returns {Promise<*|string>}
   * @private
   */
  get _pepoDomain() {
    return coreConstants.PEPO_DOMAIN;
  }
}
module.exports = ReplyVideo;