import $ from 'jquery';
import BasicHelper from '../../helpers/basic'
import socketPixelCall from "../../services/SocketPixelCall";

const LOG_TAG = 'PepoVideo';
const namespace = "video";

const VIDEO_PLAY_START_EVENT_NAME = "video_play_start";
const VIDEO_PLAY_END_EVENT_NAME = "video_play_end";

class Video {

  init = () => {
    this.bindEvents();
  };

  bindEvents = () => {

    const oThis =this;

    $(".reportVideo").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      const videoId = $(this).closest(".videoContainer").data("video-id"),
            jModal = $('#reportModal')
      ;
      jModal.modal({
        backdrop: !($('.modal.show').length > 0)
      });
      jModal.data("video-id", videoId);
      e.stopPropagation();
    });


    $('.actionButtonsWeb .downloadApp, .channel-list.web .downloadApp').off(`click.${namespace}`).on(`click.${namespace}`, function () {
      $('#downloadModal').modal({
        backdrop: !($('.modal.show').length > 0)
      });
    });

    $('.actionButtonsMobile .downloadApp, .channel-list.mobile .downloadApp').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      $('#downloadModalSingleCTA').modal({
        backdrop: !($('.modal.show').length > 0)
      });
      e.stopPropagation();
    });

    $(".report-title").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      $('#reportModal').modal('hide');
      let videoId = $(this).closest("#reportModal").data('video-id');
      oThis.report(videoId);
      e.stopPropagation();
    });

    $(".copyToClipboard").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      var textToCopy = $(this).data('share-url');
      var isCopied = BasicHelper.copyToClipboard(textToCopy, $(this));
      if(isCopied){
        $('.toast-copied-to-clipboard').toast('show');
      } else {
        $('.toast-copied-to-clipboard-failed').toast('show');
      }
      e.stopPropagation();
    });

    $('.video-container-wrapper').off(`click.${namespace}`).on(`click.${namespace}`, function(e){
      if($(this).hasClass("active")){
        oThis.pauseVideo( $(this) );
      } else {
        oThis.playVideo( $(this) );
      }
    });
    
    $('.pepoVideo').off(`play.${namespace}`).on(`play.${namespace}`, function (e) {
      if (!this.videoStarted) {
        this.videoStarted = true;
        console.log(LOG_TAG, 'Video Started');
        let videoId = $(this).closest(".videoContainer").data('video-id');
        oThis.sendVideoEvent(VIDEO_PLAY_START_EVENT_NAME, videoId);
      }
    }).off(`ended.${namespace}`).on(`ended.${namespace}`, function (e) {
      const jEl = $(this).closest(".video-container-wrapper");
      oThis.playVideo(jEl);
      if (!this.videoEnded) {
        this.videoEnded = true;
        console.log(LOG_TAG, 'Video Ended');
        let videoId = $(this).closest(".videoContainer").data('video-id');
        oThis.sendVideoEvent(VIDEO_PLAY_END_EVENT_NAME, videoId);
      }
    });
  };

  playVideo(jEl){
    if(!jEl) return;
    let ctrlVideo =  jEl.find('video.pepoVideo')[0];
    ctrlVideo.play();
    jEl.find('.ppBtn').hide();
    jEl.toggleClass("active");
  }

  pauseVideo(jEl){
    if(!jEl) return;
    let ctrlVideo =jEl.find('video.pepoVideo')[0];
    ctrlVideo.pause();
    jEl.find('.ppBtn').show();
    jEl.toggleClass("active");
  }

  sendVideoEvent(eventKind , id) {
    let feedId = 0; // For non-feed video elements.
    if (this.feedId) {
      feedId = this.feedId;
    }

    let data = {
      kind: eventKind,
      payload: {feed_id: feedId, video_id:id}
    };
    socketPixelCall.fireEvent(data);
  }

  report = (videoId) => {
    $.ajax({
      url:'/api/web/report',
      data: { report_entity_kind: 'video', report_entity_id: videoId },
      method: 'POST',
      success: function(res){
        if(res.success){
          $('.toast-report-success').toast('show');
        } else {
          $('.toast-report-error').toast('show');
        }
      },
      error: function (res) {
        $('.toast-report-error').toast('show');
      }
    });
  }


}

export default new Video();
