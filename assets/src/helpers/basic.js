import BigNumber from 'bignumber.js';

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

  getVideoShareUrl(videoId) {
    return `${window.location.protocol}//${window.location.hostname}/video/${videoId}?utm_source=share&utm_medium=video&utm_campaign=${videoId}`
  }

  copyToClipboard(str, context = null) {
    var dummy = $('<input style="font-size: 3px; display: inline"/>').val(str).appendTo(context);
    dummy[0].select();
    dummy[0].setSelectionRange(0, 99999);

    var isSuccess = document.execCommand('copy');
    dummy.remove();
    return isSuccess;
  }

}

export default new BasicHelper();
