const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const rootPrefix = '..',
  GetAccount = require(rootPrefix + '/app/services/GetAccount'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  logger = require(rootPrefix + '/lib/logger/customConsoleLogger'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const errorConfig = basicHelper.fetchErrorConfig();

router.use(cookieParser(cookieConstants.WEB_COOKIE_SECRET));

/* GET users account page. */
router.get('/', async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {preLaunchInvite: {}}}; // "/for-local-testing-only"

  /** Always, uncomment and commit **/

  let getAccountObj = new GetAccount({cookies: req.cookies, decodedParams: req.decodedParams});
  let apiResponse = await getAccountObj.perform();

  if (apiResponse.success) {
    cookieHelper.setNewCookies(req, res);
    renderResponseHelper.renderWithLayout(res, 'loggedIn', 'web/_account', apiResponse.data.preLaunchInvite);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
