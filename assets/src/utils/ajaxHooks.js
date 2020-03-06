;
(function(window, $){

  // //Add CSRF TOKEN
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    console.log("options.url ===== ", options.url);
    console.log("options.url.indexOf('http') ===== ", options.url.indexOf('http'));
    console.log("window.location.origin ===== ", window.location.origin);
    console.log("options.url.indexOf(window.location.origin) ===== ", options.url.indexOf(window.location.origin));
    if(options.url.indexOf('http') !== 0 || options.url.indexOf(window.location.origin) !== -1){
      var csrf_token = $("meta[name='csrf-token']").attr("content");
      if ( csrf_token ) {
        jqXHR.setRequestHeader('X-CSRF-Token', csrf_token);
      }

      var is_dev_env = $("meta[name='dev-env']").attr("content");
      if ( is_dev_env ) {
        jqXHR.setRequestHeader('X-DEV-ENV', is_dev_env);
      }
    }
  });

  
  $( window.document ).ajaxError( function( event, jqXHR, settings, thrownError ) { 
    
    var jParent = (jqXHR.ost && jqXHR.ost.jParent ) ? jqXHR.ost.jParent : $("body")
        , msg   = ''
    ;
    if (jqXHR.status === 0) {
      msg = 'Not able to connect to server. Please verify your internet connection.';
    } else if (jqXHR.status == 404) {
      msg = 'Requested page not found.';
    } else if (jqXHR.status == 500) {
      msg = 'Internal Server Error.';
    } else if (jqXHR.status == 401) {
        window.location = '/';
    } else if (thrownError === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (thrownError === 'timeout') {
      msg = 'Time out error.';
    } else if (thrownError === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Unable to connect to server.';
    }

    console.log("ajaxError", arguments, msg);
    if ( msg ) {
      jParent
        .find(".general_error")
        .addClass("is-invalid")
          .text(msg)
      ;      
    } else {
      jParent
        .find('.general_error')
        .removeClass("is-invalid")
          .text(msg || "&nbsp;")
      ;
    }

    return msg;
  });
})(window, jQuery);