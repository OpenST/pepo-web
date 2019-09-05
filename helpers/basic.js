const rootPrefix = '..',
  apiErrorConfig = require(rootPrefix + '/config/error/api'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  paramErrorConfig = require(rootPrefix + '/config/error/param');

class BasicHelper {

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
