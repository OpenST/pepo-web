const errorConfig = {
  invalid_user_name: {
    parameter: 'user_name',
    code: 'invalid',
    message: 'Invalid parameter User Name.'
  },
  invalid_password: {
    parameter: 'password',
    code: 'invalid',
    message: 'Invalid parameter Password.'
  },
  duplicate_user_name: {
    parameter: 'user_name',
    code: 'invalid',
    message: 'User Name has been used.'
  },
  invalid_token_holder_address: {
    parameter: 'token_holder_address',
    code: 'invalid',
    message: 'Invalid parameter Token Holder Address.'
  },
  invalid_status: {
    parameter: 'status',
    code: 'invalid',
    message: 'Invalid parameter status.'
  }
};

module.exports = errorConfig;
