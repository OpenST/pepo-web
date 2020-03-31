import Base from './Base';

class TwitterAuth extends Base{

    constructor( params ) {
      super( params );
    }

    getButtonSelector = () => {
      return '#twitterSignIn, .jLoginWithTwitterSignIn';
    }

    getUrlEndpoint = () => {
      return '/api/web/auth/twitter/redirect-url';
    }

    getDisconnectUrl = () => {
      return '/api/web/auth/twitter/disconnect';
    }

}

export default new TwitterAuth();





