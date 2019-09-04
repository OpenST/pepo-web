/**
 * Twitter Authorization
 *
 * @module lib/twitter/oAuth1.0/Account
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for Pre Launch Invite Pepo Api Calls.
 *
 * @class Account
 */
class PreLaunchInvite extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(cookies, headers) {
    super(cookies, headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/preLaunch';
  }

  /**
   * Get Twitter Connect Request Token
   *
   * @returns {Promise<*>}
   */
  async getRequestToken(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/twitter/request_token');
  }
}

module.exports = PreLaunchInvite;
