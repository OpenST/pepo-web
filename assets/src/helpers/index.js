
import  deepGet from "lodash/get"

class Helper {

  goLive = (channel , beforeSend , success ,  errorCallback  , complete  ) => {
    $.ajax({
      url: `/api/web/channels/${channel.permalink}/meetings`,
      method:'POST',
      beforeSend: ()=> {
        beforeSend && beforeSend();
      },
      success: ( response )=>{
        if(response && response.success ){
          const meetingId  = deepGet(response , "data.start_zoom_meeting_payload.meeting_id") ;
          if(meetingId){
            window.location = `/communities/${channel.permalink}/meetings/${meetingId}`;
            success && success(response);
          }else {
            errorCallback && errorCallback(response);
          }
        }else {
          errorCallback && errorCallback(response);
        }
      },
      error : ( xhr,status,error )=>{
        errorCallback && errorCallback(error);
      },
      complete : () => {
        complete && complete();
      }
    });
  };
  
  isZoomFullySupported(systemRequirements){
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

  
  

}


export  default  new Helper()
