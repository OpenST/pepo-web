var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    {
      title: 'pepo',
      page: 'Home Pepo',
      pageMeta: { css:["home", "common"] }
    }
  );
});

module.exports = router;
