/**
 * This is base class for all services.
 *
 * @module app/services/Base
 */

const rootPrefix = '../..',
  UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  CurrentUser = require(rootPrefix + '/lib/model/CurrentUser');

// Declare error config.
const errorConfig = basicHelper.fetchErrorConfig();

/**
 * Base class for all services.
 *
 * @class ServicesBase
 */
class ServicesBase {
  /**
   * Constructor for base class for all services.
   *
   * @constructor
   */
  constructor() {
    const oThis = this;

    oThis.currentUserData = null;
    oThis.currentUser = null;
  }

  /**
   * Main performer method for the class.
   *
   * @returns {Promise<*>}
   */
  perform() {
    const oThis = this;

    return oThis._asyncPerform().catch(async function(err) {
      let errorObject = err;

      if (!responseHelper.isCustomResult(err)) {
        errorObject = responseHelper.error({
          internal_error_identifier: 'a_s_b_1',
          api_error_identifier: 'something_went_wrong',
          debug_options: { error: err.toString() },
          error_config: errorConfig
        });
      }
      logger.error(' In catch block of services/Base.js', err);

      return errorObject;
    });
  }

  /**
   * Async perform.
   *
   * @private
   * @returns {Promise<void>}
   */
  async _asyncPerform() {
    throw new Error('Sub-class to implement.');
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async getCurrentUser() {
    const oThis = this;

    if(!oThis.currentUserData && cookieConstants.hasWebLoginCookie(oThis.headers['cookie'])){
      let currentUserData = await new UserApi(oThis.headers).getCurrentUser({});
      if(currentUserData.data){
        oThis.currentUserData = currentUserData.data;
      }
    }
    oThis.currentUser = new CurrentUser(oThis.currentUserData);
  }
}

module.exports = ServicesBase;
