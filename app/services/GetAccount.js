const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  GetCurrentUser = require(rootPrefix + '/lib/pepoApi/User'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

/**
 * Class for Pre Launch User account details
 *
 * @class GetAccount
 */
class GetAccount extends ServiceBase {
  /**
   * Constructor for Pre Launch User account details
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

    await oThis._fetchAccountInfo();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch Pre Launch User account details
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchAccountInfo() {
    const oThis = this;
    logger.log('Start::_fetchAccountInfo');

    let resp = await new GetCurrentUser(oThis.headers).getCurrentUser();

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp
    }

    return responseHelper.successWithData({});
  }

}

module.exports = GetAccount;
