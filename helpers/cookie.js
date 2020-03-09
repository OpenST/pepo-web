const csrf = require('csurf');

const rootPrefix = '..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

const cookieDefaultOptions = {
  httpOnly: true,
  signed: true,
  path: '/',
  domain: coreConstants.COOKIE_DOMAIN,
  secure: basicHelper.isProduction(),
  sameSite: 'strict'
};

class CookieHelper {

  /**
   * Set csrf for web.
   *
   * @returns {csrf}
   */
  setWebCsrf(ignorePost = false) {
    const cookieParams = Object.assign({}, cookieDefaultOptions, {
      maxAge: 1 * 60 * 60 * 24 * 30,
      key: cookieConstants.csrfCookieName
    });

    const ignoreMethods = ['GET', 'HEAD', 'OPTIONS'];

    if (ignorePost) {
      ignoreMethods.push('POST');
    }

    return csrf({
      cookie: cookieParams,
      ignoreMethods: ignoreMethods
    });
  }

  /**
   * Set New Cookies
   *
   * @returns {string}
   */
  setNewCookies(requestObj, responseObj) {

    const newCookies = requestObj.headers[cookieConstants.newCookieName];

    for (let cookieName in newCookies) {
      let cookieData = newCookies[cookieName];
      responseObj.cookie(cookieName, cookieData.value, cookieData.options);
    }
  }

  /**
   * Set utm cookie
   *
   */
  async setUserUtmCookie(requestObj, responseObj, next) {

    const params = requestObj.query || {};

    const cookieVal = [];
    if (params.utm_campaign && params.utm_campaign.toLowerCase() !== 'default') {
      cookieVal.push('uc', params.utm_campaign);
    }
    if (params.utm_medium && params.utm_medium.toLowerCase() !== 'default') {
      cookieVal.push('um', params.utm_medium);
    }
    if (params.utm_source && params.utm_source.toLowerCase() !== 'default') {
      cookieVal.push('us', params.utm_source);
    }

    if (cookieVal.length > 0) {

      let options = Object.assign({}, cookieDefaultOptions, {
        maxAge: 1000 * cookieConstants.cookieExpiryTime
      });

      // Set cookie
      responseObj.cookie(cookieConstants.utmCookieName, cookieVal.join(':'), options); // Options is optional.
    }

    next();
  }


  /**
   * Fetch User utm cookie if present
   *
   * @param requestObj
   */
  fetchUserUtmFromCookie(requestObj, responseObj, next) {
    let cookieVal = requestObj.signedCookies[cookieConstants.utmCookieName];

    if (cookieVal) {
      const arr = cookieVal.split(':');
      for (let ind = 0; ind < arr.length; ind++) {
        if (ind % 2 === 0) {
          if (arr[ind] === 'uc') {
            requestObj.decodedParams.utm_campaign = arr[ind + 1];
          } else if (arr[ind] === 'um') {
            requestObj.decodedParams.utm_medium = arr[ind + 1];
          } else if (arr[ind] === 'us') {
            requestObj.decodedParams.utm_source = arr[ind + 1];
          }
        }
      }
    }

    next();
  }

  /**
   * Set invite cookie
   *
   * @param {object} responseObject
   * @param {string} cookieValue
   */
  setInviteCookie(responseObject, cookieValue) {
    let options = Object.assign({}, cookieDefaultOptions, {
      maxAge: 1000 * cookieConstants.cookieExpiryTime
    });

    // Set cookie
    responseObject.cookie(cookieConstants.inviteCookieName, cookieValue, options); // Options is optional.
  }

}

module.exports = new CookieHelper();
