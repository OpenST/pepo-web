const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  SupportApi = require(rootPrefix + '/lib/pepoApi/Support'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

class GetSupportDetails extends ServiceBase {
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

    await oThis._fetchSupportDetails();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Fetch products
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchSupportDetails() {
    const oThis = this;

    let supportApiObj = new SupportApi(oThis.headers);
    let resp = await supportApiObj.validateSupportLink(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      oThis.serviceResp = resp;
      oThis.serviceResp.data['_supportWidgetAppId'] = coreConstants.SUPPORT_WIDGET_APP_ID;
    }

    return responseHelper.successWithData({});
  }

}

module.exports = GetSupportDetails;
