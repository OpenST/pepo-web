var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
    {
      title: 'pepo',
      page: 'Home Pepo',
      pageMeta: { css:["home", "common"] },
      datama: [
        {
          heading: "Meet the people shaping the crypto movement",
          desc: "Launching in 27 Days, by invite only",
          cta: "Request Invite"
        },
        {
          heading: 2,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test.",
          order: 2
        },
        {
          heading: 3,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test. "
        },
        {
          heading: 4,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test. ",
          order: 2
        },
        {
          heading: 5,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test. "
        },
        {
          heading: 6,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test. ",
          order: 2
        },
        {
          heading: 7,
          desc: "OST Platform provides easy to use management dashboards for token economy setup. Mint your tokens first in Sandbox mode to quickly explore, learn, and test. "
        },
      ]
    }
  );
});

module.exports = router;
