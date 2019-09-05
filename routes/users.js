const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetAccount = require(rootPrefix + '/app/services/GetAccount'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET users account page. */
router.get('/', async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {preLaunchInvite: {}}}; // "/for-local-testing-only"

  /** Always, uncomment and commit **/

  let getAccountObj = new GetAccount({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getAccountObj.perform();

  cookieHelper.setNewCookies(req, res);

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedIn', 'web/_account', apiResponse.data.preLaunchInvite);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
