/**
 * Module for Deep Linking constants.
 *
 * @module lib/globalConstant/deepLinking
 */

const os = require('os');

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for DeepLinking constants.
 *
 * @class DeepLinking
 */
class DeepLinking {
  
  getConfigFor(deviceType) {
    const oThis = this;
  
    if (basicHelper.isProduction() && deviceType === oThis.androidDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.productionAndroidConfigFilePath);
    } else if (basicHelper.isSandbox() && deviceType === oThis.androidDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.sandboxAndroidConfigFilePath);
    } else if (basicHelper.isStaging() && deviceType === oThis.androidDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.stagingAndroidConfigFilePath);
    } else if (basicHelper.isProduction() && deviceType === oThis.iosDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.productionIosConfigFilePath);
    } else if (basicHelper.isSandbox() && deviceType === oThis.iosDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.sandboxIosConfigFilePath);
    } else if (basicHelper.isStaging() && deviceType === oThis.iosDeviceType) {
      return require(rootPrefix + oThis.deepLinkConfigFolder + oThis.stagingIosConfigFilePath);
    } else {
      return {};
    }
  }
  
  get androidDeviceType() {
    return 'android';
  }
  
  get iosDeviceType() {
    return 'ios';
  }
  
  get stagingIosConfigFilePath() {
    return '/ios/staging.json';
  }
  
  get sandboxIosConfigFilePath() {
    return '/ios/sandbox.json';
  }
  
  get productionIosConfigFilePath() {
    return '/ios/production.json';
  }
  
  get stagingAndroidConfigFilePath() {
    return '/android/staging.json';
  }
  
  get sandboxAndroidConfigFilePath() {
    return '/android/sandbox.json';
  }
  
  get productionAndroidConfigFilePath() {
    return '/android/production.json';
  }
  
  get deepLinkConfigFolder() {
    return '/config/deep_linking';
  }
  
}

module.exports = new DeepLinking();
