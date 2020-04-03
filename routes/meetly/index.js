const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  return webRouteHelper.perform(req, res, '/app/services/GetHomePage', 'meetlySplash', null, 'r_m_s_1');
});


module.exports = router;


