;
(function (window , $) {

  var feedPage = {

    init : function () {
      var oThis = this;

      $('.feedList').on('click',function (e) {
        $('#feedModal').modal('show');
        e.preventDefault();
        e.stopPropagation();
      })

    },

  };

  feedPage.init();

})(window, jQuery);
