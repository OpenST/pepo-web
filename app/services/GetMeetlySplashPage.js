const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response');

/**
 * Class for Getting Meetly Splash Page
 *
 * @class GetMeetlySplashPage
 */
class GetMeetlySplashPage extends ServiceBase {
  /**
   * Constructor
   *
   * @augments ServiceBase
   *
   * @constructor
   */
  constructor(params) {
    super(params);
  }

  /**
   * Perform: Perform async
   *
   * @return {Promise<void>}
   */
  async _asyncPerform() {
    const oThis = this;

    return oThis._prepareResponse();

  }

  /**
   *
   * @returns {Promise<*|result>}
   * @private
   */
  async _prepareResponse() {

    return responseHelper.successWithData({
      pageMeta: {
        title: 'Meetly',
        description: 'Meetly',
        robots: 'index, follow',
        canonical: '',
        og: {
          title: 'Meetly',
          description: 'Meetly',
          image: '',
          url: ''
        },
        twitter: {
          title: '',
          description: '',
          image: '',
          card: "summary_large_image"
        }
      }
    })
  }

}

module.exports = GetMeetlySplashPage;
