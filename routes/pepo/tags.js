const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/config/coreConstants');

const errorConfig = basicHelper.fetchErrorConfig();

/* Redirect tag pages */
router.get('/:tagname', function (req, res) {
  return res.redirect(302, coreConstants.PEPO_DOMAIN);
});

module.exports = router;
