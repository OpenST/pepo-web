const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  StoreRedemptionApi = require(rootPrefix + '/lib/pepoApi/StoreRedemption'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  numeral = require(rootPrefix + '/assets/js/plugins/numeral-js/numeral.js');

class GetStoreProducts extends ServiceBase {
  /**
   * Constructor
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
      pricePoint = oThis.serviceResp.data.price_points['OST']['USD'];

    oThis.serviceResp.data.pepocorn_balance = numeral(oThis.serviceResp.data.pepocorn_balance).format("0[.]00", Math.floor);

    oThis.serviceResp.data.usd_amount = basicHelper.getUSDAmountForPepoForDisplay(pricePoint, pepoBalance);

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch products.
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchProducts() {
    const oThis = this;

    let redemptionApiObj = new StoreRedemptionApi(oThis.headers);
    let resp = await redemptionApiObj.getProductList(oThis.decodedParams);

    let serviceResponse = {};

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      const resultType = resp.data.result_type;
      serviceResponse = resp.data[resultType];
      oThis.serviceResp = responseHelper.successWithData(serviceResponse);
    }

    return responseHelper.successWithData({});
  }

}

module.exports = GetStoreProducts;
