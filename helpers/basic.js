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
   * Convert wei value to un wei (normal).
   *
   * @param {string} wei
   *
   * @return {BigNumber}
   */
  convertToWei(num) {
    return this.convertToBigNumber(num).mul(this.convertToBigNumber(10).toPower(18));
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

  getPepoAmountForUSD(usdInOneOst, amountUSD){
    const oThis = this;

    let usdInOnePepo = oThis.getUSDAmountForPepo(usdInOneOst, '1'),
      pepoInOneUSD = oThis.convertToBigNumber(1).div(oThis.convertToBigNumber(usdInOnePepo)),
      totalPepoBn = oThis.convertToBigNumber(pepoInOneUSD).mul(oThis.convertToBigNumber(amountUSD));

    return oThis.convertToWei(totalPepoBn).round(0).toString(10);
  }

  getUSDAmountForPepo(usdInOneOst, amountPepo){
    const oThis = this;

    let pepoInOneOST = 1;

    let ostInOnePepo = oThis.convertToBigNumber(1).div(oThis.convertToBigNumber(pepoInOneOST)),
      usdInOnePepo = oThis.convertToBigNumber(ostInOnePepo).mul(oThis.convertToBigNumber(usdInOneOst)),
      totalUSDBn = oThis.convertToBigNumber(usdInOnePepo).mul(oThis.convertToBigNumber(amountPepo));

    return totalUSDBn.toString(10);
  }

  getUSDAmountForPepoForDisplay(usdInOneOst, amountPepo){
    const oThis = this;

    return oThis.convertToBigNumber(oThis.getUSDAmountForPepo(usdInOneOst, amountPepo)).round(2).toString(10);
  }
}

module.exports = new BasicHelper();
