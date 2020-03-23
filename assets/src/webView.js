const {$} = window;
import  ns from "../src/libs/namespace";

import * as ajaxHooks from './utils/ajaxHooks';

class WebView {
  
  sanitizeUrl = ( url ) => {
    if( url.indexOf('lerr') !== -1) {
      url = url.replace(/(\?|&)+lerr=1/gi, ' ');
    }
    return url;
  };
  
  init =(params)=> {
      if(!params || !params.oAuthData){
        window.location ="/";
        return;
      }
    
      let oThis = this,
          data = JSON.parse(params.oAuthData),
          kind = params.oAuthKind,
          redirectUrl = this.sanitizeUrl(params.redirectUrl);
      if(!data || !redirectUrl) return;
      $.ajax({
        url:`/api/web/auth/${kind}/login`,
        method:'POST',
        data: data,
        success:function (res) {
          if(res && res.success ){
            window.location = redirectUrl;
          }else {
            oThis.onError( res , redirectUrl );
          }
        },
        error : function (err) {
          if(redirectUrl.indexOf('?') !== -1){
            oThis.onError( err , `${redirectUrl}&lerr=1`);
          } else {
            oThis.onError( err , `${redirectUrl}?lerr=1`);
          }
        }
      })
  };
  
  onError = (res, redirectUrl) => {
    let error = "Failed to login please try again later!";
    if(res && res.err && res.err.code == "web_signup_prohibited"){
      error = "Sorry! We have disabled sign up on web for now."
    }
    $(".error-msg").html( error );
    $(".pepo-loading-icon").hide();
    $(".error-block").show();
    $(".navigate-link").off("click.webView").on("click.webView", function (e) {
      window.location = redirectUrl;
    });
  };
  
};

const pepo = ns("pepo");
pepo.webView = new WebView();

export default pepo.webView;
