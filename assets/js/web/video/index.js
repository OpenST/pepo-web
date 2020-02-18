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

      $('#ppBtn').off('click').on('click', function(){

        if($('#ppBtn').hasClass("active")){
          console.log('Heyy---- hasactive true');
          ctrlVideo.play();

          $('#ppBtn').html("Pause");
          $('#ppBtn').toggleClass("active");
        } else {
          console.log('Heyy---- hasactive false');
          ctrlVideo.pause();

          $('#ppBtn').html("play");
          $('#ppBtn').toggleClass("active");
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
