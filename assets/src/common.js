import navBar from './common/navBar';
import appleAuth from './login/AppleAuth';
import googleAuth from './login/GoogleAuth';
import githubAuth from './login/GithubAuth';
import twitterAuth from './login/TwitterAuth';

const { $ } = window;

class Common {

    constructor(){
        /* All document on ready tasks should be initiated from here */
        $(document).ready(() => {
            navBar.init();
            appleAuth.init();
            githubAuth.init();
            twitterAuth.init();
            googleAuth.init();
        });

        $(window).on('resize scroll', () => {
            navBar.fixedNavBarMenu();
        });

    }

}

export default new Common();

