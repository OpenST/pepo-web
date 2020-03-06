/**
 * Module for cookie constants.
 *
 * @module lib/globalConstant/cookie
 */

/**
 * Class for cookie constants.
 *
 * @class Cookie
 */
class Cookie {

  get newCookieName() {
    return 'new_cookies';
  }

  get loginStoreCookieName() {
    return 'sl';
  }

  get csrfCookieName() {
    return '_cu_csrf';
  }

}

module.exports = new Cookie();
