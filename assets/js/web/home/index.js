;
(function (window , $) {

    var homePage = {

        init : function () {

        }

    };

    homePage.init();

    $(window).on('load', function () {
      $('video').each(function () {
        var videoUrl = $(this).data('src');
        if (videoUrl) {
          $(this).attr('src', videoUrl);
        }
      });
    });

})(window, jQuery);
