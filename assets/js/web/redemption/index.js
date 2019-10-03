;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.redemptionPage =  {

    jBackArrow : $('#backArrowAction'),
    productImgWrapper : $('.product-img'),
    productDetail : $('.product-detail'),
    pricePoint : $('#pricePoint').val(),
    requestRedemptionBtn: $('#requestRedemptionBtn'),
    currentProductId : null,
    currentPepoAmountInWei: null,
    currentProductKind: null,

    init : function () {
      $('.app-footer').hide();
      setTimeout(function () {
        oThis.productClick();
      });

      oThis.requestRedemptionBtn.on('click', function () {
        $(this).text('Requesting...').prop('disabled', true);
        setTimeout(function () {
          oThis.requestAction();
        }, 1000);
      });

      oThis.jBackArrow.on('click', function () {
        $(this).hide();
        oThis.productDetail.hide();
        $('.products').fadeIn('slow').show();
        $('.redemption-message').hide();
        $('#requestError').hide();
        oThis.requestRedemptionBtn.show();
        $('.landscape-img').attr('src', '');
        $('#productKind').text('');
      });
    },

    productClick: function () {
      oThis.productImgWrapper.on('click', function(){
        oThis.currentProductId = $(this).data("product-id");
        oThis.currentPepoAmountInWei = $(this).data("pepo-amount-in-wei");
        oThis.currentProductKind = $(this).data("product-kind");
        oThis.jBackArrow.fadeIn('slow').show();
        $(this).closest('.products').hide();
        oThis.productDetail.find('.landscape-img').attr('src', $(this).data('src'));
        oThis.productDetail.fadeIn('slow');
        $('#productKind').text(oThis.currentProductKind.toLowerCase() + " Gift Card");
      })
    },

    requestAction: function () {
      var requestRoute   = "/api/web/redemptions";
      var requestMethod  = "POST";
      $.ajax({
        url: requestRoute,
        method: requestMethod,
        data: {
          "product_id": oThis.currentProductId,
          "price_point": oThis.pricePoint,
          "pepo_amount_in_wei": oThis.currentPepoAmountInWei
        },
        success: function (response) {
          if ( response.success ) {
            $('#redemptionSuccess').show();
            oThis.requestRedemptionBtn.hide();
          } else {
            var errorData = response.err && response.err.error_data ,
                errMsg;
            if( errorData && errorData.length > 0  ) {
              errMsg = errorData[0]['msg'];
            }else {
              errMsg = response.err &&  response.err.msg;
            }
            if(errMsg) {
              $('#redemptionFailure').find('.error-message').text(errMsg);
            }
            $('#redemptionFailure').show();
          }
        },
        error: function (jqXHR, exception) {
          $('#requestError').show().addClass('');
        },
        complete: function (response) {
          oThis.requestRedemptionBtn.text('Request').prop('disabled', false);
        }
      })
    }

  }

})(window,jQuery);
