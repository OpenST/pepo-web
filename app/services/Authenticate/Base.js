const rootPrefix = '../../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  apiInternalCodesConstants = require(rootPrefix + '/lib/globalConstant/apiInternalCodes'),
  AuthenticatorApi = require(rootPrefix + '/lib/pepoApi/Authenticator'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

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

  /**
   * Validate Twitter Connect
   *
   * @return {Promise<Result>}
   * @private
   */
  async _verify() {
    const oThis = this;
    logger.log('Start::_fetchRequestToken');

    let errRedirectUrl = `${pagePathConstants.home}?e=1`;

    if (oThis.decodedParams.oauth_token && oThis.decodedParams.oauth_verifier) {
      let PreLaunchInviteObj = new PreLaunchInvite(oThis.headers);
      let resp = await PreLaunchInviteObj.twitterLogin(oThis.decodedParams);

      if (resp.isFailure()) {
        const responseDebugData = resp.getDebugData();
        if (responseDebugData.err.code === apiInternalCodesConstants.alreadyRegisteredUserInApp) {
          errRedirectUrl = `${pagePathConstants.home}?e=2`;
          return Promise.reject(responseHelper.error({
            internal_error_identifier: 'r_i_ta_1',
            api_error_identifier: 'already_registered_in_app',
            error_config: basicHelper.fetchErrorConfig(),
            debug_options: {redirectUrl: errRedirectUrl}
          }));
        }

        return Promise.reject(responseHelper.error({
          internal_error_identifier: 'r_i_ta_2',
          api_error_identifier: 'unauthorized_api_request',
          debug_options: {redirectUrl: errRedirectUrl}
        }));
      }

      oThis.serviceResp = resp;

    } else {
      return Promise.reject(responseHelper.error({
        internal_error_identifier: 'r_i_ta_3',
        api_error_identifier: 'unauthorized_api_request',
        debug_options: {redirectUrl: errRedirectUrl}
      }));
    }

    logger.log('End::_fetchRequestToken');

    return responseHelper.successWithData({});
  }

}

module.exports = AuthenticationBase;
