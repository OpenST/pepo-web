;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.storePage =  {

    jBackArrow : $('#backArrowAction'),
    productImgWrapper : $('.product-img'),
    productDetail : $('.product-detail'),
    pricePoint : $('#pricePoint').val(),
    requestRedemptionBtn: $('#requestRedemptionBtn'),
    currentProductId : null,
    currentPepoAmountInWei: null,
    currentProductKind: null,
    pollingInterval: 10000,
    maxPollingInterval: 60000,
    requestRoute: "/api/web/redemptions/request",
    pepoCornsPoolingUrl: "/api/web/redemptions/pepocorn-balance",

    init : function () {
      oThis.productClick();
      oThis.pepoCornsPooling();

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
        $('.approved-video').show();
      });
    },

    pepoCornsPooling: function() {

      var startTime = new Date().getTime();

      var interval = setInterval(function(){
        if((new Date().getTime() - startTime) > oThis.maxPollingInterval){
          clearInterval(interval);
          return;
        }
        $.ajax({
          url: oThis.pepoCornsPoolingUrl,
          method: "GET",
          success: function (response) {
            if (response.success) {
              $('#pepoCornBalance').text(response.data.pepocorn_balance.balance)
            }
          }
        })
      }, oThis.pollingInterval);
    },

    productClick: function () {
      oThis.productImgWrapper.on('click', function(){
        oThis.currentProductId = $(this).data("product-id");
        oThis.dollarAmount = $(this).data("dollar-amount");
        oThis.jBackArrow.fadeIn('slow').show();
        $(this).closest('.products').hide();
        oThis.productDetail.find('.landscape-img').attr('src', $(this).data('src'));
        oThis.productDetail.fadeIn('slow');
        $('#productKind').text(oThis.currentProductKind.toLowerCase() + " Gift Card");
        $('.approved-video').hide();
      })
    },

    requestAction: function () {
      $.ajax({
        url: oThis.requestRoute,
        method: "POST",
        data: {
          "product_id": oThis.currentProductId,
          "dollar_amount": oThis.dollarAmount,
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

    };

  $(document).ready(function () {
    $('.app-footer').hide();
    oThis.init();
  });

})(window,jQuery);
