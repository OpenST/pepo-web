import $ from 'jquery';

import navBar from './common/navBar';
import appleAuth from './login/AppleAuth';
import googleAuth from './login/GoogleAuth';
import githubAuth from './login/GithubAuth';
import twitterAuth from './login/TwitterAuth';

// Importing ES5 JS files
import * as ajaxHooks from './utils/ajaxHooks';

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

