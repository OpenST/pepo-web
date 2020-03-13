import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import video from "./common/video/index";

class Video extends BaseView {

  constructor(config){
    super(config);
    video.init();
  }

}

const pepo = ns("pepo");

pepo.video = Video;

export default Video;
