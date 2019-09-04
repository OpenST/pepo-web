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
    return process.env.DEVOPS_APP_NAME;
  }

  get ENV_IDENTIFIER() {
    return process.env.DEVOPS_ENV_ID;
  }

  get IP_ADDRESS() {
    return process.env.DEVOPS_IP_ADDRESS;
  }

  get WS_SERVER_IDENTIFIER() {
    return process.env.DEVOPS_SERVER_IDENTIFIER;
  }

  get COOKIE_DOMAIN() {
    return process.env.PW_COOKIE_DOMAIN;
  }

  get appName() {
    return process.env.DEVOPS_APP_NAME;
  }

  get PEPO_API_DOMAIN() {
    return process.env.PEPO_API_DOMAIN;
  }

}

module.exports = new CoreConstant();
