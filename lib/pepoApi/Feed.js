const rootPrefix = '../..',
  Base = require(rootPrefix + '/lib/pepoApi/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class to get feed from pepo api.
 *
 * @class Feed
 */
class Feed extends Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    super( headers);
    const oThis = this;

    oThis.serviceBaseRoute = '/web/feeds';
  }

  async getFeed() {
    const oThis = this;
    return oThis._fireRequest('GET', `/`);
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

module.exports = Feed;
