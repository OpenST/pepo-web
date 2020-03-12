import  ns from "../js/libs/namespace";
import $ from 'jquery';
import feed from './feed/index';
import BaseView from "../src/common/BaseView";

class Feed extends BaseView {

  constructor(config){
    super(config);
    $(document).ready(() => {
      feed.init(config);
    });
  }

}

const pepo = ns("pepo");

pepo.feed = Feed;

export default Feed;
