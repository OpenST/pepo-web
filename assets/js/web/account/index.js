;
(function (window , $) {

  var accountPage = {

    applyEndpoint: '/api/web/prelaunch/creator',

    init : function () {
      accountPage.bindEvents();
      accountPage.twitterForWebsites();
      accountPage.initFormHelper();
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
      
      $('#applyNow').on('click', function (event) {
        $.ajax({
          url: accountPage.applyEndpoint,
          method: "POST",
          success: function (response) {
            if (response.success) {
              $('#applyNow').hide();
              $('#applySuccess').show()
            } else {
              $('#applyError').show();
            }
          },
          error: function (jqXHR, exception) {
            $('#applyError').show();
          },
        })
      });
      
    },

    copyToClipboard: function (string) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(string).select();
      document.execCommand("copy");
      $temp.remove();
    },

    initFormHelper: function () {
      var jForm = $("#jEmailCapture") ;
      jForm.formHelper({
        success: function(res){
          if(res && res.success){
            $(".jEmailCaptureSuccess").show();
          }
        }
      })
    }


  };


  accountPage.init();

})(window, jQuery);