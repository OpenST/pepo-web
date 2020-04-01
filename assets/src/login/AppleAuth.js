import Base from './Base';

class AppleAuth extends Base{

    constructor( params ) {
      super( params );
    }

    getButtonSelector = () => {
      return '#appleSignIn, .jLoginWithAppleSignIn';
    }

    getUrlEndpoint = () => {
      return '/api/web/auth/apple/redirect-url';
    }

    getDisconnectUrl = () => {
      return '/api/web/auth/apple/disconnect';
    }

}

export default new AppleAuth();





