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

  get webLoginCookieName() {
    return 'pwlc';
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

  hasWebLoginCookie(headerCookieStr) {
    const oThis = this;

    if(!headerCookieStr){
      return false;
    }

    let splitted = headerCookieStr.split('; ');
    for (let sInd = 0; sInd < splitted.length; sInd++) {
      if (splitted[sInd].indexOf(oThis.webLoginCookieName + '=') === 0) {
        return true;
      }
    }
  }

}

module.exports = new Cookie();
