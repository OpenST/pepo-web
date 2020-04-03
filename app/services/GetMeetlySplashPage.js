const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

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
      pepoCampaigns: {
        listId: coreConstants.MEETLY_PC_LIST_ID,
        clientId: coreConstants.MEETLY_PC_CLIENT_ID
      },
      pageMeta: {
        title: 'Meetly',
        description: 'Manage Your Instagram Classes',
        robots: 'index, follow',
        canonical: coreConstants.MEETLY_DOMAIN,
        og: {
          title: 'Meetly',
          description: 'Manage Your Instagram Classes',
          image: 'https://d3attjoi5jlede.cloudfront.net/images/meetly-splash/meetly-meta-image.png',
          url: coreConstants.MEETLY_DOMAIN
        },
        twitter: {
          title: 'Meetly',
          description: 'Manage Your Instagram Classes',
          image: 'https://d3attjoi5jlede.cloudfront.net/images/meetly-splash/meetly-meta-image.png',
          card: "summary_large_image"
        }
      }
    })
  }

}

module.exports = GetMeetlySplashPage;
