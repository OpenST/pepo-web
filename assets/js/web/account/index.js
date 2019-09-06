;
(function (window , $) {

  var accountPage = {

    init : function () {
      accountPage.bindEvents();
      accountPage.twitterForWebsites();
    },

    twitterForWebsites: function(){
      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, "script", "twitter-wjs"));
    },

    bindEvents : function () {

      $('#copyCode').on('click', function (event) {
        var $elem = $(this);
        accountPage.copyToClipboard($elem.data("textToCopy"));
        $elem.tooltip({
          title: 'Code Copied!',
          trigger: 'manual'
        });
        $elem.tooltip('show');
        setTimeout(function(){
          $elem.tooltip('hide');
        }, 1000);
      });
    },

    copyToClipboard: function (string) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(string).select();
      document.execCommand("copy");
      $temp.remove();
    }

  };


  accountPage.init();

})(window, jQuery);