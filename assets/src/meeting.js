import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";

const { $ } = window;

class Meeting extends BaseView {

    constructor(config){
        super(config);
        this.zoomMeeting = null;
        this.jqIframe = $('#zoomMeeting');
        this.jqError = $('#meetingError');
        $(document).ready(() => {
            this.initZoom();
            this.getJoinParams()
        });
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
        data = { zoomMeetingId: '781120756',
            signature:
                'NmFQcVRPYXpTWjZNRW9QS21HUktoZy43ODExMjA3NTYuMTU4NTA0NzQ1MDAyNC4xLjBtOTkwZVdKbG9Wbk9jMU9OTE5ieDIyS3Q3RTRVNlRYZ1B4U0Fwbmo0d289',
            name: 'Dummy',
            profile_pic_url: null,
            role: 0,
            api_key: '6aPqTOazSZ6MEoPKmGRKhg' };

        this.zoomMeeting.join({
            meetingNumber: data.zoomMeetingId,
            userName: data.name,
            passWord: '796910',
            apiKey: data.api_key,
            signature: data.signature
        }, null, this.onJoinError);
        this.jqIframe.show();
    }

    getJoinParams(){
        $.ajax({
            url: '/api/web/channels/whale-channel/meetings/1',
            success: (response) => {
                if(
                    response.success &&
                    response.data &&
                    response.data.result_type &&
                    response.data[response.data.result_type]
                ){
                    this.joinZoom(response.data[response.data.result_type]);
                } else {
                    this.joinParamError('Something went wrong');
                }
            },
            error: () => this.joinParamError('Something went wrong'),
        })
    }

    joinParamError(message){
        this.jqIframe.hide();
        this.jqError.text(message);
        this.jqError.show();
    }

    onJoinError(error){
        //this.jqIframe.hide();
        this.jqError.text(error.errorMessage);
        this.jqError.show();
    }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
