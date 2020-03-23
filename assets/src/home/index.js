const {$} = window;

class Home {
    
    init = (data) => {
        this.muteAll();
        this.bindEvents();
        this.lazyLoadVideos();
    };

    muteAll = () => {
        let jqVideoMuteUnMute = $(".videoWrapper .videoMuteUnMute");
        $("video").prop('muted', true);
        jqVideoMuteUnMute.addClass('mute');
        jqVideoMuteUnMute.attr('title', 'Click to Unmute');
    };

    bindEvents = () => {
        const oThis = this;
        $(".videoWrapper").on("click", function(){
            oThis.toggleVideoMuteOthers(this);
        });
    };

    toggleVideoMuteOthers = (jqVideo) => {
        let jqVideoElem = $(jqVideo).find("video"),
            jqVideoMuteUnMute = $(jqVideo).find(".videoMuteUnMute"),
            muted = false;

        if( $(jqVideoElem).prop('muted') ) {
            muted = true;
        }

        this.muteAll();

        if(muted){
            $(jqVideoElem).prop('muted', false);
            jqVideoMuteUnMute.removeClass('mute');
            jqVideoMuteUnMute.attr('title', 'Click to Mute');
        } else {
            $(jqVideoElem).prop('muted', true);
            jqVideoMuteUnMute.addClass('mute');
            jqVideoMuteUnMute.attr('title', 'Click to Unmute');
        }
    };

    lazyLoadVideos = () => {
        $('video').each(function () {
            let videoUrl = $(this).data('src');
            videoUrl && $(this).attr('src', videoUrl);
        });
    }

}

export default new Home();
