import $ from 'jquery';

class WebView {

  constructor(){

  }

  init =()=> {
    window.addEventListener("load", function(e){
      let data = JSON.parse(window.oAuthData),
          kind = window.oAuthKind;
      if(!data || !window.redirectUrl) return;
      $.ajax({
        url:`/api/web/auth/${kind}/login`,
        method:'POST',
        data: data,
        success:function (res) {
          window.location = window.redirectUrl;
          console.log("success redirect ajax");
        },
        error : function (err) {
          window.location = `${window.redirectUrl}?e=1`;
          console.log("error redirect ajax");
        }
      })
    });
  }

}

export default new WebView();
