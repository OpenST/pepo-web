;
(function (window , $) {

    var homePage = {

        init : function () {

          $("#toggle-menu").on('click', function(){
            $(this).toggleClass("is-active");
          });

          $('.downloadApp').on('click', function () {
            $('#downloadModal').modal('show');
          })
        }

    };

    homePage.init();

    // $(document).ready(function () {
    //   $('video').each(function () {
    //     $(this).attr('src', $(this).data('src'));
    //   });
    // });

    $(window).on('load', function () {
      $('video').each(function () {
        var videoUrl = $(this).data('src');
        if (videoUrl) {
          $(this).attr('src', videoUrl);
        }
      });
    });

})(window, jQuery);
