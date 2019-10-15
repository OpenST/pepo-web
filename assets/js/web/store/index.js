;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.storePage =  {

    jBackArrow : $('#backArrowAction'),
    productImgWrapper : $('.product-img'),
    productDetail : $('.product-detail'),
    pricePoint : $('#pricePoint').val(),
    requestRedemptionBtn: $('#requestRedemptionBtn'),
    approvedVideo: $('.approved-video'),
    currentProductId : null,
    currentProductKind: null,
    pollingInterval: 10000,
    maxPollingInterval: 60000,
    requestRoute: "/api/web/redemptions/request",
    pepoCornsPoolingUrl: "/api/web/redemptions/pepocorn-balance",

    init : function () {

      oThis.productClick();
      oThis.backClick();
      oThis.dollarAmountEdit();
      oThis.pepoCornsPooling();
      console.log('-------init------oThis.requestRedemptionBtn-------click');

      oThis.requestRedemptionBtn.off("click.storePage").on('click.storePage', function () {
        console.log('-------------oThis.requestRedemptionBtn-------click');
        $(this).text('Requesting...').prop('disabled', true);
        setTimeout(function () {
          oThis.requestAction();
        }, 1000);
      });

    },

    productClick: function () {
      oThis.productImgWrapper.on('click', function(){
        $(this).closest('.products').hide();
        oThis.productDetail.fadeIn( 400 );
        oThis.productDetail.find('.landscape-img').attr('src', $(this).data('src'));
        oThis.jBackArrow.fadeIn( 400 );
        oThis.currentProductKind = $(this).data("product-kind");
        $('#productKind').text(oThis.currentProductKind.toLowerCase() + " Gift Card");
        oThis.approvedVideo.hide();
        oThis.currentProductId = $(this).data("product-id");
        oThis.dollarAmount = $(this).data("dollar-amount");
        oThis.dollarStep = $(this).data("dollar-step");
        oThis.pepocornPerDollarStep = $(this).data("pepocorn-per-dollar-step");

        $('#usd-amount').attr({
          'data-dollar-step': oThis.dollarStep,
          'data-pepocorn-per-dollar-step': oThis.pepocornPerDollarStep
        });
      })
    },

    backClick: function () {
      oThis.jBackArrow.on('click', function () {
        $(this).hide();
        oThis.productDetail.hide();
        $('.products').fadeIn( 400 );
        oThis.approvedVideo.show();
        $('#productKind').text('');
        $('.landscape-img').attr('src', '');
        $('.redemption-message').hide();
        $('#requestError').hide();
      })
    },

    dollarAmountEdit: function() {
      $("input#usd-amount").on('keyup', function (e) {
        var dollarValue = $(this).val();
        var dollarStep = +$(this).data('dollar-step');
        var pepocornPerDollarStep = +$(this).data('pepocorn-per-dollar-step');
        var pepocorns = Math.floor(dollarValue * pepocornPerDollarStep/dollarStep);

        $('#converted-pepocorns').text(pepocorns);
        $(this).val(dollarValue);
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

    requestAction: function () {
      const dollarAmount = $("#usd-amount").val();
      $.ajax({
        url: oThis.requestRoute,
        method: "POST",
        data: {
          "product_id": oThis.currentProductId,
          "dollar_amount": dollarAmount,
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
  });

})(window,jQuery);
