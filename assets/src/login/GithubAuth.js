import Base from './Base';

class GithubAuth extends Base{

    constructor( params ) {
      super( params );
    }

    getButtonSelector = () => {
      return '#githubSignIn';
    }

    getUrlEndpoint = () => {
      return '/api/web/auth/github/redirect-url';
    }

    getDisconnectUrl = () => {
      return '/api/web/auth/github/disconnect';
    }
 
}

export default new GithubAuth();





