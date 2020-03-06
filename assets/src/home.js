import $ from 'jquery';

import home from './home/index';

class Home {

    constructor(){

        $(document).ready(() => {
            home.init();
        });

        $(window).on('load', () => {
            home.lazyLoadVideos();
        });

    }

}

export default new Home();
