import $ from 'jquery';
import  ns from "../src/libs/namespace";

class WebView {
  
  sanitizeUrl = ( url ) => {
    if( url.indexOf('lerr') !== -1) {
      url = url.replace(/(\?|&)+lerr=1/gi, ' ');
    }
    return url;
  };
  
  init =(params)=> {
      let data = JSON.parse(params.oAuthData),
        kind = params.oAuthKind,
        redirectUrl = this.sanitizeUrl(params.redirectUrl);
      if(!data || !redirectUrl) return;
      $.ajax({
        url:`/api/web/auth/${kind}/login`,
        method:'POST',
        data: data,
        success:function (res) {
          window.location = redirectUrl;
          console.log("success redirect ajax", JSON.stringify(res));
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
  }
}

const pepo = ns("pepo");
pepo.webView = new WebView();

export default pepo.webView;
