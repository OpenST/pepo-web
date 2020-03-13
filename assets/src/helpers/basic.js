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
    return `${window.location.protocol}/${window.location.hostname}/video/${videoId}?utm_source=share&utm_medium=video&utm_campaign=${videoId}`
  }

  copyToClipboard(str) {
    let el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    // For old iOS devices
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    el.setSelectionRange(0, el.value.length);
    try{
      document.execCommand('copy');
    } catch (e) {
      document.body.removeChild(el);
      return 0;
    }
    document.body.removeChild(el);
    return 1;
  }

}

export default new BasicHelper();
