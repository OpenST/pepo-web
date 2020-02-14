;
(function (window , $) {

    var homePage = {

        init : function () {

          $("#toggle-menu").click(function(){
            $(this).toggleClass("is-active");
          });

          $('#downloadApp').click(function () {
            $('#downloadModal').modal('show');
          })
        }

    };

    homePage.init();

})(window, jQuery);
