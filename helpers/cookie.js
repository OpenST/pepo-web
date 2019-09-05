const rootPrefix = '..',
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

class CookieHelper {

  /**
   * Set New Cookies
   *
   * @returns {string}
   */
  setNewCookies(requestObj, responseObj) {

    let newCookies = requestObj.cookies[cookieConstants.newCookieName];

    for (let cookieName in newCookies) {
      let cookieData = newCookies[cookieName];
      responseObj.cookie(cookieName, cookieData.value, cookieData.options);
    }
  }

}

module.exports = new CookieHelper();
