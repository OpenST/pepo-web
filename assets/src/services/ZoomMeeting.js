import  deepGet from "lodash/get";
import  helper from "../helpers/index";

const namespace = "zoomMeeting" ;

const LOG_TAG = "ZoomMeeting";

class ZoomMeeting {

  constructor() {
    this.zoomMeeting = null;
    this.systemRequirements = false;
    this.readyStateAttempt = 0;
    this.jqIframeHidden = $('#zoomMeetingHidden');

    //Sachin :: Don't call this.init from constructor
  }

  getSystemRequirements() {
    return this.systemRequirements;
  }

  /**
   * For init you have require or add this in your content partial.
   * <iframe id="zoomMeetingHidden" class="meeting-iframe" src="/zoom-meeting" style="display: none;"></iframe>
   * @param isSupportedBrowserCallback
   */
  init( isSupportedBrowserCallback ){

    $(".jJoinMeeting").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      //TODO check is isSupportedBrowserCallback, remove || true
      if(helper.isZoomFullySupported()){
        isSupportedBrowserCallback && isSupportedBrowserCallback($(this));
        return;
      }
      //TODO show not supported modal
      $("#browser-not-supported").modal("show");
    });

  }

  __init() {
    let contentWindow = this.jqIframeHidden[0].contentWindow;
    this.readyStateAttempt++;
    if(contentWindow.document.readyState == 'complete' && contentWindow.ZoomMeeting){
      const ZoomMeeting = contentWindow.ZoomMeeting;
      this.zoomMeeting = new ZoomMeeting();
      // Cos this might break at times
      try{
        this.systemRequirements = this.zoomMeeting.getZoomMtg().checkSystemRequirements();
      } catch(e) {
        console.warn(e);
      }
    } else {
      if(this.readyStateAttempt >= 3) {
        console.warn(LOG_TAG, "Error initiating web zoom");
        return;
      }
      setTimeout(() => this.init(), this.readyStateAttempt * 500);
    }
  }
  
  setZoomMeetingUserName (channel, onBeforeSend , onSuccess , onError, onComplete ){
    const jEl = $('.join-event-btn');
    const meetingId = deepGet(channel , "live_meeting_id");
    if(!channel || !meetingId) return ;
    //TODO SHOW modal
    $("#logged-out-username-modal").modal("show");
    //TODO Validate name
    jEl.on(`click`, function(e){
      const name = $("#username-input").val();
      console.log(name)
      if(!name) return;

      // $("#logged-out-username-modal").on(`hidden.bs.modal`,function(e){
      //   $("#username-input").val('');
      //   $(".jJoinError").html(" ");
      //   jEl.removeClass("disabled");
      // });

      $.ajax({
        url: "",//TODO
        method:'POST',
        beforeSend: ()=> {
          //TODO Disabled butoon
          //TODO Change btn  text    
          $(".jJoinError").html(" ");
          jEl.html("Joining...");
          jEl.addClass("disabled");
          onBeforeSend && onBeforeSend();
        },
        success: ( response )=>{
          if(response && response.success ){
            //TODO Close modal and navigate to meeting page
            $("#logged-out-username-modal").modal("hide");
            window.location = `/communities/${channel.permalink}/meetings/${meetingId}`;
            onSuccess && onSuccess(response);
          }else {
            //TODO SHOW error in modal
            const msg = deepGet(error, "err.msg"  , "Something went wrong please try again later!");
            $(".jJoinError").html(msg);
            onError && onError(response);
          }
        },
        error : ( xhr,status,error )=>{
          //SHOW error in modal
          const msg = deepGet(error, "err.msg"  , "Something went wrong please try again later!");
          $(".jJoinError").html(msg);
          onError && onError(error);
        },
        complete : () => {
          //TODO enable butoon
          //TODO Change btn text to normal
          jEl.html("JOIN");
          jEl.removeClass("disabled");
          onComplete && onComplete();
         
        }
      });

    });
  
  }



}



export default  new ZoomMeeting();
