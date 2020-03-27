
import  helper from "../helpers/index";

const namespace = "zoomMeeting" ;


class ZoomMeeting {

  init( isSupportedBrowserCallback ){
    var oThis =  this;
    
    $(".jValidateZoomSupport").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
    
      //TODO check is isSupportedBrowserCallback, remove || tue
      if(helper.isZoomFullySupported() || true){
        isSupportedBrowserCallback && isSupportedBrowserCallback($(this));
        return;
      }
      
      //TODO show not supported modal
      
    });
    
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