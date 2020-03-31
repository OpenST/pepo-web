import Base from './Base';

class GoogleAuth extends Base{

    constructor( params ) {
      super( params );
    }

    getButtonSelector = () => {
      return '#googleSignIn, .jLoginWithGoogleSignIn';
    }

    getUrlEndpoint = () => {
      return '/api/web/auth/google/redirect-url';
    }

    getDisconnectUrl = () => {
      return '/api/web/auth/google/disconnect';
    }

}

export default new GoogleAuth();





