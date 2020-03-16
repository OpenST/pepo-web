const rootPrefix = "../..";

// All Requires
const UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  CurrentUser = require(rootPrefix + '/lib/model/CurrentUser');

const errorConfig = basicHelper.fetchErrorConfig();

class webRouteHelper {

  /**
   *
   * @param req
   * @param res
   * @param serviceGetter
   * @param contentPartialPath
   * @param errorCode
   * @param onServiceSuccess
   * @param onServiceFailure
   * @returns {Promise<void>}
   */
  static perform(
    req,
    res,
    serviceGetter,
    layout,
    contentPartialPath,
    errorCode,
    onServiceSuccess,
    onServiceFailure
  ) {
    const oThis = this;

    return oThis
      .asyncPerform(req, res, serviceGetter, layout, contentPartialPath,onServiceSuccess, onServiceFailure)
      .catch(async function(error) {
        logger.error(errorCode, 'Something went wrong', error);

        return responseHelper.renderApiResponse(error, res, errorConfig);
      });
  }

  /**
   *
   * @param req
   * @param res
   * @param serviceGetter
   * @param layout
   * @param contentPartialPath
   * @param onServiceSuccess
   * @param onServiceFailure
   * @returns {Promise<void>}
   */
  static async asyncPerform(
    req,
    res,
    serviceGetter,
    layout,
    contentPartialPath,
    onServiceSuccess,
    onServiceFailure
  ) {
    req.decodedParams = req.decodedParams || {};

    const Service = require(rootPrefix + serviceGetter);
    const serviceResp = await new Service({headers: req.headers, decodedParams: req.decodedParams}).perform();

    if(serviceResp.isSuccess()){
      if(onServiceSuccess){
        await onServiceSuccess(serviceResp);
      }
      let locals = serviceResp.data || {};
      renderResponseHelper.renderWithLayout(req, res, layout, contentPartialPath, locals);
    } else {
      if (onServiceFailure) {
        await onServiceFailure(serviceResp);
      }
      return Promise.reject(serviceResp);
    }

  }
}


module.exports = webRouteHelper;
