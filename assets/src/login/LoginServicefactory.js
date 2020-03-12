import GoogleAuth from './GoogleAuth';
import AppleAuth from './AppleAuth';
import GithubAuth from './GithubAuth';
import TwitterAuth from './TwitterAuth';

class LoginServiceFactory {

    getLoginServiceInstance( loginType ) {
        switch( loginType ) {
            case 'google':
                 return GoogleAuth;
            case 'apple':
                return AppleAuth;
            case 'github':
                return GithubAuth;
            case 'twitter':
                return TwitterAuth;
            default : 
                return null;
        }
    }
}

export default new LoginServiceFactory();