const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

const errorConfig = basicHelper.fetchErrorConfig();

/* Redirect video pages */
router.get('/:permalink', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.permalink =  req.params.permalink;

  return webRouteHelper.perform(req, res, '/app/services/GetChannel', 'loggedOut', 'web/_channel', 'r_p_v_1');
});

module.exports = router;
