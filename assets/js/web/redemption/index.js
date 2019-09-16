;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.redemptionPage =  {
    redemptionPagedata : null,
    jBackArrow : $('#backArrowAction'),
    productImgWrapper : $('.product-img'),
    productDetail : $('.product-detail'),

    currentProductId : null,

    init : function (data) {
      oThis.redemptionPagedata = data;
      oThis.productClick();
      
      $("#requestRedemption").on('click', function () {
        oThis.requestAction();
      });

      oThis.jBackArrow.on('click', function () {
       $(this).hide();
       oThis.productDetail.hide();
       $('.products').show();
       $('.redemption-message').hide();
      });
    },

    productClick: function () {
      oThis.productImgWrapper.on('click', function(){
        oThis.currentProductId = $(this).data("product-id");
        oThis.jBackArrow.show();
        $(this).closest('.products').hide();
        oThis.productDetail.fadeIn('slow');
        oThis.productDetail.find('.landscape-img').attr('src', $(this).data('src'));
      })
    },

    requestAction: function () {
      var requestRoute   = "/api/v1/redemptions";
      var requestMethod  = "POST";
      $.ajax({
        url: requestRoute,
        method: requestMethod,
        data: {"product_id": oThis.currentProductId},
        success: function (response) {
          if ( response.success ) {
            $('#redemptionSuccess').show();
          } else {
            $('#redemptionFailure').show();
          }
        },
        error: function (jqXHR, exception) {
          $('#requestError').show();
        },
      })
    }

  }

})(window,jQuery);