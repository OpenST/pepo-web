const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helperBack');

/* GET redemption products. */
router.get('/products', sanitizer.sanitizeDynamicUrlParams, async function (req, res, next) {
  cookieHelper.setNewCookies(req, res);

  let appUpdateLink;

  if(req.decodedParams.pdo) {
    let pepoDeviceOs = req.decodedParams.pdo;

    if(pepoDeviceOs == appUpdateLinksConstants.androidDeviceOs) {
      appUpdateLink = appUpdateLinksConstants.androidUpdateLink;
    } else if(pepoDeviceOs == appUpdateLinksConstants.iosDeviceOs)  {
      appUpdateLink = appUpdateLinksConstants.iosUpdateLink;
    }
  }

  webRouteHelper.perform(req, res, 'loggedIn', 'web/_redemption', {appUpdateLink: appUpdateLink});
});

module.exports = router;
