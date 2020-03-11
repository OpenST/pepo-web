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

  get utmCookieName() {
    return 'putm';
  }

  get inviteCookieName() {
    return 'pinv';
  }

  get cookieExpiryTime() {
    return 60 * 60 * 24 * 30; // 30 days
  }

}

module.exports = new Cookie();
