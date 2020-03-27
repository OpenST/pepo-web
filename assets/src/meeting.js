import  ns from "../js/libs/namespace";
import BasicHelper from '../src/helpers/basic'
import BaseView from "../src/common/BaseView";
import {PageStates, FailedStates} from "../src/common/zoom/PageStates";

const { $ } = window;
const namespace = "meeting";
const LOG_TAG = "MeetingsClass :: ";
const CUSTOM_EVENTS = {
    "SCRIPT_LOADED": "SCRIPT_LOADED",
    "FETCH_JOIN_PARAMS_SUCCESS": "FETCH_JOIN_PARAMS_SUCCESS",
};

const MAX_JOIN_RETRY_COUNT = 3;
const ZOOM_MEETING_IFRAME_PATH = "/zoom-meeting";

class Meeting extends BaseView {

    constructor(config){
        super(config);
        this.config = config;
        this.leaveUrl = this.config.leaveUrl;
        this.apiResponse = this.config.apiResponse;
        this.meeting = this.apiResponse.meeting;
        this.channelId = this.apiResponse.meeting.channel_id;
        this.channel = this.apiResponse.channels[this.channelId];
        this.zoomMeeting = null;
        this.systemRequirements = false;
        this.readyStateAttempt = 0;
        this.jqIframe = $('#zoomMeeting');
        this.jqError = $('#meetingError');
        this.jqLoader = $('#meetingLoader');
        this.fallbackErrorMsg = 'Something went wrong';

        this.joinMeetingTryCount = 1;
        this.hasJoinedMeeting    = false;
        this.PageStates = PageStates;
        this._eventsTimeoutMap = {};

        //All the timeouts
        this.iframeLoadTime         = 3000;
        this.scriptLoadTimeout      = 1000;
        this.sdkPrepareTimeout      = 1000;
        this.sdkInitializeTimeout   = 1000;
        this.joinMeetingTimeout     = 15000;



        this.onJoinError = this.onJoinError.bind(this);
        this.onJoinSuccess = this.onJoinSuccess.bind(this);

        this.init();
        this.bindEvents();
    }

    init(){
        if(this.meeting && (this.meeting.status == 'STARTED' || this.meeting.status == 'WAITING')) {
            if(
                !this.config ||
                !this.config.apiResponse ||
                !this.config.apiResponse.current_meeting_id ||
                !this.channel
            ){
                oThis.showError(this.fallbackErrorMsg);
                return;
            }   

            this.startZoomEngine();
        } else {
          this.showError('This Pepo live event has ended');
        }
        this.bindEvents();
    }

    bindEvents(){

        $(".copyToClipboard").off(`click.${namespace}`).on(`click.${namespace}`, (e) => {
            let isCopied = BasicHelper.copyToClipboard(this.config.apiResponse.share_url, $(e.target));
            if(isCopied){
                $('.toast-copied-to-clipboard').toast('show');
            } else {
                $('.toast-copied-to-clipboard-failed').toast('show');
            }
            e.stopPropagation();
        });
    }

    canStartMeeting(){
        return (this.config.apiResponse.current_user_channel_relations[this.channel.id] || {}).is_admin == 1;
    }

    // initZoom(){
    //     this.showLoader();
    //     let contentWindow = this.jqIframe[0].contentWindow;
    //     this.readyStateAttempt++;
    //     if(contentWindow.document.readyState == 'complete' && contentWindow.ZoomMeeting){
    //         const ZoomMeeting = contentWindow.ZoomMeeting;
    //         this.zoomMeeting = new ZoomMeeting();
    //         this.zoomMeeting.init({
    //             leaveUrl: '/zoom-meeting?goto=' + this.leaveUrl,
    //             disableInvite: true,
    //             disableRecord: true,
    //             screenShare: true /* Always show share screen button. */
    //         },
    //             () => this.getJoinParamsAndJoin(),
    //             (error) => this.showError(`Error initiating Zoom Web: ${error && error.errorMessage}`)
    //         );
    //     } else {
    //         if(this.readyStateAttempt >= 3) {
    //             this.showError('Error initiating Zoom Web');
    //             return;
    //         }
    //         setTimeout(() => this.initZoom(), this.readyStateAttempt * 500);
    //     }

    // }

