;
(function (window, $) {
  var oThis = {

    jBackArrow: $('#backArrowAction'),
    productImgWrapper: $('.product-img'),
    productDetail: $('.product-detail'),
    pricePoint: $('#pricePoint').val(),
    requestRedemptionBtn: $('#requestRedemptionBtn'),
    approvedVideo: $('.approved-video'),
    currentProductId: null,
    currentProductKind: null,
    prodDescription: null,
    pollingInterval: 10000,
    maxPollingInterval: 60000,
    requestRoute: "/api/web/redemptions/request",
    pepoCornsPoolingUrl: "/api/web/redemptions/pepocorn-balance",

    init: function () {

      oThis.productClick();
      oThis.backClick();
      oThis.dollarAmountEdit();
      oThis.pepoCornsPooling();

      oThis.requestRedemptionBtn.off("click.storePage").on('click.storePage', function () {
        $(this).text('Requesting...').prop('disabled', true);
        setTimeout(function () {
          oThis.requestAction();
        }, 1000);
      });

    },

    productClick: function () {
      oThis.productImgWrapper.on('click', function () {
        $(this).closest('.products').hide();
        oThis.productDetail.fadeIn(400);
        oThis.productDetail.find('.landscape-img').attr('src', $(this).data('src'));
        oThis.jBackArrow.fadeIn(400);
        oThis.currentProductKind = $(this).data("product-kind");
        var prodDescMarkup = $(this).parent().find(".description-markup").html();
        $('#productKind').text(oThis.currentProductKind.toLowerCase() + " Gift Card");
        $('#prodDescription').html(prodDescMarkup);
        oThis.approvedVideo.hide();
        oThis.currentProductId = $(this).data("product-id");
        oThis.dollarAmount = $(this).data("dollar-amount");
        oThis.minDollarValue = $(this).data("min-dollar-value");
        oThis.maxDollarValue = $(this).data("max-dollar-value");

        $("#usd-amount").val(oThis.dollarAmount);

        oThis.pepocornPerDollar = $(this).data("pepocorn-per-dollar");

        var pepocorns = Math.floor(oThis.dollarAmount * oThis.pepocornPerDollar);
        $("#converted-pepocorns").text(pepocorns);

        $('#requestSection').show();
        $('#usd-amount').attr({
          'data-pepocorn-per-dollar': oThis.pepocornPerDollar
        });

        if(oThis.minDollarValue === oThis.maxDollarValue ){
          $('#usd-amount').attr('disabled', true);
          $('.input-group-text').css({'background-color': '#e9ecef'});
        }
      })
    },

    backClick: function () {
      oThis.jBackArrow.on('click', function () {
        $(this).hide();
        oThis.productDetail.hide();
        $('.products').fadeIn(400);
        oThis.approvedVideo.show();
        $('#productKind').text('');
        $('#prodDescription').text('');
        $('.landscape-img').attr('src', '');
        $('.redemption-message').hide();
        $('#requestError').hide();
        $('#usd-amount').attr('disabled', false);
        $('.input-group-text').removeAttr('style');
      })
    },

    dollarAmountEdit: function () {
      var blackListedKeys = [".", ",", " "];
      $("input#usd-amount").on('keyup', function (e) {
        var dollarValue = $(this).val();
        dollarValue = Math.floor(dollarValue);
        var pepocornPerDollar = +$(this).data('pepocorn-per-dollar');
        var pepocorns = Math.floor(dollarValue * pepocornPerDollar);
        $('#converted-pepocorns').text(pepocorns);
      });

      $("input#usd-amount").on('keydown', function (e) {
        if (blackListedKeys.indexOf(e.key) != -1) {
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
      });
    },

    pepoCornsPooling: function () {

      var startTime = new Date().getTime();

      var interval = setInterval(function () {
        if ((new Date().getTime() - startTime) > oThis.maxPollingInterval) {
          clearInterval(interval);
          return;
        }
        oThis.fetchBalanceRequest()
      }, oThis.pollingInterval);
    },

    fetchBalanceRequest: function () {
      $.ajax({
        url: oThis.pepoCornsPoolingUrl,
        method: "GET",
        success: function (response) {
          if (response.success) {
            var val = numeral(response.data.pepocorn_balance.balance).format("0[.]00", Math.floor);
            $('#pepoCornBalance').text(val);
            $('#dollarBalance').text(val);
          }
        }
      })
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
          if (response.success) {
            $('#redemptionSuccess').show();
            $('#requestSection').hide();
            $('#redemptionFailure').hide();
            $("html, body").animate({scrollTop: $(document).height()}, 1000);
          } else {
            var errorData = response.err && response.err.error_data,
              errMsg;
            if (errorData && errorData.length > 0) {
              errMsg = errorData[0]['msg'];
            } else {
              errMsg = response.err && response.err.msg;
            }
            if (errMsg) {
              $('#redemptionFailure').find('.error-message').text(errMsg);
            }
            $('#redemptionFailure').show();
            $("html, body").animate({scrollTop: $(document).height()}, 1000);
          }
        },
        error: function (jqXHR, exception) {
          $('#requestError').show().addClass('');
          $("html, body").animate({scrollTop: $(document).height()}, 1000);
        },
        complete: function (response) {
          oThis.fetchBalanceRequest();
          oThis.requestRedemptionBtn.text('Request').prop('disabled', false);
        }
      })
    }

  };

  $(document).ready(function () {
    $('.app-footer').hide();
    oThis.init();
  });

})(window, jQuery);
