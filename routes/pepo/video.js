const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

/* Redirect video pages */
router.get('/:video_id', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.video_id =  parseInt(req.params.video_id);

  return webRouteHelper.perform(req, res, '/app/services/GetVideo', 'loggedOut', 'web/_video', 'r_p_v_1');
});

module.exports = router;
