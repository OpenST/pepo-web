import navBar from './common/navBar';
import appleAuth from './login/AppleAuth';

const { $ } = window;

class Common {

    constructor(){

        $(document).ready(() => {
            navBar.init();
            appleAuth.init();
        });

        $(window).on('resize scroll', () => {
            navBar.fixedNavBarMenu();
        });

    }

}

export default new Common();

