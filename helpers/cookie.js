const rootPrefix = '..',
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

class CookieHelper {

  /**
   * Set New Cookies
   *
   * @returns {string}
   */
  setNewCookies(requestObj, responseObj) {

    const newCookies = requestObj.headers[cookieConstants.newCookieName];

    for (let cookieName in newCookies) {

      if (cookieName == cookieConstants.csrfCookieName) {
        continue;
      }

      let cookieData = newCookies[cookieName];
      responseObj.cookie(cookieName, cookieData.value, cookieData.options);
    }
  }

}

module.exports = new CookieHelper();
