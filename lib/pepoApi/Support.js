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
}

module.exports = Redemption;
