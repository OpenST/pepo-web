const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const urlParser = require('url');

/**
 * Class to get firebase redirection url for invite url
 *
 */
class GetFirebaseInviteUrl extends ServiceBase {
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.decodedParams = params.decodedParams;
    oThis.inviteCode = oThis.decodedParams.code;
    oThis.urlParams = {};
  }

  /**
   * Async perform
   *
   * @returns {Promise<*>}
   * @private
   */
  async _asyncPerform() {
    const oThis = this;

    return responseHelper.successWithData({url: oThis._generateFireBaseUrl()});
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

    let oflLink = oThis._fetchOflLink();

    // Assign all url params
    oThis.urlParams = {
      link: oThis.inviteCode ? `${coreConstants.PEPO_DOMAIN}?invite=${oThis.inviteCode}` : `${coreConstants.PEPO_DOMAIN}`,
      apn: coreConstants.PEPO_ANDROID_PACKAGE_NAME,
      ibi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      isi: coreConstants.PEPO_IOS_APP_ID,
      ipbi: coreConstants.PEPO_IOS_PACKAGE_NAME,
      efr: '0',
      st: 'Pepo - Meet the people shaping the crypto movement',
      sd: 'Keep the check in the box below to automatically apply the invite code in the App!',
      si: 'https://d3attjoi5jlede.cloudfront.net/images/dynamic-link/artboard.png',
      ofl: oflLink
    };

    if (!basicHelper.isProduction()) {
      const s3UrlParams = {
        afl: coreConstants.PEPO_ANDROID_APP_LINK,
        ifl: coreConstants.PEPO_IOS_APP_LINK
      };

      Object.assign(oThis.urlParams, s3UrlParams);
    }

    oThis._appendUtmParams();

    return oThis._generateUrl(url);
  }

  /**
   * Fetch ofl link
   * @returns {*}
   * @private
   */
  _fetchOflLink() {
    const oThis = this;

    let whitelistedCodes = ['brave', 'linkedin', 'facebook', 'etherscan', 'ph', 'reddit', 'google', 'stories'],
      inviteCode = (oThis.inviteCode || '').toLowerCase()
    ;

    let oflLink = whitelistedCodes.includes(inviteCode) ? coreConstants.PEPO_DOMAIN + "/" + inviteCode + "/desktop" : coreConstants.PEPO_DOMAIN;

    if (oThis.decodedParams.utm_campaign) {
      oflLink += '?utm_campaign=' + oThis.decodedParams.utm_campaign;

      if (oThis.decodedParams.utm_medium) {
        oflLink += '&utm_medium=' + oThis.decodedParams.utm_medium;
      }

      if (oThis.decodedParams.utm_source) {
        oflLink += '&utm_source=' + oThis.decodedParams.utm_source;
      }

      if (oThis.decodedParams.utm_term) {
        oflLink += '&utm_term=' + oThis.decodedParams.utm_term;
      }

      if (oThis.decodedParams.utm_content) {
        oflLink += '&utm_content=' + oThis.decodedParams.utm_content;
      }
    }

    return oflLink;
  }

  /**
   * Append utm params
   *
   * @private
   */
  _appendUtmParams() {
    const oThis = this;

    const utmParams = {
      utm_source: oThis.decodedParams.utm_source || 'default',
      utm_medium: oThis.decodedParams.utm_medium || 'default',
      utm_campaign: oThis.decodedParams.utm_campaign || 'default',
      utm_term: oThis.decodedParams.utm_term || 'default',
      utm_content: oThis.decodedParams.utm_content || 'default'
    };

    Object.assign(oThis.urlParams, utmParams);
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

module.exports = GetFirebaseInviteUrl;
