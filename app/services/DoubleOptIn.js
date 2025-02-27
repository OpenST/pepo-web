const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

/**
 * Class for double opt in.
 *
 * @class DoubleOptIn
 */
class DoubleOptIn extends ServiceBase {
  /**
   * Constructor for double opt in.
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

    await oThis._validateDoptin();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch Double opt in token
   *
   * @return {Promise<Result>}
   * @private
   */
  async _validateDoptin() {
    const oThis = this;
    logger.log('Start::_validateDoptin');

    let UserApiObj = new UserApi(oThis.headers);
    let resp = await UserApiObj.doubleOptIn(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp
    }

    logger.log('End::_validateDoptin');

    return responseHelper.successWithData({});
  }

}

module.exports = DoubleOptIn;
