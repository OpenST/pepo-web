import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";
import  deepGet from "lodash/get";
import  helper from "./helpers/index";

import  zoomMeeting from "./helpers/ZoomMeeting";

class Channel extends BaseView {

  constructor(config){
    super(config);
    this.channelId = deepGet(this.config,  "apiResponse.channel.id");
    this.channel =  deepGet(this.config,  "apiResponse.channel" , {});
    this.isGoLive = false;
    const videoCnt =  deepGet(this.config,  `apiResponse.channel_stats.${this.channelId}.total_videos`);
    if(videoCnt == 0){
      $("#noVideoContainer").show();
    }else {
      videoList.init({fetchApi:  `/api/web/channels/${this.channelId}/videos` });
    }
    this.descShowMoreLessHandling();
    this.eventBindings();

    const oThis = this;
    zoomMeeting.init( ()=> {
      //TODO DJ check where u can get
      // works without meetingId as param
     // const meetingId = oThis.channel.live_meeting_id || oThis.config;
      // zoomMeeting.setZoomMeetingUserName(oThis.channel)//, meetingId);
    } );

  }

  eventBindings = () => {
    const oThis = this,
    jMobileAfterText = $(".channel-description-mobile .afterText"),
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

    $(".jStartMeeting").on("click" , (e)=> {
      $(".jGoLiveError").html(" ");
      $("#tips-to-go-live").modal("show");
    });

    $(".tips-to-go-live-btn").on("click" , function () {
      if(oThis.isGoLive) return;
      oThis.goLive($(this));
    });
  };

  goLive = (jEl) => {
    this.isGoLive = true;
    helper.goLive(this.channel, () => {
        this.beforeGoLive(jEl)
      },null,
      (error) => {
        this.onGoLiveError(error, jEl);
      },
      () => {
        this.onGoLiveComplete(jEl);
      }
    );
  };

  beforeGoLive(jEl){
    $(".jGoLiveError").html(" ");
    jEl.html("Going live...");
    jEl.addClass("disabled");
  }

  getGoLiveFetchUrl(){
    return `/api/web/channels/${this.channel.permalink}/meetings`
  }

  onGoLiveError(error , jEl){
    const msg = deepGet(error, "err.msg"  , "Something went wrong please try again later!");
    $(".jGoLiveError").html(msg);
  }

  onGoLiveComplete(jEl){
    jEl.html("GO LIVE");
    jEl.removeClass("disabled");
    this.isGoLive = false;
  }

  descShowMoreLessHandling = () => {
    const jMobileAfterText = $(".channel-description-mobile .afterText");
    jMobileAfterText.append("<span class='showLess'> Show Less</span>");

  }


}

const pepo = ns("pepo");

pepo.channel = Channel;

export default Channel;
