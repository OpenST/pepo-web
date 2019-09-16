;
(function (window,$) {
  var ost = ns('ost');
  var oThis = ost.redemptionPage =  {
    redemptionPagedata : null,

    init : function (data) {
      oThis.redemptionPagedata = data;
      oThis.productClick();
      console.log("redemptionPagedata",oThis.redemptionPagedata)
    },

    productClick: function () {
      var productImg = $('.product-img');
      productImg.on('click', function(){
        var selfContainer = $(this).closest('.products');
        selfContainer.hide();
        $('.product-detail').fadeIn('slow');
      })
    }

  }

})(window,jQuery)