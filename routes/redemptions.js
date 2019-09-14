const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  // GetRedemptionProduct = require(rootPrefix + '/app/services/GetRedemptionProduct'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  // cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET users account page. */
router.get('/products', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  // let getRedemptionProductObj = new GetRedemptionProduct({headers: req.headers, decodedParams: req.decodedParams});
  // let apiResponse = await getRedemptionProductObj.perform();
  //
  // cookieHelper.setNewCookies(req, res);

  let apiResponse = {
    success: true,
    data: {redemptionProducts: [
        {
          id: 1,
          kind: "AMAZON",
          status: "ACTIVE",
          uts: parseInt(Date.now() / 1000)
        },
        {
          id: 2,
          kind: "STARBUCKS",
          status: "ACTIVE",
          uts: parseInt(Date.now() / 1000)
        }
      ]
    }
  };

  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedIn', 'web/_redemptionProduction', apiResponse.data);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
