class CoreConstant {
  get environment() {
    return process.env.PW_ENVIRONMENT;
  }

  get environmentShort() {
    return process.env.PW_ENVIRONMENT.substring(0, 2);
  }

  get DEBUG_ENABLED() {
    return process.env.PW_DEBUG_ENABLED;
  }

  get APP_NAME() {
    return process.env.PW_DEVOPS_WEB_APP_NAME;
  }

  get ENV_IDENTIFIER() {
    return process.env.PW_DEVOPS_ENV_ID;
  }

  get IP_ADDRESS() {
    return process.env.PW_DEVOPS_IP_ADDRESS;
  }

  get WS_SERVER_IDENTIFIER() {
    return process.env.PW_DEVOPS_SERVER_IDENTIFIER;
  }

  get COOKIE_DOMAIN() {
    return process.env.PW_COOKIE_DOMAIN;
  }

  get USE_BASIC_AUTHENTICATION() {
    return process.env.PW_USE_BASIC_AUTH == '1';
  }

  get BASIC_AUTHENTICATION_USERNAME() {
    return process.env.PW_BASIC_AUTH_USERNAME;
  }

  get BASIC_AUTHENTICATION_PASSWORD() {
    return process.env.PW_BASIC_AUTH_PASSWORD;
  }

  get PEPO_DOMAIN() {
    return process.env.PEPO_DOMAIN;
  }

  get PEPO_STORE_DOMAIN() {
    return process.env.PEPO_STORE_DOMAIN;
  }

  get WEB_COOKIE_SECRET() {
    return process.env.PW_COOKIE_SECRET;
  }

  get CLOUD_FRONT_BASE_DOMAIN() {
    return process.env.PW_CLOUD_FRONT_BASE_DOMAIN;
  }

  get SUPPORT_WIDGET_APP_ID() {
    return process.env.PW_SUPPORT_WIDGET_APP_ID;
  }

  get VIEW_WEB_ROOT(){
    return process.env.PW_VIEW_WEB_ROOT;
  }

  get CHAIN_ID(){
    return process.env.PW_CHAIN_ID;
  }

  get UBT_ADDRESS(){
    return process.env.PW_UBT_ADDRESS;
  }

  get ETHERSCAN_WEB_ROOT(){
    return process.env.PW_ETHERSCAN_WEB_ROOT;
  }

  get BT_CONTRACT_ADDRESS(){
    return process.env.PW_BT_CONTRACT_ADDRESS;
  }


}

module.exports = new CoreConstant();
