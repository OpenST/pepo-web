require('./plugins/jquery-visible/jquery.visible');
import  ns from "../js/libs/namespace";
import videoList from './common/video/videoList';
import BaseView from "../src/common/BaseView";

class Feed extends BaseView {

  constructor(config){
    super(config);
    videoList.init({fetchApi:  "/api/web/feeds" });
  }

}

const pepo = ns("pepo");

pepo.feed = Feed;

export default Feed;