    ensureSystemRequirements() {
        let systemRequirements = null;
        try {
           systemRequirements = this.zoomMeeting.getZoomMtg().checkSystemRequirements();
        } catch(e) {
            //ignore.
        }
        
        if(
          systemRequirements &&
          systemRequirements.features &&
          systemRequirements.features.length > 0 &&
          systemRequirements.features.includes('computerAudio')
        ) {
            return true;
        }

        this.showError(`Pepo live events are not supported on your browser, please use Chrome or Edge desktop browsers.`);
        return false;
    }

    joinZoom(data){
        const oThis = this;

        // TODO: Move this to constructor once the code has been extracted from zoom lib.
        if ( !oThis.ensureSystemRequirements() ) {
            return;
        }

        console.log(LOG_TAG, "oThis.PageStates.MEETING_JOINED", oThis.PageStates.MEETING_JOINED);
        oThis.scheduleZoomTaskTimeout(oThis.joinMeetingTimeout, oThis.PageStates.MEETING_JOINED );

        oThis.zoomMeeting.join({
            meetingNumber: data.zoom_meeting_id,
            userName: data.name,
            apiKey: data.api_key,
            signature: data.signature,
            participantId: data.participant_id
        },
            this.onJoinSuccess,
            this.onJoinError
        );
    }

    getJoinParamsAndJoin() {
        const oThis = this;

        if(
            !this.config ||
            !this.config.apiResponse ||
            !this.config.apiResponse.current_meeting_id ||
            !this.channel
        ){
            oThis.showError(this.fallbackErrorMsg);
            return;
        }        

        let errorCallback = ( error ) => {
            let errorMsg = this.fallbackErrorMsg;
            if(error && error.err && error.err.msg){
                errorMsg = error.err.msg;
            }
            oThis.showError(errorMsg);
        };

        let successCallback = ( response ) => {
            oThis.joinZoom(response.data[response.data.result_type]);
        };

        oThis.getJoinParams(successCallback, errorCallback);
    }


    getJoinParams( successCallback, errorCallback ) {
        const oThis = this;
        // oThis.scheduleZoomTaskTimeout(3000, CUSTOM_EVENTS.FETCH_JOIN_PARAMS_SUCCESS);
        $.ajax({
            url: `/api/web/channels/${this.channel.permalink}/meetings/${this.config.apiResponse.current_meeting_id}/join-payload`,
            success: (response) => {
                if(
                    response.success &&
                    response.data &&
                    response.data.result_type &&
                    response.data[response.data.result_type]
                ){
                    // oThis.onZoomSuccessState(null, CUSTOM_EVENTS.FETCH_JOIN_PARAMS_SUCCESS, false);
                    successCallback && successCallback( response );
                } else {
                    errorCallback && errorCallback( response );
                }
            },
            error: (jqXHR) => {
                let response = jqXHR.responseJSON;
                errorCallback && errorCallback( response );
            },
        })
    }

    showError(message){
        const oThis = this;

        this.jqIframe.hide();
        this.jqLoader.hide();
        this.jqError.find('.error-text').html(message);
        this.jqError.find('.error-btn').attr("href", '/'+this.leaveUrl);
        this.jqError.show();
    }

    showLoader(){
        const oThis = this;

        this.jqIframe.hide();
        this.jqError.hide();
        this.jqLoader.show();
    }

    onJoinSuccess(response){
        const oThis = this;

        console.log(response);
        this.jqLoader.hide();
        this.jqError.hide();
        this.jqIframe.show();
    }

    onJoinError(error){
        const oThis = this;

        this.showError(error.errorMessage);
    }


    startZoomEngine() {
        const oThis = this;

        // Show the loader.
        oThis.showLoader();

        // Schedule Task Timeout
        oThis.scheduleZoomTaskTimeout( oThis.scriptLoadTimeout, CUSTOM_EVENTS.SCRIPT_LOADED );

        // Perform the task.
        let contentWindow = oThis.jqIframe[0].contentWindow;
        contentWindow.onZoomMeetingScriptLoaded = (ZoomMeetingClass) => {
            // clear task timeout.
            oThis.onZoomSuccessState(null, CUSTOM_EVENTS.SCRIPT_LOADED, false);
            oThis.onZoomMeetingScriptLoaded(ZoomMeetingClass);
        };
    }

