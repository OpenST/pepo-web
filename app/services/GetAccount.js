const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for Pre Launch User account details
 *
 * @class PreLaunchTwitterConnect
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
    oThis.cookies = params.cookies;
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

    let PreLaunchInviteObj = new PreLaunchInvite(oThis.cookies, {});
    let resp = await PreLaunchInviteObj.getAccountInfo();

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp
    }

    logger.log('End::_fetchAccountInfo');

    return responseHelper.successWithData({});
  }

}

module.exports = GetAccount;
