var express = require('express');
var router = express.Router();

/* GET users account page. */
router.get('/', function(req, res, next) {
  res.render('loggedIn',
    {
      title: 'User Account',
      page: 'Home Pepo',
      pageMeta: { css:["home", "common"] }
    }
  );
});

module.exports = router;
