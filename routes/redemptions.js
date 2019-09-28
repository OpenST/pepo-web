const express = require('express');
const router = express.Router();

const rootPrefix = '..',
  GetRedemptionProduct = require(rootPrefix + '/app/services/GetRedemptionProduct'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  responseHelper = require(rootPrefix + '/lib/formatter/response'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET users account page. */
router.get('/products', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {

  // Comment following 3 lines for local development of pepo-web. DO NOT COMMIT COMMENTED.
  let getRedemptionProductObj = new GetRedemptionProduct({headers: req.headers, decodedParams: req.decodedParams});
  let apiResponse = await getRedemptionProductObj.perform();
  cookieHelper.setNewCookies(req, res);

  // Un-comment only for local development of pepo-web. DO NOT COMMIT UNCOMMENTED.
  // let apiResponse = {
  //   success: true,
  //   data: {
  //     redemption_products: [ { id: '1',
  //       status: 'ACTIVE',
  //       kind: 'AMAZON',
  //       createdAt: 1568608359,
  //       updatedAt: 1568608359,
  //       images: {
  //         square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-amazon-1x1.png",
  //         landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-amazon-16x9.png"
  //       },
  //       dollar_value: 10
  //     },
  //       { id: '2',
  //         status: 'ACTIVE',
  //         kind: 'STARBUCKS',
  //         created_at: 1568608359,
  //         updated_at: 1568608359,
  //         images: {
  //           square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-starbucks-1x1.png",
  //           landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-starbucks-16x9.png"
  //         },
  //         dollar_value: 10
  //       },
  //       { id: '3',
  //         status: 'ACTIVE',
  //         kind: 'NETFLIX',
  //         createdAt: 1568608359,
  //         updatedAt: 1568608359,
  //         images: {
  //           square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-netflix-1x1.png",
  //           landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-netflix-16x9.png"
  //         },
  //         dollar_value: 10
  //       },
  //       { id: '4',
  //         status: 'ACTIVE',
  //         kind: 'AIRBNB',
  //         createdAt: 1568608359,
  //         updatedAt: 1568608359,
  //         images: {
  //           square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-airbnb-1x1.png",
  //           landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-airbnb-16x9.png"
  //         },
  //         dollar_value: 10
  //       },
  //       { id: '5',
  //         status: 'ACTIVE',
  //         kind: 'CREATOR_PARTNERS',
  //         createdAt: 1568608359,
  //         updatedAt: 1568608359,
  //         images: {
  //           square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-creator-partners-1x1-.png",
  //           landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-creator-partners-16x9-.png"
  //         },
  //         dollar_value: 10
  //       },
  //       { id: '6',
  //         status: 'ACTIVE',
  //         kind: 'UBER',
  //         createdAt: 1568608359,
  //         updatedAt: 1568608359,
  //         images: {
  //           square:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-uber-1x1.png",
  //           landscape:"https://d3attjoi5jlede.cloudfront.net/images/web/redemption/redemption-uber-16x9.png"
  //         },
  //         dollar_value: 10
  //       } ],
  //     balance: { user_id: 'ca9cd73b-c79e-4d0b-b55b-6d95ee7a8d54',
  //       total_balance: '1748840000000000000000',
  //       available_balance: '1748840000000000000000',
  //       unsettled_debit: '0',
  //       updated_timestamp: 1568311829 },
  //     balance_in_higer_unit: '123',
  //     usd_amount: '1',
  //     price_points: {
  //       OST: {
  //         USD: "0.0109763064",
  //         EUR: "0.0099645654",
  //         GBP: "0.0088206916",
  //         decimals: 18
  //       }
  //     }
  //   }
  // };


  if (apiResponse.success) {
    renderResponseHelper.renderWithLayout(req, res, 'loggedIn', 'web/_redemption', apiResponse.data);
  } else {
    return responseHelper.renderApiResponse(apiResponse, res, errorConfig);
  }
});

module.exports = router;
