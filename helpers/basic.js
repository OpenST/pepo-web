const BigNumber = require('bignumber.js');

const rootPrefix = '..',
  apiErrorConfig = require(rootPrefix + '/config/error/api'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  paramErrorConfig = require(rootPrefix + '/config/error/param');

class BasicHelper {

  /**
   * Convert wei value to un wei (normal).
   *
   * @param {string} wei
   *
   * @return {BigNumber}
   */
  convertWeiToNormal(wei) {
    return this.convertToBigNumber(wei).div(this.convertToBigNumber(10).toPower(18));
  }

  /**
   * Convert number to big number. Make sure it's a valid number.
   *
   * @param {number} number: number to be formatted
   *
   * @return {BigNumber}
   */
  convertToBigNumber(number) {
    return number instanceof BigNumber ? number : new BigNumber(number);
  }

  /**
   * Check if environment is production.
   *
   * @return {boolean}
   */
  isProduction() {
    return coreConstants.environment === 'production';
  }

  /**
   * Log date format.
   *
   * @returns {string}
   */
  logDateFormat() {
    const date = new Date();

    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds() +
      '.' +
      date.getMilliseconds()
    );
  }

  fetchErrorConfig(dynamicErrorConfig) {
    let _paramErrorConfig = dynamicErrorConfig
      ? Object.assign({}, paramErrorConfig, dynamicErrorConfig)
      : paramErrorConfig;

    return {
      param_error_config: _paramErrorConfig,
      api_error_config: apiErrorConfig
    };
  }
}

module.exports = new BasicHelper();
