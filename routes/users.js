const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetAccount = require(rootPrefix + '/app/services/GetAccount'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET users account page. */
router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  /** Never Uncomment and Commit This **/
  // let apiResponse = {success: true, data: {preLaunchInvite: { id: '6603',
  //       twitterId: '1144138775435419648',
  //       handle: 'amanostcom1',
  //       email: 'aman@ost.com',
  //       name: 'name',
  //       profileImageUrl: null,
  //       status: 'DOPTIN',
  //       adminStatus: 'WHITELIST_PENDING',
  //       inviteCode: '7VW9N2',
  //       invitedUserCount: '0',
  //       createdAt: 1567760119,
  //       updatedAt: 1567760119,
  //       creatorStatus: 'APPLIED',
  //       inviteUrl: 'http://pepodev.com:8080/?invite=7VW9N2' }
  // }}; // "/for-local-testing-only"

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
