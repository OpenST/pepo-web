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
        this.readyStateAttempt = 0;
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
        if(this.meeting && (this.meeting.status == 'STARTED' || this.meeting.status == 'WAITING')) {
          this.initZoom();
          this.getJoinParamsAndJoin();
        } else {
          this.showError('This Pepo live event has ended');
        }
        this.bindEvents();
    }

    bindEvents(){

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

    isFullySupported(systemRequirements){
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

    initZoom(){
        this.showLoader();
        let contentWindow = this.jqIframe[0].contentWindow;
        this.readyStateAttempt++;
        if(contentWindow.document.readyState == 'complete' && contentWindow.ZoomMeeting){
            const ZoomMeeting = contentWindow.ZoomMeeting;
            this.zoomMeeting = new ZoomMeeting();
            this.zoomMeeting.init({
                leaveUrl: '/zoom-meeting?goto=' + this.leaveUrl,
                disableInvite: true,
                disableRecord: true,
                screenShare: this.canStartMeeting()
            });
        } else {
            if(this.readyStateAttempt >= 3) {
                this.showError('Error initiating Zoom Web');
                return;
            }
            setTimeout(() => this.initZoom(), this.readyStateAttempt * 500);
        }

    }

    joinZoom(data){
        this.systemRequirements = this.zoomMeeting.getZoomMtg().checkSystemRequirements();
        if(!this.isFullySupported(this.systemRequirements)){
            let browser = this.systemRequirements.browserInfo || 'this';
            this.showError(`Pepo live events are not supported on ${browser} browser, please use Chrome or Edge browsers.`);
            return;
        }
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
        this.jqError.find('.error-btn').attr("href", '/'+this.leaveUrl);
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
        this.showError(error.errorMessage);
    }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
