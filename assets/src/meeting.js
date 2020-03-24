import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";

const { $ } = window;

class Meeting extends BaseView {

    constructor(config){
        super(config);
        this.config = config;
        this.zoomMeeting = null;
        this.jqIframe = $('#zoomMeeting');
        this.jqError = $('#meetingError');

        this.onJoinError = this.onJoinError.bind(this);
        this.onJoinSuccess = this.onJoinSuccess.bind(this);

        this.init();
    }

    init(){
        this.initZoom();
        this.getJoinParamsAndJoin();
    }

    initZoom(){
        this.jqIframe.hide();
        const ZoomMeeting = this.jqIframe[0].contentWindow.ZoomMeeting;
        this.zoomMeeting = new ZoomMeeting();
        this.zoomMeeting.init({
            leaveUrl: 'https://pepo.com',
            disableInvite: true,
            screenShare: false
        });
    }

    joinZoom(data){
        this.zoomMeeting.join({
            meetingNumber: data.zoomMeetingId,
            userName: data.name,
            apiKey: data.api_key,
            signature: data.signature
        },
            this.onJoinSuccess,
            this.onJoinError
        );
    }

    getJoinParamsAndJoin(){
        if(
            this.config.apiResponse &&
            this.config.apiResponse.channel &&
            this.config.apiResponse.channel.live_meeting_id
        ){
            $.ajax({
                url: `/api/web/channels/${this.config.apiResponse.channel.permalink}/meetings/${this.config.apiResponse.channel.live_meeting_id}`,
                success: (response) => {
                    if(
                        response.success &&
                        response.data &&
                        response.data.result_type &&
                        response.data[response.data.result_type]
                    ){
                        this.joinZoom(response.data[response.data.result_type]);
                    } else {
                        this.showError('Something went wrong');
                    }
                },
                error: () => this.showError('Something went wrong'),
            })
        } else {
            this.showError('Invalid Meeting');
        }

    }

    showError(message){
        this.jqIframe.hide();
        this.jqError.text(message);
        this.jqError.show();
    }

    onJoinSuccess(response){
        console.log(response);
        this.jqIframe.show();
    }

    onJoinError(error){
        this.showError(error.errorMessage);
    }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
