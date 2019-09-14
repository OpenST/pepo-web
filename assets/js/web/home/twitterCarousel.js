;
(function(window, $){
  var home = ns('home');
    home.twitter = {};

    home.twitter.carousel = oThis = {
      init: function (data) {

        oThis.initCarousal();
        oThis.handleAchorTag();

      },

      initCarousal: function () {
        $('.twitter-carousel').slick({
          lazyLoad: "anticipated",
          dots: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          centerMode: true,
          speed: 500,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1080,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 576,
              settings: {
                centerMode: false,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
          ]
        });
        var firstSlide = $('.twitter-carousel').slick('slickCurrentSlide');
        $(".slick-slide[data-slick-index='" + firstSlide + "'] .carousel-item .twitter-link").removeClass("disabled");

        $(".twitter-carousel").find("[data-twitter-index='" + firstSlide + "']").addClass("custom-slick-center");

        $('.twitter-carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var tweetText = $(".slick-slide[data-slick-index='" + nextSlide + "'] .carousel-item .hidden-desc").text();

          var jCurrent = $(".twitter-carousel").find("[data-twitter-index='" + currentSlide + "']");
          var jNext = $(".twitter-carousel").find("[data-twitter-index='" + nextSlide + "']");

          console.log(jCurrent);
          console.log(jNext);

          jCurrent.removeClass("custom-slick-center");
          jNext.addClass("custom-slick-center");

          $(".twitter-desc").css({"visibility": "hidden"});
          $(".twitter-desc").removeClass("active");
          $(".twitter-handle").removeClass('active');
          setTimeout(function () {
            $(".twitter-desc").css({"visibility": "visible"});
            $(".twitter-desc").addClass("active");
            $(".twitter-handle").addClass('active');
            $(".twitter-desc .description-text").text(tweetText);
          }, 500);
        });

        $('.twitter-carousel').on('afterChange', function (event, slick, ele) {
          var currentSlide = $('.twitter-carousel').slick('slickCurrentSlide');
          $(".carousel-item .twitter-link").addClass("disabled");
          $(".slick-slide[data-slick-index='" + currentSlide + "'] .carousel-item a").removeClass("disabled");
        });

        $(".twitter-carousel").on("breakpoint", function () {
          oThis.handleAchorTag();
        });


      },

      handleAchorTag: function () {
        $("a.twitter-link").click(function (e) {
          if ($(e.currentTarget).hasClass("disabled")) {
            e.preventDefault();
          }
        })
      }

    };

    home.twitter.carousel.init();

})(window, jQuery);