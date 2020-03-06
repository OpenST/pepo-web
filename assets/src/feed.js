import $ from 'jquery';
import feed from './feed/index';

class Feed {

  constructor(){
    $(document).ready(() => {
      feed.init();
    });
  }

}

export default new Feed();
