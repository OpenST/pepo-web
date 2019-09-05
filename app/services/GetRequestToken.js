const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  PreLaunchInvite = require(rootPrefix + '/lib/pepoApi/PreLaunchInvite'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
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

    await oThis._fetchRequestToken();

    return Promise.resolve(oThis.serviceResp);
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
      let twitterRedirectUrl = coreConstants.TWITTER_OAUTH_URL + resp.data.oAuthToken;

      let twitterSigninError = (oThis.decodedParams.e && oThis.decodedParams.e.toString() == '1') ? 1 : 0;

      oThis.serviceResp = responseHelper.successWithData({
        twitterRedirectUrl: twitterRedirectUrl,
        twitterSigninError: twitterSigninError
      });
    }

    logger.log('End::_fetchRequestToken');

    return responseHelper.successWithData({});
  }

}

module.exports = GetRequestToken;
