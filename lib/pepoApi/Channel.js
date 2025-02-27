/**
 * Video
 *
 * @module lib/pepoApi/ReplyVideo
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for channel Pepo Api Calls.
 *
 * @class Channel
 */
class Channel extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/channels';
  }


  /**
   * Get channel share details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getChannelShareDetails(params) {
    const oThis = this;

    return oThis._fireRequest('GET', `/${params.channel_permalink}/share`, params, {fetchCurrentUserData: 0});
  }


  /**
   * Get channel details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getChannelDetails(params) {
    const oThis = this;

    return oThis._fireRequest('GET', `/${params.permalink}`, params, {fetchCurrentUserData: 0});
  }


  /**
   * Get channel details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getMeetingDetails(params) {
    const oThis = this;

    return oThis._fireRequest('GET', `/${params.permalink}/meetings/${params.meetingId}`, params, {fetchCurrentUserData: 0});
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
module.exports = Channel;
