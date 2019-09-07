;
(function (window , $) {

    var homePage = {

        requestTokenEndpoint: '/api/web/prelaunch/twitter/request_token',

        init : function () {
            homePage.getTwitterRedirectUrl();
        },

        getTwitterRedirectUrl : function () {
            setInterval(function(){
                $.ajax({
                    url: homePage.requestTokenEndpoint,
                    method: "POST",
                    success: function (response) {
                        if (response.success) {
                            $('.twitter-connect').attr("href", response.data.twitterRedirectUrl)
                        }
                    }
                })
            }, 180000);
        }

    };

    homePage.init();

})(window, jQuery);
