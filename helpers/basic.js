const rootPrefix = '..',
  apiErrorConfig = require(rootPrefix + '/config/error/api'),
  paramErrorConfig = require(rootPrefix + '/config/error/param');

class BasicHelper {

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

  fetchErrorConfig() {
    return {
      param_error_config: paramErrorConfig,
      api_error_config: apiErrorConfig
    };
  }
}

module.exports = new BasicHelper();
