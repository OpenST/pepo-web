'use strict';

const fs = require('fs'),
  path = require('path'),
  { exec } = require('child_process');

const rootPrefix = '..',
  coreConstants = require(rootPrefix + '/config/coreConstants');

const asset_bucket = 'wa.pepo.com';

const content_types = {
  gz: 'application/gzip',
  js: 'application/x-javascript',
  css: 'text/css'
};

const permission_options =
  "--acl public-read --content-encoding gzip --cache-control 'public, max-age=315360000' --expires 'Thu, 25 Jun 2025 20:00:00 GMT'";

const baseDir = path.join(__dirname, rootPrefix + '/builtAssets'),
  s3BaseDir = '/' + coreConstants.APP_NAME + '/js-css'; // Like /some/dir

fs.readFile(baseDir + '/manifest.json', function(err, data) {
  if (err) {
    return console.error(err);
  }
  const manifest = JSON.parse(data.toString());

  for (let file_key in manifest.assets) {
    const file = manifest.assets[file_key],
      splitFileNameArray = file.split('.'),
      extension = splitFileNameArray[splitFileNameArray.length - 1];

    let executableString = undefined;
    if (content_types[extension]) {
      executableString =
        'aws s3 cp ' +
        baseDir +
        '/' +
        file +
        '.gz' +
        ' s3://' +
        asset_bucket +
        s3BaseDir +
        '/' +
        file +
        ' ' +
        permission_options +
        ' --content-type ' +
        content_types[extension];

      console.log('\n\nExecuting command:' + executableString);

      exec(executableString, function(error, stdout, stderr) {
        if (error) {
          console.log('\n\nExecuting error: ' + error);
          process.exit(1);
        }
        if (stderr) {
          console.log('\n\nStd error: ' + stderr);
          process.exit(1);
        }
        console.log('\n\n' + stdout);
      });
    } else {
      console.log("Can't upload : ", file);
      process.exit(1);
    }
  }
});
