import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";
import videoList from "./common/video/videoList";
import  deepGet from "lodash/get"

class Channel extends BaseView {

  constructor(config){
    super(config);
    this.channelId = deepGet(this.config,  "apiResponse.channel.id");
    this.channel =  deepGet(this.config,  "apiResponse.channel" , {});
    this.isGoLive = false;
    videoList.init({fetchApi:  `/api/web/channels/${this.channelId}/videos` });
    this.descShowMoreLessHandling();
    this.eventBindings();
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
      $("#tips-to-go-live").modal("show");
    });

    $("#tips-to-go-live-btn").on("click" , function () {
      if(oThis.isGoLive) return;
      oThis.goLive($(this));
    });
  };
  
  goLive = (jEl) => {
    this.isGoLive = true;
    $.ajax({
      url: this.getGoLiveFetchUrl(),
      method:'POST',
      beforeSend: ()=> {
        this.beforeGoLive(jEl);
      },
      success: ( response )=>{
        if(response && response.success ){
          const meetingId  = deepGet(response , "data.start_zoom_meeting_payload.meeting_id") ;
          if(meetingId){
            window.location = `/communities/${this.channel.permalink}/meetings/${meetingId}/`
          }else {
            this.onGoLiveError(response, jEl);
          }
        }else {
          this.onGoLiveError(response, jEl);
        }
      },
      error : ( xhr,status,error )=>{
        this.onGoLiveError(error, jEl)
      }
    });
  };
  
  beforeGoLive(jEl){
    $(".jGoLiveError").html(" ");
    jEl.html("Going live...");
    jEl.addClass("disabled");
  }
  
  getGoLiveFetchUrl(){
    return `/api/web/communities/${this.channel.permalink}/meetings`
  }
  
  onGoLiveError(error , jEl){
    const msg = deepGet(error, "err.msg"  , "Something went wrong please try again later!");
    $(".jGoLiveError").html(msg);
    jEl.html("GO LIVE");
    jEl.removeClass("disabled");
  }

  descShowMoreLessHandling = () => {
    const jMobileAfterText = $(".channel-description-mobile .afterText");
    jMobileAfterText.append("<span class='showLess'> Show Less</span>");

  }
  

}

const pepo = ns("pepo");

pepo.channel = Channel;

export default Channel;
