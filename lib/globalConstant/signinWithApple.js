/**
 * Module for signin with apple helper methods
 *
 * @module lib/globalConstant/signinWithApple
 */

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic');

/**
 * Class for SigninWithApple constants.
 *
 * @class SigninWithApple
 */
class SigninWithApple {

  getAppleDeveloperDomainAssociation() {
    const oThis = this;

    if (basicHelper.isProduction()) {
      return require(rootPrefix + oThis.signinWithAppleConfigFolder + oThis.productionConfigFilePath);
    } else if (basicHelper.isSandbox()) {
      throw 'configuration required.';
    } else if (basicHelper.isStaging()) {
      return require(rootPrefix + oThis.signinWithAppleConfigFolder + oThis.stagingConfigFilePath);
    } else {
      return '';
    }
  }

  get sandboxConfigFilePath() {
    return '/sandbox.js';
  }

  get stagingConfigFilePath() {
    return '/staging.js';
  }

  get productionConfigFilePath() {
    return '/production.js';
  }

  get signinWithAppleConfigFolder() {
    return '/config/verification/signin_with_apple';
  }

}

module.exports = new SigninWithApple();
