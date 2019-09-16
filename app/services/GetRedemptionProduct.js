const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  RedemptionApi = require(rootPrefix + '/lib/pepoApi/Redemption'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

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

    await oThis._fetchProducts();

    let pepoBalance = basicHelper.convertWeiToNormal(oThis.serviceResp.data.balance.available_balance).toString(10),
      pricePoint = oThis.serviceResp.data.price_points;
    oThis.serviceResp.data.balance_in_higer_unit = pepoBalance;
    oThis.serviceResp.data.usd_amount = basicHelper.getUSDAmountForPepoForDisplay(pricePoint['OST']['USD'], pepoBalance);

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch products
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchProducts() {
    const oThis = this;

    let redemptionApiObj = new RedemptionApi(oThis.headers);
    let resp = await redemptionApiObj.getProductList(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp
    }

    return responseHelper.successWithData({});
  }

}

module.exports = GetAccount;
