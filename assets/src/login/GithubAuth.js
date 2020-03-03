;
(function (window , $) {
    var pepo = ns('pepo');

    var GITHUB_CLIENT_ID = 'dac2bcce562025beaf89';
    var GITHUB_REDIRECT_URL = 'http://pepodev.com/connect/github/oauth';
    var GITHUB_BASE_URL = 'https://github.com/login/oauth';

    var githubRedirectURL;
    
    var oThis = pepo.appleAuth = {
        init : function(){
            var params = {
                client_id : GITHUB_CLIENT_ID,
                redirect_uri : GITHUB_REDIRECT_URL,
                scope : 'read:user user:email',
                response_type : 'code'
              };
              var queryParams = $.param(params);
              githubRedirectURL = GITHUB_BASE_URL + '/authorize?'+queryParams;
        },
        
        bindEvents: function(){
            $('#github-signin').click(function(e){
               window.location = githubRedirectURL;
            })
        }
    }

    $(document).ready(function () {
        oThis.init();
        oThis.bindEvents();
    });

})(window, jQuery);
