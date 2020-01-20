const express = require('express');
const router = express.Router();

const rootPrefix = '../..',
  deepLinkingConstants = require(rootPrefix + '/lib/globalConstant/deepLinking'),
  signinWithAppleConstants = require(rootPrefix + '/lib/globalConstant/signinWithApple'),
  basicHelper = require(rootPrefix + '/helpers/basic');

const errorConfig = basicHelper.fetchErrorConfig();

/* GET Deep linking for android. */
router.get('/.well-known/assetlinks.json', async function (req, res) {

  let apiResponse = deepLinkingConstants.getConfigFor(deepLinkingConstants.androidDeviceType);

  return res.status(200).json(apiResponse);

});

/* GET Deep linking for ios under well-known. */
router.get('/.well-known/apple-app-site-association', async function (req, res) {
  
  let apiResponse = deepLinkingConstants.getConfigFor(deepLinkingConstants.iosDeviceType);
  
  return res.status(200).json(apiResponse);
  
});

/* GET sign in apple verification file. */
router.get('/.well-known/apple-developer-domain-association.txt', async function (req, res) {

  let apiResponse = signinWithAppleConstants.getAppleDeveloperDomainAssociation();

  console.log('apiResponse', apiResponse);
  res.set('Content-Type', 'text/plain');
  res.status(200).send(apiResponse);
});

/* GET Deep linking for ios. */
router.get('/apple-app-site-association', async function (req, res) {

  let apiResponse = deepLinkingConstants.getConfigFor(deepLinkingConstants.iosDeviceType);

  return res.status(200).json(apiResponse);

});

module.exports = router;