    onZoomMeetingScriptLoaded( ZoomMeetingClass ) {
        const oThis = this;

        const zoomMeeting = oThis.zoomMeeting = new ZoomMeetingClass();

        // Subscribe to all success states
        zoomMeeting.subscribeToSuccessStates( (...args) => {
            oThis.onZoomSuccessState(...args);
        });

        // Subscribe to all error states
        zoomMeeting.subscribeToErrorStates( (...args) => {
            oThis.onZoomSdkError(...args);
        });

        // Schedule Task Timeout
        oThis.scheduleZoomTaskTimeout( oThis.sdkPrepareTimeout, PageStates.SDK_PREPARED );
        zoomMeeting.subscribeToState(PageStates.SDK_PREPARED, (...args) => {
            console.log(LOG_TAG, "SDK_PREPARED received");
            oThis.onZoomSdkPrepared(...args);
        });

        // Subscribe to SDK_INITIALIZED
        zoomMeeting.subscribeToState(PageStates.SDK_INITIALIZED, (...args) => {
            console.log(LOG_TAG, "SDK_INITIALIZED received");
            oThis.onZoomSdkInitialized(...args);
        });

    }

    onZoomSdkPrepared() {
        const oThis = this;

        // Schedule Task Timeout
        oThis.scheduleZoomTaskTimeout( oThis.sdkInitializeTimeout, oThis.PageStates.SDK_INITIALIZED );

        // Initialize the sdk.
        this.zoomMeeting.init({
            leaveUrl: '/zoom-meeting?goto=' + this.leaveUrl,
            disableInvite: true,
            disableRecord: true,
            screenShare: true /* Always show share screen button. */
        });
    }

    onZoomSdkInitialized() {
        const oThis = this;

        this.getJoinParamsAndJoin();
    }


    onZoomSdkError(event, pageState, isErrorState) {


        /**
         * Requirements (Written by Rachin. No one else to blame. )
         * - have a safety check. never redirect user if join is successful
         * - Try till MAX_JOIN_RETRY_COUNT to join the meeting.
         * - Once MAX_JOIN_RETRY_COUNT is reached, show error
         * - If user joins the meeting even after error, hide the error and show the meeting.
         */

        const oThis = this;

        console.log(LOG_TAG, "An error has occoured in Zoom Iframe.");
        if ( MAX_JOIN_RETRY_COUNT > oThis.joinMeetingTryCount) {
            if ( oThis.hasJoinedMeeting ) {
                console.log(LOG_TAG, "User has already joined meeting. Ignoring the error. NOT Retrying.");
                return;
            }

            console.log(LOG_TAG, "Retrying to join meeting");
            oThis.joinMeetingTryCount++;
            this.jqIframe.attr('src', `${ZOOM_MEETING_IFRAME_PATH}?_tryCnt=${oThis.joinMeetingTryCount}`);
            setTimeout( () => {
                console.log(LOG_TAG, "checking if iframe has loaded");
                oThis.startZoomEngine();
            }, oThis.iframeLoadTime);
        } else {
            this.showError('Failed to join meeting. Max retry attempts reached');
        }
    }

    onZoomSuccessState(event, pageState, isErrorState) {
        const oThis = this;        

        // Clear the timeout.
        oThis.zoomTaskDone( pageState );

        console.log(LOG_TAG, "----| below is time take for state to update to " , pageState, ":");
        console.timeEnd(LOG_TAG + "_" + pageState);


        // A fail safe.
        if ( oThis.PageStates.MEETING_JOINED === pageState) {
            oThis.hasJoinedMeeting = true;
        }
    }

    scheduleZoomTaskTimeout( timeout, expectedPageState ) {
        const oThis = this;

        console.time(LOG_TAG + "_" + expectedPageState);
        console.log(LOG_TAG, "Wating",timeout, "miliseconds for ", expectedPageState );

        oThis._eventsTimeoutMap[ expectedPageState ] = setTimeout(() => {
            console.log(LOG_TAG, "TIMEOUT TRIGGERED for expectedPageState", expectedPageState, "timeout", timeout);

            // Trigger sdk error.
            oThis.onZoomSdkError(null, "ZOOM_TASK_TIMEOUT_ERROR", true, {
                "expectedPageState": expectedPageState
            });

            console.log(LOG_TAG, "Ignore the below time. It's being cleared");
            console.timeEnd(LOG_TAG + "_" + expectedPageState);
        }, timeout);
    }

    zoomTaskDone( pageState ) {
        const oThis = this;

        if ( oThis._eventsTimeoutMap[ pageState ] ) {
            clearTimeout( oThis._eventsTimeoutMap[ pageState ] );
            console.log("Zoom Task", pageState, " marked as done");
            oThis._eventsTimeoutMap[ pageState ] = null;
        }
    }



    
}

const pepo = ns("pepo");
pepo.meeting = Meeting;
