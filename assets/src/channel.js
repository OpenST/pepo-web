import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import video from "./common/video/index";

class Channel extends BaseView {

  constructor(config){
    super(config);
    video.init();
  }

}

const pepo = ns("pepo");

pepo.channel = Channel;

export default Channel;
