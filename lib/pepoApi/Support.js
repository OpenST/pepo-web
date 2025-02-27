const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  Base = require(rootPrefix + '/lib/pepoApi/Base');

class Redemption extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/support';
  }

  /**
   * Get product list
   *
   * @returns {Promise<*>}
   */
  async validateSupportLink(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/', params);
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

module.exports = Redemption;
