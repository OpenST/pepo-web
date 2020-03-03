import navBar from './common/navBar';
import appleAuth from './login/AppleAuth';
import googleAuth from './login/GoogleAuth';

const { $ } = window;

class Common {

    constructor(){

        $(document).ready(() => {
            navBar.init();
            appleAuth.init();
            googleAuth.init();
        });

        $(window).on('resize scroll', () => {
            navBar.fixedNavBarMenu();
        });

    }

}

export default new Common();

