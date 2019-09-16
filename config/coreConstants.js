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

  get appName() {
    return process.env.DEVOPS_WEB_APP_NAME;
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

  get WEB_COOKIE_SECRET() {
    return process.env.PW_COOKIE_SECRET;
  }

  get CLOUD_FRONT_BASE_DOMAIN() {
    return process.env.PW_CLOUD_FRONT_BASE_DOMAIN;
  }

}

module.exports = new CoreConstant();
