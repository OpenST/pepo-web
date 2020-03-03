;
(function (window , $) {
  var pepo = ns('pepo');

  var GOOGLE_CLIENT_ID = "1069543169353-3gmkmqqdc92egbu1dftpug0v3qu72jc5.apps.googleusercontent.com";
  var GOOGLE_REDIRECT_URL = "http://pepodev.com/connect/google/oauth";

  var oThis = pepo.googleAuth = {
    GoogleAuth : null,
    init : function(){
      try{
        gapi.load('auth2', () => {
          gapi.auth2.init(
            { client_id:GOOGLE_CLIENT_ID ,
              scope :"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
              ux_mode:'redirect',
              redirect_uri:GOOGLE_REDIRECT_URL
            }
          ).then((res) => {
            console.log("init done",res);
            oThis.GoogleAuth = gapi.auth2.getAuthInstance();
            });
        });
      } catch(e) {
        console.log("Error occurred ", e);
      }
    },

    bindEvents: function(){

      $('#google-sign-in').on('click',function (e) {
        try{
          oThis.GoogleAuth.signIn().then(function (res) {
            console.log("google response", res);
          }).catch(function(e){
            console.log(e);
          })
        }
        catch(error){
          console.log(error);
        }

      })
    }
  }

  $(document).ready(function () {
    oThis.init();
    oThis.bindEvents();
  });

})(window, jQuery);