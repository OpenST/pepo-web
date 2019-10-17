const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic');

const errorConfig = basicHelper.fetchErrorConfig();

router.get('/:inviteCode', function (req, res) {
  // Process the data received in req.body
  res.redirect(301, 'https://testapp.stagingpepo.com/?link=https%3A%2F%2Fstagingpepo.com%2F%3Finvite%3Dpepobackend&apn=com.pepo.staging&afl=http%3A%2F%2Fsdk.stagingost.com.s3.amazonaws.com%2FReactNative%2FAndroid%2Fpepo%2Fstaging%2Fcurrent%2Fapp-release.apk&ibi=com.pepo.staging&ifl=http%3A%2F%2Fsdk.stagingost.com.s3.amazonaws.com%2FReactNative%2FDownloadPepoNew.html%3Fb%3Dstaging%26v%3Dcurrent&isi=1161312313&utm_source=akshay_backend&utm_medium=akshay_medium&utm_campaign=akshay_campaign&efr=1&st=Pepo&sd=best%20crypto%20app&si=https://d3attjoi5jlede.cloudfront.net/images/web/fav/pepo-meta-img-v1.png&ofl=https://pepo.com&d=1');
});


module.exports = router;
