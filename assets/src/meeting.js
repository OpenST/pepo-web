import  ns from "../js/libs/namespace";
import BasicHelper from '../src/helpers/basic'
import BaseView from "../src/common/BaseView";

const { $ } = window;
const namespace = "meeting";

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
        this.jqIframe = $('#zoomMeeting');
        this.jqError = $('#meetingError');
        this.jqLoader = $('#meetingLoader');
        this.fallbackErrorMsg = 'Something went wrong';

        this.onJoinError = this.onJoinError.bind(this);
        this.onJoinSuccess = this.onJoinSuccess.bind(this);

        this.init();
        this.bindEvents();
    }

    init(){
        this.initZoom();
        this.getJoinParamsAndJoin();
        this.bindEvents();
    }

    bindEvents(){
        $(".jMeetingTips").on("click" , ()=> {
            $("#meeting-tips-modal").modal("show");
        });

        $(".copyToClipboard").off(`click.${namespace}`).on(`click.${namespace}`, (e) => {
            console.log('here');
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

    initZoom(){
        this.showLoader();
        const ZoomMeeting = this.jqIframe[0].contentWindow.ZoomMeeting;
        this.zoomMeeting = new ZoomMeeting();
        this.zoomMeeting.init({
            leaveUrl: '/zoom-meeting?goto=' + this.leaveUrl,
            disableInvite: true,
            disableRecord: true,
            screenShare: this.canStartMeeting()
        });
    }

    joinZoom(data){
        this.zoomMeeting.join({
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

    getJoinParamsAndJoin(){
        if(
            this.config.apiResponse &&
            this.config.apiResponse.current_meeting_id &&
            this.channel
        ){
            $.ajax({
                url: `/api/web/channels/${this.channel.permalink}/meetings/${this.config.apiResponse.current_meeting_id}/join-payload`,
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
        this.jqError.find('.error-text').html(message);
        this.jqError.find('.error-btn').attr("href", this.leaveUrl);
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
