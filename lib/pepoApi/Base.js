/**
 * Pepo Api Request
 *
 * @module lib/pepoApi/Base
 */
const rootPrefix = '../..',
  HttpLibrary = require(rootPrefix + '/lib/HttpRequest'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

var cookie = require('cookie');

/**
 * Class for Pepo Api Calls
 *
 * @class Base
 */
class Base {
  /**
   * Constructor
   *
   * @constructor
   */
  constructor(headers) {
    const oThis = this;
    oThis.headers = headers;

    oThis.serviceBaseRoute = null;
  }

  /**
   *
   * @param requestType
   * @param endpoint
   * @param queryParams
   * @param options
   * @returns {Promise<unknown>}
   * @private
   */
  async _fireRequest(requestType, endpoint, queryParams, options = {}) {
    const oThis = this;

    let fetchCurrentUserData = true;
    // don't fetch user info if 'fetchCurrentUserData' key is present with '0' value
    if(options.hasOwnProperty('fetchCurrentUserData') && !options.fetchCurrentUserData){
      fetchCurrentUserData = false;
    }

    oThis._setCookieInHeader();

    const promiseArray = [
      oThis._send(requestType, oThis.serviceBaseRoute + endpoint, queryParams)
    ];

    // if login cookie present, then fetch logged in user information
    if (fetchCurrentUserData && cookieConstants.hasWebLoginCookie(oThis.headers['cookie'])) {
      promiseArray.push(oThis._send('GET', '/web/users/current'))
    } else {
      promiseArray.push(Promise.resolve({}))
    }

    let rawResponses = await Promise.all(promiseArray);

    oThis._parseCookieFromResponse(rawResponses[0].data);

    return oThis._parseResponse(rawResponses[0].data, rawResponses[1].data);
  }

  _setCookieInHeader() {
    const oThis = this;

    oThis.header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (oThis.headers['cookie']) {
      oThis.header['Cookie'] = oThis.headers['cookie'];
    }

  }

  /**
   *
   * @param requestType
   * @param apiEndpoint
   * @param queryParams
   * @returns {Promise<unknown>}
   * @private
   */
  async _send(requestType, apiEndpoint, queryParams = {}) {
    const oThis = this;

    let resource = oThis._pepoDomain + '/api' + apiEndpoint;
    let HttpLibObj = new HttpLibrary({
        resource: resource,
        header: oThis.header
      }),
      responseData = null;

    if (requestType == 'GET') {
      responseData = await HttpLibObj.get(queryParams).catch(function (err) {
        return err;
      });
    } else if (requestType == 'POST') {
      responseData = await HttpLibObj.post(queryParams).catch(function (err) {
        return err;
      });
    }

    if (responseData.isFailure()) {
      return Promise.reject(responseData);
    }

    return responseData;
  }

  _parseCookieFromResponse(response) {
    const oThis = this;
    let newCookies = {};

    var receivedCookies = response.response.headers['set-cookie'] || [];

    for (let i = 0; i < receivedCookies.length; i++) {
      let cookieStr = receivedCookies[i];

      let cookieParts = cookieStr.split(';');
      let firstCookieData = cookieParts[0].split('=');
      let cookieName = firstCookieData[0];

      if (cookieName == cookieConstants.csrfCookieName) {
        continue;
      }

      let parsedCookie = cookie.parse(cookieStr);
      delete parsedCookie[cookieName];

      let options = {
        httpOnly: true,
        secure: basicHelper.isProduction()
      };

      if (parsedCookie['Max-Age']) {
        options['maxAge'] = 1000 * parseInt(parsedCookie['Max-Age']);
      }

      if (parsedCookie['Expires']) {
        options['expires'] = new Date(parsedCookie['Expires']);
      }

      if (parsedCookie['Path']) {
        options['path'] = parsedCookie['Path'];
      }

      if (parsedCookie['Domain']) {
        options['domain'] = parsedCookie['Domain'];
      }

      if (parsedCookie['SameSite']) {
        options['sameSite'] = parsedCookie['SameSite'];
      }

      newCookies[cookieName] = {
        value: decodeURIComponent(firstCookieData[1]),
        options: options
      }

    }

    oThis.headers[cookieConstants.newCookieName] = newCookies;
  }

  /**
   * Parse response
   * @param primaryResponse
   * @param currentUserResponse
   * @returns {Promise<unknown>}
   * @private
   */
  async _parseResponse(primaryResponse, currentUserResponse) {
    const oThis = this;
    let jsonResp = {};

    try {
      jsonResp = JSON.parse(primaryResponse.responseData);
      jsonResp = sanitizer.sanitizeParams(jsonResp);
    } catch (error) {
      return responseHelper.error({
        internal_error_identifier: 'l_pa_b_parse_error_1',
        api_error_identifier: 'something_went_wrong',
        debug_options: {error: error.toString(), stack: error.stack}
      });
    }

    if (jsonResp.success) {
      let userJsonResp = null,
        serviceResponse = jsonResp.data;
      if(currentUserResponse && currentUserResponse.responseData) {
        userJsonResp = JSON.parse(currentUserResponse.responseData);
        serviceResponse.current_user_data = userJsonResp.data || {};
      }

      console.log('------------------serviceResponse-------------------', serviceResponse);
      return Promise.resolve(responseHelper.successWithData(serviceResponse));
    }

    let finalResp = {};

    switch (jsonResp.err.code) {
      case 'NOT_FOUND': {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_1-${jsonResp.err.internal_id}`,
          'resource_not_found',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
      case 'UNAUTHORIZED': {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_2-${jsonResp.err.internal_id}`,
          'unauthorized_api_request',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
      case 'BAD_REQUEST': {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_3-${jsonResp.err.internal_id}`,
          'invalid_api_params',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
      case 'INTERNAL_SERVER_ERROR': {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_4-${jsonResp.err.internal_id}`,
          'something_went_wrong',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
      case 'ALREADY_REGISTERED_IN_APP': {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_5-${jsonResp.err.internal_id}`,
          'already_registered_in_app',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
      default: {
        finalResp = oThis.parseErrorData(
          `l_pa_b_pr_6-${jsonResp.err.internal_id}`,
          'something_went_wrong',
          {jsonResp: jsonResp},
          jsonResp.err.error_data
        );
        break;
      }
    }

    return Promise.resolve(finalResp);
  }

  parseErrorData(internal_error_identifier, api_error_identifier, debug_options, error_data) {
    const oThis = this;

    let errorkeys = [],
      dynamicErrorConfig = {};

    if (error_data) {

      for (let i = 0; i < error_data.length; i++) {
        let errObj = error_data[i];

        dynamicErrorConfig[i] = {
          parameter: errObj.parameter,
          code: errObj.code,
          message: errObj.msg
        };

        errorkeys.push(i);
      }

      return responseHelper.paramValidationError({
        internal_error_identifier: internal_error_identifier,
        api_error_identifier: api_error_identifier,
        params_error_identifiers: errorkeys,
        error_config: basicHelper.fetchErrorConfig(dynamicErrorConfig),
        debug_options: debug_options
      });

    } else {
      return responseHelper.error({
        internal_error_identifier: internal_error_identifier,
        api_error_identifier: api_error_identifier,
        debug_options: debug_options
      });
    }

  }


}

module.exports = Base;
