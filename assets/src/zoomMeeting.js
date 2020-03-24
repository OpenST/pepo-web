const { ZoomMtg } = window;

class ZoomMeeting {

    constructor(){
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
        }))
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
