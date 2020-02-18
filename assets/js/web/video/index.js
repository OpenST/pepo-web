;
(function (window , $) {

  var videoPage = {

    init : function () {

      $("#toggle-menu").on('click', function(){
        $(this).toggleClass("is-active");
      });

      $('.downloadApp').on('click', function () {
        $('#downloadModal').modal('show');
      })
    }

  };

  videoPage.init();

  $(document).ready(function () {
    $('.app-footer').hide();
  });

})(window, jQuery);
