/**
 * Standard response formatter
 *
 * @module lib/formatter/response
 */
const OSTBase = require('@ostdotcom/base'),
  responseHelper = new OSTBase.responseHelper({
    module_name: 'pepoWeb'
  });

const rootPrefix = '../..',
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  pagePathConstants = require(rootPrefix + '/lib/globalConstant/pagePath'),
  httpErrorCodes = require(rootPrefix + '/lib/globalConstant/httpErrorCodes');

responseHelper.renderApiResponse = function (result, res, errorConfig) {
  errorConfig = errorConfig || {};

  const formattedResponse = result.toHash(errorConfig);

  let status = result.success ? 200 : result._fetchHttpCode(errorConfig.api_error_config || {});

  if (httpErrorCodes.unauthorizedErrorCode == status) {
    let redirectUrl = result.debugOptions.redirectUrl || pagePathConstants.defaultUnauthorizedRedirect;
    return res.redirect(redirectUrl);
  }

  if (httpErrorCodes.temporaryRedirectErrorCode == status) {
    return res.redirect(result.debugOptions.redirectUrl);
  }

  if (parseInt(status) !== 200 && httpErrorCodes.allowedHttpErrorCodes[status] !== 1) {
    status = httpErrorCodes.internalServerErrorErrorCode;
  }

  if (httpErrorCodes.showWebErrorPage[status] == 1) {
    return res.status(status).render(`error/${status}`, { redirectUrl: '/' });
  }

  return res.status(status).json(formattedResponse);
};

module.exports = responseHelper;
