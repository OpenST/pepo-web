import navBar from './common/navBar';

const { $, jQuery } = window;

class Common {

    constructor(){

        $(document).ready(function () {
            navBar.init();
        });

        $(window).on('resize scroll', function(){
            navBar.fixedNavBarMenu();
        });
    }

}

export default new Common();

