import $ from 'jquery';

class WebView {

  constructor(){

  }

  init =()=> {
    window.addEventListener("load", function(e){
      $.ajax({
        url:"/api/dummy",
        method:'POST',
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
