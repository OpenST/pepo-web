
import  deepGet from "lodash/get"

class Helper {
  
  goLive = (channel , beforeSend , success ,  errorCallback   ) => {
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
            window.location = `/communities/${channel.permalink}/meetings/${meetingId}/`
          }else {
            errorCallback && errorCallback(response);
          }
        }else {
          errorCallback && errorCallback(response);
        }
      },
      error : ( xhr,status,error )=>{
        errorCallback && errorCallback(error);
      }
    });
  };
  

  
  


}


export  default  new Helper()