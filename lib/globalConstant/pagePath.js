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

  get account() {
    return '/account';
  }

  get redemptions() {
    return '/redemptions';
  }

  get support() {
    return '/support';
  }

  get doubleOptIn() {
    return '/doptin';
  }

  get privacy() {
    return '/privacy';
  }

  get terms() {
    return '/terms';
  }

  get imprint() {
    return '/imprint';
  }

  get mediaKit() {
    return '/media-kit';
  }

  get webview() {
    return '/webview';
  }

  get contentTerms() {
    return '/content-terms';
  }

  get defaultUnauthorizedRedirect() {
    const oThis = this;
    return oThis.home;
  }

  get about(){
    return '/about';
  }

  get faqs(){
    return '/support/faqs';
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
}

module.exports = new PagePath();
