/**
 * Module for PagePath constants.
 *
 * @module lib/globalConstant/pagePath
 */

/**
 * Class for PagePath constants.
 *
 * @class Cookie
 */
class PagePath {

  get home() {
    return '/new';
  }

  get account() {
    return '/account';
  }


  get defaultUnauthorizedRedirect() {
    const oThis = this;
    return oThis.home;
  }
}

module.exports = new PagePath();
