const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  SupportApi = require(rootPrefix + '/lib/pepoApi/Support'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

class GetSupportDetails extends ServiceBase {
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

    let serviceResponse = {};

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {
      const resultType = resp.data.result_type;
      serviceResponse = resp.data[resultType];
      serviceResponse['_supportWidgetAppId'] = coreConstants.SUPPORT_WIDGET_APP_ID;
      let userName = serviceResponse['user_name'];
      if (userName) {
        serviceResponse['unescaped_user_name'] = basicHelper.decodeHtmlEntity(userName);
      } else {
        serviceResponse['unescaped_user_name'] = userName;
      }
    }

    oThis.serviceResp = responseHelper.successWithData(serviceResponse);
  }

}

module.exports = GetSupportDetails;
