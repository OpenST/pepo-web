const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  Base = require(rootPrefix + '/lib/pepoApi/Base');

class StoreRedemption extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/redemptions';
  }

  /**
   * Get product list
   *
   * @returns {Promise<*>}
   */
  async getProductList(params) {
    const oThis = this;

    return oThis._fireRequest('GET', '/products', params);
  }

  /**
   * Pepo domain
   *
   * @returns {Promise<*|string>}
   * @private
   */
  get _pepoDomain() {
    return coreConstants.PEPO_STORE_DOMAIN;
  }
}

module.exports = StoreRedemption;
