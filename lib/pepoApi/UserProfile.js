/**
 * Video
 *
 * @module lib/pepoApi/ReplyVideo
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for User profile Pepo Api Calls.
 *
 * @class UserProfile
 */
class UserProfile extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/users';
  }


  /**
   * Get user profile share details
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getUserProfileShareDetails(params) {
    const oThis = this;

    return oThis._fireRequest('GET', `/${params.username}/share`, params);
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
module.exports = UserProfile;
