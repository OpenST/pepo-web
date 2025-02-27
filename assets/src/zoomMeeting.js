import * as ajaxHooks from './utils/ajaxHooks';
const { ZoomMtg } = window;

class ZoomMeeting {

    constructor(config){
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.4/lib', '/av');
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
