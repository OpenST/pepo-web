const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  appUpdateLinksConstants = require(rootPrefix + '/lib/globalConstant/appUpdateLinks'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');

const errorConfig = basicHelper.fetchErrorConfig();

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

  renderResponseHelper.renderWithLayout(req, res, 'loggedIn', 'web/_redemption', {appUpdateLink: appUpdateLink});
});

module.exports = router;
