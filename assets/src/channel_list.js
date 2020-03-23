import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import CommunityList from "../src/CommunityList";

class ChannelList extends BaseView {

  constructor(config){
    super(config);

    CommunityList.init();
  }

}

const pepo = ns("pepo");

pepo.channelList = ChannelList;

export default ChannelList;
