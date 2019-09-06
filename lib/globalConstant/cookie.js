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

  get preLaunchloginCookieName() {
    return 'pli_c';
  }

  get csrfCookieName() {
    return '_cu_csrf';
  }

}

module.exports = new Cookie();
