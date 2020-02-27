/**
 * Video
 *
 * @module lib/pepoApi/Video
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for Pre Launch Invite Pepo Api Calls.
 *
 * @class Account
 */
class Video extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;
    
    oThis.serviceBaseRoute = '/web/videos';
  }
  
  
  /**
   * Get video share details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getVideoShareDetails(params) {
    const oThis = this;
    
    return oThis._fireRequest('GET', `/${params.videoId}/share`, params);
  }

  async getVideoDetails(params) {
    const oThis = this;
    return oThis._fireRequest('GET', `/${params.video_id}`);
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
module.exports = Video;
