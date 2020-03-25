const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  sanitizer = require(rootPrefix + '/helpers/sanitizer'),
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

/* Specific community page */
router.get('/:permalink', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.permalink =  req.params.permalink;

  return webRouteHelper.perform(req, res, '/app/services/GetChannel', 'loggedOut', 'web/_channel', 'r_p_v_2');
});

/* Specific meeting page */
router.get('/:permalink/meetings/:meetingId', sanitizer.sanitizeDynamicUrlParams, async function (req, res) {

  req.decodedParams.permalink =  req.params.permalink;
  req.decodedParams.meetingId =  req.params.meetingId;
  req.decodedParams.leaveUrl = '/zoom-meeting?goto=communities/'+req.params.permalink;

  return webRouteHelper.perform(req, res, '/app/services/GetMeetingPage', 'loggedOut', 'web/_meeting', 'r_p_v_3');
});

module.exports = router;
