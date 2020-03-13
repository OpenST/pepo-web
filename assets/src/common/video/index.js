import $ from 'jquery';
import BasicHelper from '../../helpers/basic'
import socketPixelCall from "../../services/SocketPixelCall";

const LOG_TAG = 'PepoVideo';

const VIDEO_PLAY_START_EVENT_NAME = "video_play_start";
const VIDEO_PLAY_END_EVENT_NAME = "video_play_end";

class Video {
  
  init = () => {
    this.bindEvents();
  };

  bindEvents = () => {
    $(".reportVideo").on('click', function (e) {
      $('#reportModal').modal('show');
      e.stopPropagation();
    });


    $('.actionButtonsWeb .downloadApp, .channel-list.web .downloadApp').on('click', function () {
      $('#downloadModal').modal('show');
    });

    $('.actionButtonsMobile .downloadApp, .channel-list.mobile .downloadApp').on('click', function (e) {
      $('#downloadModalSingleCTA').modal('show');
      e.stopPropagation();
    });

    $(".report-title").on('click', function (e) {
      $('#reportModal').modal('hide');
      let videoId = $(".videoContainer").data('video-id');
      this.report(videoId);
      e.stopPropagation();
    });

    $(".copyToClipboard").on('click', function (e) {
      var textToCopy = $(".copyToClipboard").data('share-url');
      var isCopied = BasicHelper.copyToClipboard(textToCopy);
      if(isCopied){
        $('.toast-copied-to-clipboard').toast('show');
      } else {
        $('.toast-copied-to-clipboard-failed').toast('show');
      }
      e.stopPropagation();
    });

    $('.video-container-wrapper').on('click', function(e){
      let ctrlVideo = $(this).find('video.pepoVideo')[0];
      if($(this).hasClass("active")){
        ctrlVideo.play();
        $(this).find('.ppBtn').hide();
        $(this).toggleClass("active");
      } else {
        ctrlVideo.pause();
        $(this).find('.ppBtn').show();
        $(this).toggleClass("active");
      }
    });

    //video events
    const oThis = this;
    this.videoId = $(".videoContainer").data('video-id');

    $('.pepoVideo').on('play', function(e){
      if (!this.videoStarted) {
        this.videoStarted = true;
        oThis.sendFeedVideoEvent(VIDEO_PLAY_START_EVENT_NAME);
        console.log(LOG_TAG, 'Video Started');
      }
    }).on('canplaythrough', function(e){
      if (!this.videoEnded) {
        this.videoEnded = true;
        oThis.sendFeedVideoEvent(VIDEO_PLAY_END_EVENT_NAME);
        console.log(LOG_TAG, 'Video Ended');
      }
    });
  };

  sendFeedVideoEvent(eventKind) {
    let feedId = 0; // For non-feed video elements.
    if (this.feedId) {
      feedId = this.feedId;
    }

    let data = {
      kind: eventKind,
      payload: {feed_id: feedId, video_id: this.videoId}
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
