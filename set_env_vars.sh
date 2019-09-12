#!/usr/bin/env bash
export PW_PORT=5000;
export PW_ENVIRONMENT='development';
export PW_DEBUG_ENABLED='1';
export DEVOPS_WEB_APP_NAME='pepoWeb';
export DEVOPS_ENV_ID='dev1-sandbox';
export DEVOPS_IP_ADDRESS='127.0.0.1';
export DEVOPS_SERVER_IDENTIFIER='1111';
export PW_COOKIE_DOMAIN='.pepodev.com';

# basic auth env vars
export PW_USE_BASIC_AUTH='1'
export PW_BASIC_AUTH_USERNAME='test'
export PW_BASIC_AUTH_PASSWORD='testpasswd'

export PEPO_DOMAIN='http://pepodev.com:8080';
export PW_COOKIE_SECRET='aa5298d3a3fe181a3a52d085ee1525df5asa498337f8f3b76ca7df0a5de32124'

export PW_CLOUD_FRONT_BASE_DOMAIN='https://d3attjoi5jlede.cloudfront.net/'
