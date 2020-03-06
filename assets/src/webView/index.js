import $ from 'jquery';

class WebView {

  constructor(){

  }

  init =()=> {
    window.addEventListener("load", function(e){
      let data = JSON.parse(window.oAuthData);
      $.ajax({
        url:"/api/web/google/login",
        method:'POST',
        data: data,
        success:function (res) {
          console.log("success redirect ajax")
        },
        error : function (err) {
          console.log("error redirect ajax")
        }
      })
    });
  }

}

export default new WebView();
