const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

/* Communities list page */
router.get('/', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  return webRouteHelper.perform(req, res, '/app/services/GetChannelList', 'loggedOut', 'web/_channel_list', 'r_p_v_1');
});

/* Specific community page */
router.get('/:permalink', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.permalink =  req.params.permalink;

  return webRouteHelper.perform(req, res, '/app/services/GetChannel', 'loggedOut', 'web/_channel', 'r_p_v_2');
});

module.exports = router;
