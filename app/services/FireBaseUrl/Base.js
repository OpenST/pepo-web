const rootPrefix = '../../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const urlParser = require('url');

/**
 * Base class to get firebase url.
 *
 */
class FirebaseUrlBase extends ServiceBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.decodedParams = params.decodedParams;
    oThis.headers = params.headers;

    oThis.urlParams = {};
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    throw new Error('Sub-class to implement');
  }

  /**
   * Generate firebase url
   *
   * @returns {string}
   * @private
   */
  _generateFireBaseUrl() {
    const oThis = this;

    let url = new urlParser.URL(coreConstants.PEPO_FIREBASE_DOMAIN);

    oThis.urlParams = oThis._getFirebaseUrlParams();

    if (!basicHelper.isProduction()) {
      const s3UrlParams = {
        afl: coreConstants.PEPO_ANDROID_APP_LINK,
        ifl: coreConstants.PEPO_IOS_APP_LINK
      };

      Object.assign(oThis.urlParams, s3UrlParams);
    }

    Object.assign(oThis.urlParams, oThis._googleAnalyticsUtmParams());

    return oThis._generateUrl(url);
  }

  /**
   * Get firebase url params
   *
   * @returns {Object}
   * @private
   */
  _getFirebaseUrlParams(){
    throw new Error('Sub-class to implement');
  }

  /**
   * Common parameters which needs to be sent to firebase
   *
   * @returns {{efr: string, ibi: *, st: string, apn: *, isi: *, ipbi: *}}
   * @private
   */
  _getFirebaseCommonUrlParams(){
    return {
      apn: coreConstants.PEPO_ANDROID_PACKAGE_NAME,
      ibi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      isi: coreConstants.PEPO_IOS_APP_ID,
      ipbi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      efr: '0',
      st: coreConstants.DEFAULT_SHARE_TITLE
    }
  }

  /**
   * Fetch ofl link
   *
   * @returns {*}
   * @private
   */
  _fetchOflLink() {
    const oThis = this;

    let baseLink = coreConstants.PEPO_DOMAIN;
    let queryString = oThis._generateUtmQueryString();

    return baseLink + (queryString ? `?${queryString}` : '');
  }

  /**
   * Generate UTM query string
   * @returns {*}
   * @private
   */
  _generateUtmQueryString() {
    const oThis = this;

    let queryString = '';
    queryString +=  oThis.decodedParams.utm_campaign ? '&utm_campaign=' + oThis.decodedParams.utm_campaign : '';
    queryString +=  oThis.decodedParams.utm_medium ? '&utm_medium=' + oThis.decodedParams.utm_medium : '';
    queryString +=  oThis.decodedParams.utm_source ? '&utm_source=' + oThis.decodedParams.utm_source : '';
    queryString +=  oThis.decodedParams.utm_term ? '&utm_term=' + oThis.decodedParams.utm_term : '';
    queryString +=  oThis.decodedParams.utm_content ? '&utm_content=' + oThis.decodedParams.utm_content : '';

    return queryString;
  }

  /**
   * Append utm params for google analytics
   *
   * @private
   */
  _googleAnalyticsUtmParams() {
    const oThis = this;

    const utmParams = {
      utm_source: oThis.decodedParams.utm_source || 'default',
      utm_medium: oThis.decodedParams.utm_medium || 'default',
      utm_campaign: oThis.decodedParams.utm_campaign || 'default',
      utm_term: oThis.decodedParams.utm_term || 'default',
      utm_content: oThis.decodedParams.utm_content || 'default'
    };

    return utmParams;
  }

  /**
   * Generate url
   *
   * @param url
   * @returns {string}
   * @private
   */
  _generateUrl(url) {
    const oThis = this;

    const searchParams = new urlParser.URLSearchParams(url.searchParams);
    for (let key in oThis.urlParams) {
      let val = oThis.urlParams[key];
      searchParams.append(key, val);
    }
    url.search = searchParams;

    return url.href
  }
}

module.exports = FirebaseUrlBase;
