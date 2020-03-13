require('./plugins/jquery-visible/jquery.visible');
import  ns from "../js/libs/namespace";
import feed from './feed/index';
import BaseView from "../src/common/BaseView";

class Feed extends BaseView {

  constructor(config){
    super(config);
    feed.init(config);
  }

}

const pepo = ns("pepo");

pepo.feed = Feed;

export default Feed;
