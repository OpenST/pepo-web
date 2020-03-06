import Base from './Base';

class GoogleAuth extends Base{

    constructor( params ) {
      super( params );
    }

    getButtonSelector = () => {
      return '#googleSignIn';
    }

    getUrlEndpoint = () => {
      return '/api/web/auth/google/redirect-url';
    }

    getDisconnectUrl = () => {
      return '/auth/google-disconnect';
    }
 
}

export default new GoogleAuth();





