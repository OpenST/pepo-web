#!/usr/bin/env bash
export PW_PORT=3000;
export PW_ENVIRONMENT='development';
export PW_DEBUG_ENABLED='1';
export DEVOPS_APP_NAME='pepo-web';
export DEVOPS_ENV_ID='dev1-sandbox';
export DEVOPS_IP_ADDRESS='127.0.0.1';
export DEVOPS_SERVER_IDENTIFIER='1111';
export PW_COOKIE_DOMAIN='127.0.0.1';

# basic auth env vars
export PW_USE_BASIC_AUTH='1'
export PW_BASIC_AUTH_USERNAME='test'
export PW_BASIC_AUTH_PASSWORD='testpasswd'

export PEPO_API_DOMAIN='http://127.0.0.1:4000';