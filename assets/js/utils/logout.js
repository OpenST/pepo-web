;
(function (window , $) {
  var ost = ns('ost');
  var logoutRoute   = "/api/web/prelaunch/logout";
  var logoutMethod  = "POST";
  var homeUrl = "stagingpepo.com";

  var oThis = ost.logoutUtil = {
    bind: function() {
      $(".jLogout").unbind('click').bind('click', function () {
        oThis.logout.apply(oThis, arguments);
      });
    },
    logout: function (eventObject) {
      eventObject.preventDefault();
      $.ajax({
        url: logoutRoute,
        method: logoutMethod,
        success: function (response) {
          if ( !response || !response.data || !response.data.success ) {
            oThis.forceLogout();
          } else {
            window.location = homeUrl;
          }
        },
        error: function() {
          oThis.forceLogout();
        }
      })
    },
    forceLogout: function() {
      //1. Delete all cookies.
      var allCookies = Cookies.getJSON(), currCookie;
      for( currCookie in allCookies ) {
        Cookies.remove(currCookie);
      }

      //2. Redirect to home.
      window.location = homeUrl;
    }
  };

  // Auto-Bind
  $( ost.logoutUtil.bind );

})(window, jQuery);
