import $ from 'jquery';

class WebView {

  constructor(){

  }

  sanitizeUrl = ( url ) => {
    if( url.indexOf('lerr') !== -1) {
      url = url.replace(/(\?|&)+lerr=1/gi, ' ');
    }
    return url;
  }

  init =()=> {
    window.addEventListener("load", (e) => {
      let data = JSON.parse(window.oAuthData),
          kind = window.oAuthKind,
          redirectUrl = this.sanitizeUrl(window.redirectUrl);
      if(!data || !redirectUrl) return;
      $.ajax({
        url:`/api/web/auth/${kind}/login`,
        method:'POST',
        data: data,
        success:function (res) {
          window.location = redirectUrl;
          console.log("success redirect ajax");
        },
        error : function (err) {
          if(redirectUrl.indexOf('?') !== -1){
            window.location = `${redirectUrl}&lerr=1`;
          } else {
            window.location = `${redirectUrl}?lerr=1`;
          }
          console.log("error redirect ajax");
        }
      })
    });
  }

}

export default new WebView();
