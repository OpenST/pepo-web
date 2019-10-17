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

  get android() {
    return 'https://play.google.com/store/apps/details?id=com.pepo.v2.production';
  }

  get ios() {
    return 'https://testflight.apple.com/join/obzi6g2N';
  }

}

module.exports = new AppUpdateLink();
