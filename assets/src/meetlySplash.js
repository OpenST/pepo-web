$(function() {

  let jEmailSignUp = $('#emailSignUp'),
      jSubscribeWrapper = $('#subscribeWrapper'),
      jMainCopy = $('#mainCopy'),
      jSuccessCopy = $('#successCopy'),
      jEmailError = $('#emailError');

  $('#formSignUp').submit(function( event ) {

    event.preventDefault();

    let email = jEmailSignUp.val().trim();

    if(email === ''){
      jEmailError.text('Email is mandatory');
      return;
    }

    $.ajax({
      url: $(this).attr('action'),
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        email: email
      },
      success: function( response ) {
        if(response.error){
          jEmailError.text(response.error_message.general[0]);
        } else {
          jEmailError.text('');
          jSubscribeWrapper.hide();
          jMainCopy.hide();
          jSuccessCopy.show();
        }
      }
    });
  });

});
