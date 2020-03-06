const rootPrefix = '../../..',
  ServiceBase = require(rootPrefix + '/app/services/Base');

/**
 * Class for Authentication Base
 *
 * @class AuthenticationBase
 */
class AuthenticationBase extends ServiceBase {
  /**
   * Constructor for Authentication Base
   *
   * @param {object} params
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.headers = params.headers;
    oThis.decodedParams = params.decodedParams;

    oThis.serviceResp = {};
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._sendApiRequest();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Send Request to Pepo Api
   *
   * @returns {Promise<void>}
   * @private
   */
  async _sendApiRequest(){
    throw 'Sub-class to implement';
  }

}

module.exports = AuthenticationBase;
