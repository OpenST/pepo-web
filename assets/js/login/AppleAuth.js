;
(function (window , $) {
    var pepo = ns('pepo');

    var APPLE_CLIENT_ID = 'com.pepo.staging.signin';
    var APPLE_REDIRECT_URL = 'http://pepodev.com/webview/apple/oauth';
    
    var oThis = pepo.appleAuth = {
        init : function(){
            try{
                AppleID.auth.init({
                    clientId : 'com.pepo.staging.signin',//loginConstants.APPLE_CLIENT_ID,
                    scope : 'email name',
                    redirectURI : 'http://pepodev.com/connect/apple/oauth',//loginConstants.APPLE_REDIRECT_URL,
                    state : 'some string',
                    responseMode : 'form_post',
                    usePopup: true
                });
            } catch(e) {
                console.log("Error occurred ", e);
            }
        },
        
        bindEvents: function(){
            $('#apple-signin').click(function(e){
                try {
                    AppleID.auth.signIn().then(function(res){
                      console.log(res);
                      // $.ajax({url: "https://stagingpepo.com/api/web/auth/apple/login", success: function(result){
                      //   console.log("success");
                      // }});
                    })
                    .catch(function(e){
                      console.log(e);
                    })
                } catch ( error ) {
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
