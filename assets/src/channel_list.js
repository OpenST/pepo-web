import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";
import  deepGet from "lodash/get"

class ChannelList extends BaseView {

  constructor(config){
    super(config);
  }

}
console.log('HHHeyyye');
const pepo = ns("pepo");

pepo.channelList = ChannelList;

export default ChannelList;
