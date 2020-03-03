import navBar from './common/navBar';
import appleAuth from './login/AppleAuth';
import githubAuth from './login/GithubAuth';
import twitterAuth from './login/TwitterAuth';

const { $ } = window;

class Common {

    constructor(){

        $(document).ready(() => {
            navBar.init();
            appleAuth.init();
            githubAuth.init();
            twitterAuth.init();
        });

        $(window).on('resize scroll', () => {
            navBar.fixedNavBarMenu();
        });

    }

}

export default new Common();

