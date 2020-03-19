import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";
import  deepGet from "lodash/get"

class ChannelList extends BaseView {

  constructor(config){
    super(config);
    const channelId = deepGet(this.config,  "apiResponse.channel.id");
    videoList.init({fetchApi:  `/api/web/channels/${channelId}/videos` });
    this.descShowMoreLessHandling();
    this.eventBindings();


  }

}

const pepo = ns("pepo");

pepo.channel_list = ChannelList;

export default ChannelList;
