const rootPrefix = '../../..',
  AuthenticatorBase = require(rootPrefix + '/app/services/Authenticate/Base'),
  AuthenticatorApi = require(rootPrefix + '/lib/pepoApi/Authenticator'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

/**
 * Class for Apple Authentication
 *
 * @class AppleAuthenticator
 */
class AppleAuthenticator extends AuthenticatorBase {
  /**
   * Constructor for Apple Authentication
   *
   * @param {object} params
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);
  }

  /**
   * Send Request to Pepo Api
   *
   * @return {Promise<Result>}
   * @private
   */
  async _sendApiRequest() {
    const oThis = this;
    logger.log('Start::_sendAppleLogin');

    let errRedirectUrl = `${pagePathConstants.home}?e=1`;

    if (oThis.decodedParams.code && oThis.decodedParams.id_token) {
      let userDetails = {};
      if(oThis.decodedParams.user){
        userDetails = JSON.parse(oThis.decodedParams.user);
      }
      const apiParams = {identity_token: oThis.decodedParams.id_token,
          authorization_code: oThis.decodedParams.code, full_name: userDetails.name,
          email: userDetails.email },

        authenticatorApi = new AuthenticatorApi(oThis.headers),
        resp = await authenticatorApi.appleLogin(apiParams);

      if (resp.isFailure()) {
        const responseDebugData = resp.getDebugData();

        return Promise.reject(responseHelper.error({
          internal_error_identifier: 'a_s_a_a_1',
          api_error_identifier: 'unauthorized_api_request',
          debug_options: {redirectUrl: errRedirectUrl}
        }));
      }

      oThis.serviceResp = resp;

    } else {
      return Promise.reject(responseHelper.error({
        internal_error_identifier: 'a_s_a_a_2',
        api_error_identifier: 'unauthorized_api_request',
        debug_options: {redirectUrl: errRedirectUrl}
      }));
    }

    logger.log('End::_sendAppleLogin');

    return responseHelper.successWithData({});
  }

}

module.exports = AppleAuthenticator;
