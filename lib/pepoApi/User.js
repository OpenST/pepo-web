const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  Base = require(rootPrefix + '/lib/pepoApi/Base');

class User extends Base {
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
   * Get product list
   *
   * @returns {Promise<*>}
   */
  async getCurrentUser(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/current', params);
  }

  /**
   * Validate Doptin token
   *
   * @returns {Promise<*>}
   */
  async doubleOptIn(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/double-opt-in', params);
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

module.exports = User;
