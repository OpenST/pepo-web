const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieGlobalConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for Twitter Request Token for Pre Launch Invite.
 *
 * @class PreLaunchTwitterConnect
 */
class GetRequestToken extends ServiceBase {
  /**
   * Constructor for Twitter Request Token for Pre Launch Invite.
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

    await oThis._validateLoggedIn();

    await oThis._fetchRequestToken();

    return Promise.resolve(oThis.serviceResp);
  }

  /**
   * Check if already Logged In
   *
   * @return {Promise<Result>}
   * @private
   */
  async _validateLoggedIn() {
    const oThis = this;

    const hasLoginCookie = oThis.headers['cookie'] ?
      oThis.headers['cookie'].includes(`${cookieGlobalConstants.preLaunchloginCookieName}=`) :
      false;

    console.log("oThis.headers['cookie']", oThis.headers['cookie'], hasLoginCookie);

    if (hasLoginCookie) {
      let PreLaunchInviteObj = new PreLaunchInvite(oThis.headers);
      let resp = await PreLaunchInviteObj.getAccountInfo();

      if (resp.isSuccess()) {
        return Promise.reject(responseHelper.error({
          internal_error_identifier: 'a_s_grt_vli_1',
          api_error_identifier: 'already_logged_in',
          debug_options: {redirectUrl: pagePathConstants.account}
        }));
      }
    }

    return responseHelper.successWithData({});
  }

  /**
   * Fetch Token For Twitter Connect
   *
   * @return {Promise<Result>}
   * @private
   */
  async _fetchRequestToken() {
    const oThis = this;
    logger.log('Start::_fetchRequestToken');

    let PreLaunchInviteObj = new PreLaunchInvite(oThis.headers);
    let resp = await PreLaunchInviteObj.getRequestToken(oThis.decodedParams);

    if (resp.isFailure()) {
      return Promise.reject(resp);
    } else {

      let twitterSigninError = 0;

      if (oThis.decodedParams.e) {
        if (oThis.decodedParams.e.toString() === '1') {
          twitterSigninError = 1;
        }
        else if (oThis.decodedParams.e.toString() === '2') {
          twitterSigninError = 2;
        }
      }

      oThis.serviceResp = responseHelper.successWithData({
        twitterRedirectUrl: resp.data.twitterRedirectUrl,
        twitterSigninError: twitterSigninError
      });
    }

    logger.log('End::_fetchRequestToken');

    return responseHelper.successWithData({});
  }

}

module.exports = GetRequestToken;
