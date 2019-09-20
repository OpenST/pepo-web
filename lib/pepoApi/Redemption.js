const rootPrefix = '../..',
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
}

module.exports = Redemption;
