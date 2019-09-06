;
(function (window , $) {

  var smoothScroll = {

    init : function () {
      smoothScroll.bindEvents();
    },

    bindEvents : function () {

      $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800);
        }
      });

    },

  };


  smoothScroll.init();

})(window, jQuery);