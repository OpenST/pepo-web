;
(function (window , $) {
    var pepo = ns('pepo');

    var twitterRedirectURL;
    
    var oThis = pepo.appleAuth = {
        init : function(){
            oThis.getRequestToken();
        },

        getRequestToken : function(){
            $.ajax({
                type: "GET",
                url: '/api/web/auth/twitter/request_token'
            })
            .then(function(res){
                twitterRedirectURL = res.data && res.data.twitterRedirectUrl;
            })
        },
        
        bindEvents: function(){
            $('#twitter-signin').click(function(e){
                window.location = twitterRedirectURL;
            })
        }
    }

    $(document).ready(function () {
        oThis.init();
        oThis.bindEvents();
    });

})(window, jQuery);
