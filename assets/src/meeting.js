import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";

const { $ } = window;

class Meeting extends BaseView {

    constructor(config){
        super(config);
        this.config = config;
        this.leaveUrl = this.config.leaveUrl;
        this.channel = this.config.apiResponse.channel;
        this.zoomMeeting = null;
        this.jqIframe = $('#zoomMeeting');
        this.jqError = $('#meetingError');
        this.jqLoader = $('#meetingLoader');
        this.jqMeetingName = $('#communityName');
        this.fallbackErrorMsg = 'Something went wrong';

        this.onJoinError = this.onJoinError.bind(this);
        this.onJoinSuccess = this.onJoinSuccess.bind(this);

        this.init();
    }

    init(){
        this.initZoom();
        this.getJoinParamsAndJoin();
        this.populateMeetingDetails();
        this.bindEvents();
    }
    
    bindEvents(){
        $(".jMeetingTips").on("click" , ()=> {
            $("#meeting-tips-modal").modal("show");
        });
    }

    canStartMeeting(){
        return this.config.apiResponse.channel_allowed_actions[this.channel.id].can_start_meeting == 1;
    }

    initZoom(){
        this.showLoader();
        const ZoomMeeting = this.jqIframe[0].contentWindow.ZoomMeeting;
        this.zoomMeeting = new ZoomMeeting();
        this.zoomMeeting.init({
            leaveUrl: this.leaveUrl,
            disableInvite: true,
            disableRecord: true,
            screenShare: this.canStartMeeting()
        });
    }

    populateMeetingDetails(){
        this.jqMeetingName.text(this.channel.name);
    }

    joinZoom(data){
        this.zoomMeeting.join({
            meetingNumber: data.zoom_meeting_id,
            userName: data.name,
            apiKey: data.api_key,
            signature: data.signature,
            participant_id: data.participant_id
        },
            this.onJoinSuccess,
            this.onJoinError
        );
    }

    getJoinParamsAndJoin(){
        if(
            this.config.apiResponse &&
            this.config.apiResponse.current_meeting_id &&
            this.channel
        ){
            $.ajax({
                url: `/api/web/channels/${this.channel.permalink}/meetings/${this.config.apiResponse.current_meeting_id}`,
                success: (response) => {
                    if(
                        response.success &&
                        response.data &&
                        response.data.result_type &&
                        response.data[response.data.result_type]
                    ){
                        this.joinZoom(response.data[response.data.result_type]);
                    } else {
                        let errorMsg = this.fallbackErrorMsg;
                        if(response.err && response.err.msg){
                            errorMsg = response.err.msg;
                        }
                        this.showError(errorMsg);
                    }
                },
                error: (jqXHR) => {
                    let error = jqXHR.responseJSON;
                    let errorMsg = this.fallbackErrorMsg;
                    if(error && error.err && error.err.msg){
                        errorMsg = error.err.msg;
                    }
                    this.showError(errorMsg);
                },
            })
        } else {
            this.showError(this.fallbackErrorMsg);
        }

    }

    showError(message){
        this.jqIframe.hide();
        this.jqLoader.hide();
        this.jqError.text(message);
        this.jqError.show();
    }

    showLoader(){
        this.jqIframe.hide();
        this.jqError.hide();
        this.jqLoader.show();
    }

    onJoinSuccess(response){
        console.log(response);
        this.jqLoader.hide();
        this.jqError.hide();
        this.jqIframe.show();
    }

    onJoinError(error){
        console.log("here", error);
        this.showError(error.errorMessage);
    }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
