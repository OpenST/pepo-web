#!/usr/bin/env bash
export PW_PORT=5000;
export PW_ENVIRONMENT='development';
export PW_DEBUG_ENABLED='1';

# Devops
export PW_DEVOPS_WEB_APP_NAME='pepoWeb';
export PW_DEVOPS_ENV_ID='dev1-sandbox';
export PW_DEVOPS_IP_ADDRESS='127.0.0.1';
export PW_DEVOPS_SERVER_IDENTIFIER='1111';

export PW_COOKIE_DOMAIN='.pepodev.com';

# basic auth env vars
export PW_USE_BASIC_AUTH='0'
export PW_BASIC_AUTH_USERNAME='test'
export PW_BASIC_AUTH_PASSWORD='testpasswd'

export PEPO_DOMAIN='http://pepodev.com';
export PEPO_STORE_DOMAIN='http://store.pepodev.com';
export PW_INVITE_DOMAIN='http://join.pepodev.com';
export PW_FIREBASE_DOMAIN='http://app.pepodev.com';
export PW_COOKIE_SECRET='6BC9B1968BBA53CA8E28878DAD4AB549B154027F10EA1C3FD2D37BAE6F9A5540'

export PW_CLOUD_FRONT_BASE_DOMAIN='https://d3attjoi5jlede.cloudfront.net/'

#Intercom App-Id (Support Widget).
export PW_SUPPORT_WIDGET_APP_ID='br2f1kzm'

# Pepo Economy related
export PW_VIEW_WEB_ROOT='https://ost:Ax23!sdQ*kN-201~96@view.stagingost.com/testnet';
export PW_CHAIN_ID='197';
export PW_UBT_ADDRESS='0xf3e67271386fe994eb994c713b52556a38bba094';
export PW_ETHERSCAN_WEB_ROOT='https://etherscan.io';
export PW_BT_CONTRACT_ADDRESS='0x8d3d262fb1139d5d55d9ccbe7fff5fc45f242184';

export PW_ANDROID_PACKAGE_NAME='com.pepo.staging';
export PW_ANDROID_APP_LINK='http://sdk.stagingost.com.s3.amazonaws.com/ReactNative/Android/pepo/staging/current/app-release.apk';
export PW_IOS_PACKAGE_NAME='com.pepo.staging';
export PW_IOS_APP_LINK='http://sdk.stagingost.com.s3.amazonaws.com/ReactNative/DownloadPepoNew.html?b=staging';
export PW_IOS_APP_ID='1161312313';
