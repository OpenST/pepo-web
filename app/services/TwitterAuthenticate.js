const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger');

/**
 * Class for Twitter Request Token for Pre Launch Invite.
 *
 * @class PreLaunchTwitterConnect
 */
class TwitterAuthenticate extends ServiceBase {
  /**
   * Constructor for signup service.
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

    await oThis._verify();

    return Promise.resolve(oThis.serviceResp);
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
        return Promise.reject(responseHelper.error({
          internal_error_identifier: 'r_i_ta_1',
          api_error_identifier: 'unauthorized_api_request',
          debug_options: {redirectUrl: errRedirectUrl}
        }));
      }

      oThis.serviceResp = resp;

    } else {
      return Promise.reject(responseHelper.error({
        internal_error_identifier: 'r_i_ta_2',
        api_error_identifier: 'unauthorized_api_request',
        debug_options: {redirectUrl: errRedirectUrl}
      }));
    }

    logger.log('End::_fetchRequestToken');

    return responseHelper.successWithData({});
  }

}

module.exports = TwitterAuthenticate;
