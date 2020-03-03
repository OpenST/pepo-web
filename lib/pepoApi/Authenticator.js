/**
 * Social Connect Authorization
 *
 * @module lib/pepoApi/Authenticator
 */
const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for login Pepo Api Calls.
 *
 * @class Authenticator
 */
class Authenticator extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/auth';
  }

  /**
   * Get Twitter Connect Request Token
   *
   * @returns {Promise<*>}
   */
  async getRequestToken(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/twitter/request_token', params);
  }

  /**
   * Post twitter connect request
   *
   * @returns {Promise<*>}
   */
  async twitterLogin(params) {
    const oThis = this;

    return oThis._fireRequest('POST', '/twitter/login', params);
  }

  /**
   * Post apple connect request
   *
   * @returns {Promise<*>}
   */
  async appleLogin(params) {
    const oThis = this;

    return oThis._fireRequest('POST', '/apple/login', params);
  }

  /**
   * Post github connect request
   *
   * @returns {Promise<*>}
   */
  async githubLogin(params) {
    const oThis = this;

    return oThis._fireRequest('POST', '/github/login', params);
  }

  /**
   * Post google connect request
   *
   * @returns {Promise<*>}
   */
  async googleLogin(params) {
    const oThis = this;

    return oThis._fireRequest('POST', '/google/login', params);
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

module.exports = Authenticator;
