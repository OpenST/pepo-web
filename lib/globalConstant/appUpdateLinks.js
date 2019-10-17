/**
 * Module for PagePath constants.
 *
 * @module lib/globalConstant/appUpdateLinks
 */

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for app update link constants.
 *
 * @class AppUpdateLink
 */
class AppUpdateLink {

  get androidDeviceOs() {
    return 'android';
  }

  get iosDeviceOs() {
    return 'ios';
  }

  get androidUpdateLink() {
    return coreConstants.PEPO_ANDROID_APP_LINK;
  }

  get iosUpdateLink() {
    return coreConstants.PEPO_IOS_APP_LINK;
  }

}

module.exports = new AppUpdateLink();
