
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
    var oThis =  this;

    //zoom system requirement
    oThis.__init();

    $(".jValidateZoomSupport").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {

      //TODO check is isSupportedBrowserCallback, remove || tue
      if(oThis.isFullySupported() || true){
        isSupportedBrowserCallback && isSupportedBrowserCallback($(this));
        return;
      }

      //TODO show not supported modal

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

  isFullySupported(systemRequirements){

    systemRequirements = systemRequirements || this.systemRequirements;

    if(!systemRequirements) return false;

    if(
      systemRequirements &&
      systemRequirements.features &&
      systemRequirements.features.length > 0 &&
      !systemRequirements.features.includes('computerAudio')
    ) {
      return false;
    }
    return true;
  }

  setZoomMeetingUserName (channel, meeting ,  onBeforeSend , onSuccess , onError, onComplete ){
    if(!channel || !meeting) return ;
    //TODO SHOW modal
    //TODO Validate name
    $.ajax({
      url: "",//TODO
      method:'POST',
      beforeSend: ()=> {
        //TODO Disabled butoon
        //TODO Change btn  text
        onBeforeSend && onBeforeSend();
      },
      success: ( response )=>{
        if(response && response.success ){
          //TODO Close modal and navigate to meeting page
          window.location = `/communities/${channel.permalink}/meetings/${meeting}`;
          onSuccess && onSuccess(response);
        }else {
          //TODO SHOW error in modal
          onError && onError(response);
        }
      },
      error : ( xhr,status,error )=>{
        //SHOW error in modal
        onError && onError(error);
      },
      complete : () => {
        //TODO enable butoon
        //TODO Change btn text to normal
        onComplete && onComplete();
      }
    });

  }



}



export default  new ZoomMeeting();
