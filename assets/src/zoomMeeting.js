const { ZoomMtg } = window;
import  ns from "../src/libs/namespace";
import * as ajaxHooks from './utils/ajaxHooks';

class ZoomMeeting {

    constructor(config){
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
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

window.ZoomMeeting = ZoomMeeting;

const pepo = ns("pepo");
pepo.zoomDisconnectGotoInit = function (config) {
  if(!config.permalink || !config.meetingId || config.role != 1 ){
    window.parent.location = config.goto;
  }
  $.ajax({
    url: `/api/web/channels/${config.permalink}/meetings/${config.meetingId}`,
    method:'POST',
    success: function (res) {},
    error : function( xhr,status,error ){},
    complete : function()  {
      window.parent.location = config.goto;
    }
  });
};