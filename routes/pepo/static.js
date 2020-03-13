const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  webRouteHelper = require(rootPrefix + '/routes/pepo/helper');

/* privacy page */
router.get('/privacy', function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1si1J9PXkW7mLplUy_CJTNXTsi1OtNRiD/view?usp=sharing');
});

/* terms page */
router.get('/terms', function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1LCQ7v1BOrwwbMfHM0xjWwefDpSNu0BlG/view?usp=sharing');
});

/* imprint page */
router.get('/imprint', function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://drive.google.com/file/d/1oj1BvXqmaBgTTi8HwQgFCCGWtVOZiSTU/view?usp=sharing');
});

/* media kit page */
router.get('/media-kit', function (req, res) {
  // Process the data received in req.body
  res.redirect(302, 'https://www.dropbox.com/sh/3r5zr84dyp3dvv0/AACuKAhLTNHaPcn6TttbY_BOa?dl=0');
});

/* content terms page */
router.get('/content-terms', function (req, res) {
  webRouteHelper.perform(req, res, 'loggedOut', 'web/_content_terms');
});

/* faq page */
router.get('/support/faqs', function (req, res) {
  res.redirect(302, 'https://intercom.help/pepo');
});

module.exports = router;
