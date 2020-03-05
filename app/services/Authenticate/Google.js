const rootPrefix = '../../..',
  AuthenticatorBase = require(rootPrefix + '/app/services/Authenticate/Base'),
  AuthenticatorApi = require(rootPrefix + '/lib/pepoApi/Authenticator'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

/**
 * Class for google Authentication
 *
 * @class GoogleAuthenticator
 */
class GoogleAuthenticator extends AuthenticatorBase {
  /**
   * Constructor for google Authentication
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
    logger.log('Start::_sendGoogleLogin');

    let errRedirectUrl = `${pagePathConstants.home}?e=1`;

    if (oThis.decodedParams.code) {
      const apiParams = {identity_token: oThis.decodedParams.id_token,
          authorization_code: oThis.decodedParams.code },

        authenticatorApi = new AuthenticatorApi(oThis.headers),
        resp = await authenticatorApi.googleLogin(apiParams);

      if (resp.isFailure()) {
        const responseDebugData = resp.getDebugData();

        return Promise.reject(responseHelper.error({
          internal_error_identifier: 'a_s_a_g_1',
          api_error_identifier: 'unauthorized_api_request',
          debug_options: {redirectUrl: errRedirectUrl}
        }));
      }

      oThis.serviceResp = resp;

    } else {
      return Promise.reject(responseHelper.error({
        internal_error_identifier: 'a_s_a_g_2',
        api_error_identifier: 'unauthorized_api_request',
        debug_options: {redirectUrl: errRedirectUrl}
      }));
    }

    logger.log('End::_sendGoogleLogin');

    return responseHelper.successWithData({});
  }

}

module.exports = GoogleAuthenticator;
