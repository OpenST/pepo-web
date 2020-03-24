import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";
import  deepGet from "lodash/get"

class Channel extends BaseView {

  constructor(config){
    super(config);
    const channelId = deepGet(this.config,  "apiResponse.channel.id");
    videoList.init({fetchApi:  `/api/web/channels/${channelId}/videos` });
    this.descShowMoreLessHandling();
    this.eventBindings();


  }

  eventBindings = () => {
    const jMobileAfterText = $(".channel-description-mobile .afterText"),
    jMobileShowMore = $(".channel-description-mobile .showMore"),
    jMobileShowLess = $(".channel-description-mobile .showLess");

    jMobileShowMore.on('click', (e)=>{
      jMobileAfterText.show();
      jMobileShowMore.hide();
    });
    jMobileShowLess.on('click', (e)=>{
      jMobileAfterText.hide();
      jMobileShowMore.show();
    });

    $(".list-unstyled .float-left").on('click', (e)=>{
      videoList.init({fetchApi:  `/api/web/feeds` });
    });
    
    

  };

  descShowMoreLessHandling = () => {
    const jMobileAfterText = $(".channel-description-mobile .afterText");
    jMobileAfterText.append("<span class='showLess'> Show Less</span>");

  }
  

}

const pepo = ns("pepo");

pepo.channel = Channel;

export default Channel;
