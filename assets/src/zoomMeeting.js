const { ZoomMtg } = window;
import  ns from "../src/libs/namespace";

import * as ajaxHooks from './utils/ajaxHooks';

class ZoomMeeting {

    constructor(config){
        
        if(config){
          if(typeof config.apiResponse == "string"){
            config.apiResponse =  JSON.parse( config.apiResponse );
          }
          this.config = config;
          
          if(this.config.goto){
            this.initGoTo();
            return;
          }
        }
        
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }
    
    initGoTo(){
      if(!this.config.permalink || !this.config.meetingId){
        window.parent.location = this.config.goto;
      }
      $.ajax({
        url: `/api/web/channels/${this.config.permalink}/meetings/${this.config.meetingId}`,
        method:'POST',
        success: function (res) {},
        error : function( xhr,status,error ){},
        complete : function()  {
          window.parent.location = this.config.goto;
        }
      });
    }

    init(options, onSuccess, onError){
        ZoomMtg.init(Object.assign({}, options, {
            success: onSuccess || this.onInitSuccess,
            error: onError || this.onInitError,
        }));
    }

    join(options, onSuccess, onError){
        ZoomMtg.join(Object.assign({}, options, {
            success: onSuccess || this.onJoinSuccess,
            error: onError || this.onJoinError,
        }));
    }

    getZoomMtg(){
        return ZoomMtg;
    }

    onInitSuccess(res){
        console.log('onInitSuccess: ', res);
    }

    onInitError(res){
        console.warn('onInitError: ', res);
    }

    onJoinSuccess(res){
        console.log('onJoinSuccess: ', res);
    }

    onJoinError(res){
        console.warn('onJoinError: ', res);
    }

}

const pepo = ns("pepo");
pepo.zoomMeeting = ZoomMeeting;

window.ZoomMeeting = ZoomMeeting;
