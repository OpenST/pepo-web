const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  shortenedFromNow = require(rootPrefix + '/helpers/moment');

class ChannelViewFormatter {
  constructor(params) {
    const oThis = this;

    oThis.apiData = params;

    oThis._init();
  }

  _init() {
    const oThis = this;

    oThis.resultObj = {
      'page_meta': {},
    }
  }

  perform() {
    const oThis = this;

  }


}

module.exports = ChannelViewFormatter;
