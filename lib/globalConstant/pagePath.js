/**
 * Module for PagePath constants.
 *
 * @module lib/globalConstant/pagePath
 */

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants');

/**
 * Class for PagePath constants.
 *
 * @class Cookie
 */
class PagePath {

  inviteFullUrl(inviteCode) {
    const oThis = this;

    return coreConstants.PEPO_DOMAIN + oThis.home + '?invite=' + inviteCode;
  }

  get home() {
    return '/';
  }

  get webview() {
    return '/webview';
  }

  get zoomMeeting() {
    return '/zoom-meeting';
  }

  get defaultUnauthorizedRedirect() {
    const oThis = this;
    return oThis.home;
  }

  get video() {
    return '/video';
  }

  get reply() {
    return '/reply';
  }

  get communities() {
    return '/communities';
  }

  get feed() {
    return '/feed';
  }

  get meetings() {
    return '/meetings';
  }

}

module.exports = new PagePath();
