;
(function (window , $) {

  var videoPage = {

    init : function () {

      $("#toggle-menu").on('click', function(){
        $(this).toggleClass("is-active");
      });

      $('.downloadApp').on('click', function () {
        $('#downloadModal').modal('show');
      });

    },

    playPause: function () {

      var ctrlVideo = document.getElementById("webVideo");
      var ppBtn = $('#ppBtn');

      ppBtn.off('click').on('click', function(){

        if(ppBtn.hasClass("active")){
          ctrlVideo.play();
          $('#ppBtn button').html("Pause");
          ppBtn.toggleClass("active");
        } else {
          ctrlVideo.pause();
          $('#ppBtn button').html("Play");
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
