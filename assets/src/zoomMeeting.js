const { ZoomMtg } = window;

import {PageStates, FailedStates} from "../src/common/zoom/PageStates";

const ANY_ERROR_STATE = "ANY_ERROR_STATE";
const ANY_SUCCESS_STATE = "ANY_SUCCESS_STATE";

class ZoomMeeting {

    constructor(){
        const oThis = this;
        oThis._setState( PageStates.LOADING );
        
        // Wait for DOM ready event.
        $(() => {
            oThis._setState( PageStates.DOM_READY );
            setTimeout(() => {
                // Allow other scripts to bind event.
                oThis.prepareZoomSdk();
            }, 0)
            
        });
    }

    getPageStates() {
        return PageStates;
    }

    static getFailedStates() {
        return FailedStates;
    }

    getCurrentState() {
        return this.currentState;
    }

    isCurrentStateFailed() {
        return (FailedStates.indexOf( this.currentState ) > -1);
    }

    prepareZoomSdk() {
        const oThis = this;

        const ZoomMtg = window.ZoomMtg;
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();         

        // Update the current state.
        oThis._setState( PageStates.SDK_PREPARED );
    }

    init(options, onSuccess, onError){
        const oThis = this;
        let hasReceivedSuccess = false;
        if ( oThis.hasInitBeenCalled ) {
            console.log("IMPORTANT!!! init method called twice");
            console.trace();
        }
        oThis.hasInitBeenCalled = true;

        try {
            const ZoomMtg = window.ZoomMtg;
            ZoomMtg.init(Object.assign({}, options, {
                success: (...args) => {

                    // Update the state.
                    oThis._setState(PageStates.SDK_INITIALIZED);

                    // Trigger callback if available
                    onSuccess && onSuccess(...args);

                    if ( hasReceivedSuccess ) {
                        console.log("IMPORTANT!!! success triggered twice!");
                    } else {
                        console.log("success triggered for first time");
                    }
                    hasReceivedSuccess = true;
                },
                error: (...args) => {
                    // Update the state.
                    console.log("An error occoured while initializing sdk. Got an error callback.");
                    console.log(...args);
                    oThis._setState( PageStates.SDK_INITIALIZATION_FAILED );


                    // Trigger callback if available.
                    onError && onError(...args);
                }
            }));
        } catch( e ) {
            console.log("An error occoured while initializing sdk.");
            console.log(e);
            oThis._setState( PageStates.SDK_INITIALIZATION_FAILED );
        }
    }

    join(options, onSuccess, onError){
        const oThis = this;
        try {
            const ZoomMtg = window.ZoomMtg;
            ZoomMtg.join(Object.assign({}, options, {
                success: (...args) => {

                    // Update the state.
                    oThis._setState(PageStates.MEETING_JOINED);

                    // Trigger callback if available
                    onSuccess && onSuccess(...args);
                },
                error: (...args) => {
                    // Update the state.
                    console.log("An error occoured while initializing sdk. Got an error callback.");
                    console.log(...args);
                    oThis._setState(PageStates.JOIN_MEETING_FAILED);

                    // Trigger callback if available.
                    onError && onError(...args);
                }
            }));
        } catch( e ) {
            console.log("An error occoured while joining meeting.");
            console.log(e);
            oThis._setState( PageStates.JOIN_MEETING_FAILED );
        }
    }

    getZoomMtg(){
        return window.ZoomMtg;
    }

    subscribeToState(state, callback) {
        const oThis = this;
        $(oThis).on(state, callback);
    }

    subscribeToErrorStates(callback) {
        const oThis = this;
        $(oThis).on(ANY_ERROR_STATE, callback);        
    }

    subscribeToSuccessStates(callback) {
        const oThis = this;
        $(oThis).on(ANY_SUCCESS_STATE, callback);        
        console.log("ANY_SUCCESS_STATE has been subscribed");
    }

    _setState( newPageState ) {
        const oThis = this;

        oThis.currentState = newPageState;
        console.log("Zoom Page state updated to ", oThis.currentState);

        // Create a clousre for currentState.
        // Otherwise wrong event may be sent to events.        
        let eventCurrentState = oThis.currentState;
        let isFailedStateEvent = oThis.isCurrentStateFailed();

        

        // Tell the world about state update
        // setTimeout is used to make sure if the listner event is heavy, 
        // other events are not missed.
        if ( isFailedStateEvent ) {
            // Fire a special event - On Any Error State.
            setTimeout( () => {
                $(oThis).trigger(ANY_ERROR_STATE, [eventCurrentState, isFailedStateEvent]);
                console.error("ANY_ERROR_STATE triggered for", eventCurrentState );
            }, 0);
            
            
        } else {
            // Fire a special event - On Any Success State.
            setTimeout( () => {
                $(oThis).trigger(ANY_SUCCESS_STATE, [eventCurrentState, isFailedStateEvent]);
                console.log("ANY_SUCCESS_STATE triggered for", eventCurrentState );
            }, 0);
        }

        setTimeout( () => {
            $(oThis).trigger(newPageState, [eventCurrentState,isFailedStateEvent] );
            console.log("Page State Event", newPageState, " triggered. isFailedStateEvent = ", isFailedStateEvent);
        }, 0);
    }
}

window.ZoomMeeting = ZoomMeeting;


const scriptLoadCallbackHandler = () => {
    if ( window.onZoomMeetingScriptLoaded ) {
        // Callback already defined. Lets tell them we are ready!
        window.onZoomMeetingScriptLoaded( ZoomMeeting );
    } else {
        // Let's do some NASA-GIRI here.
        // This is a jquery style ready function "wanabe" implementation.
        // Only touch this if you know what you are doing.
        let _cb = null;
        Object.defineProperty(window, "onZoomMeetingScriptLoaded", {
            get: () => {
                return _cb;
            },
            set: (newCb) => {
                _cb = newCb;
                newCb( ZoomMeeting );
            }
        });
    }
};
scriptLoadCallbackHandler();




