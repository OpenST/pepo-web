const rootPrefix = '..'
const express = require('express');
const router = express.Router();
const renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper');


/* GET users account page. */
router.get('/', function(req, res, next) {
  renderResponseHelper.renderWithLayout(res, 'loggedIn', 'web/_account', {});
});

module.exports = router;
