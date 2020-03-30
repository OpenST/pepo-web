const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for Getting zoom meeting data
 *
 * @class GetZoomMeeting
 */
class GetZoomMeeting extends ServiceBase {
  /**
   * Constructor
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);

    const oThis = this;
    oThis.headers = params.headers || {};
    oThis.goto = params.decodedParams.goto;
    oThis.channelPermalink = params.decodedParams.channel_permalink;
    oThis.meetingId = params.decodedParams.meeting_id;
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    await oThis._validateAndSanitize();

    return oThis._prepareResponse();

  }

  /**
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;
    if (oThis.goto) {
      //sanitize goto
      if (/^[A-Z0-9\-\_\/]*$/i.test(oThis.goto)) {
        oThis.goto = coreConstants.PEPO_DOMAIN + '/' + oThis.goto;
      } else {
        oThis.goto = coreConstants.PEPO_DOMAIN;
      }
    } else {
      oThis.goto = '';
    }

    if (!(/^[A-Z0-9\-\_]+$/i.test(oThis.channelPermalink))) {
      oThis.channelPermalink = null;
    }

    if (!(/^[0-9]+$/i.test(oThis.meetingId))) {
      oThis.meetingId = null;
    }

  }

  /**
   *
   * @returns {Promise<*|result>}
   * @private
   */
  async _prepareResponse() {
    const oThis = this;

    return responseHelper.successWithData({
      goto: oThis.goto,
      channelPermalink: oThis.channelPermalink,
      meetingId: oThis.meetingId
    })
  }

}

module.exports = GetZoomMeeting;
