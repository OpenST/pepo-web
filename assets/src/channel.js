import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";

class Channel extends BaseView {

  constructor(config){
    super(config);
    console.log("this.config",  this.config);
    const channelId = "";
    videoList.init({fetchApi:  `/api/web/channels/${channelId}/videos` });
  }

}

const pepo = ns("pepo");

pepo.channel = Channel;

export default Channel;
