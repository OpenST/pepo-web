;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.redemptionPage =  {
    redemptionPagedata : null,

    init : function (data) {
      oThis.redemptionPagedata = data;
      oThis.productClick();
      $("#requestRedemption").on('click', function () {
        oThis.requestAction();
      });
      // console.log("redemptionPagedata",oThis.redemptionPagedata)
    },

    productClick: function () {
      var productImg = $('.product-img');
      var productDetail = $('.product-detail');
      productImg.on('click', function(){
        $(this).closest('.products').hide();
        productDetail.fadeIn('slow');
        productDetail.find('.landscape-img').attr('src', $(this).data('src'));
      })
    },

    requestAction: function () {
      var requestRoute   = "/api/v1/redemptions";
      var requestMethod  = "POST";
      $.ajax({
        url: requestRoute,
        method: requestMethod,
        success: function (response) {
          if ( !response || !response.data || !response.data.success ) {

          } else {

          }
        },
        error: function() {

        }
      })
    }

  }

})(window,jQuery);