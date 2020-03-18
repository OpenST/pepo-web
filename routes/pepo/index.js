const express = require('express');
const router = express.Router(),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  basicAuth = require('basic-auth');

const rootPrefix = '../..';


/* about page */
router.get('/abc', function (req, res) {
  res.render('loggedOut', {}, null);
});


module.exports = router;
