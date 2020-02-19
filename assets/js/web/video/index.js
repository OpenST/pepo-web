;
(function (window , $) {

  var videoPage = {

    init : function () {
      var oThis = this;

      $(".reportVideo").on('click', function () {
        $('#reportModal').modal('show');
      });


      $('.downloadAppSingleCTA').on('click', function () {
        $('#downloadModalSingleCTA').modal('show');
      });

      $(".report-title").on('click', function () {
          var videoId = $(".videoContainer").data('video-id');
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
          })
        });

      $(".copyToClipboard").on('click', function () {
        var textToCopy = $(".copyToClipboard").data('share-url');
        var isCopied = oThis.copyToClipboard(textToCopy);
        if(isCopied){
          $('.toast-copied-to-clipboard').toast('show');
        } else {
          $('.toast-copied-to-clipboard-failed').toast('show');
        }
      });
    },

    copyToClipboard : function(str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      try{
        document.execCommand('copy');
      } catch (e) {
        document.body.removeChild(el);
        return 0;
      }
      document.body.removeChild(el);
      return 1;
  },

    playPause: function () {
      var ppBtn = $('.ppBtn');

      ppBtn.on('click', function(e){

        var ppBtn = $(e.target);
        var ctrlVideo = ppBtn.next('video.pepoVideo')[0];

        if(ppBtn.hasClass("active")){
          ctrlVideo.play();
          $('.ppBtn button').html("Pause");
          ppBtn.toggleClass("active");
        } else {
          ctrlVideo.pause();
          $('.ppBtn button').html("Play");
          ppBtn.toggleClass("active");
        }

      });
    }

  };

  videoPage.init();
  videoPage.playPause();

  $(document).ready(function () {
    $('.app-footer').hide();
  });

})(window, jQuery);
