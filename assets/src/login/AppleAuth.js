const { $ } = window;
const  APPLE_CLIENT_ID = 'com.pepo.staging.signin';
const APPLE_REDIRECT_URL = 'http://pepodev.com/connect/apple/oauth';

class AppleAuth{
    
        init = () => {

            $.getScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', () => {
                console.log('script loaded');
                AppleID.auth.init({
                    clientId : APPLE_CLIENT_ID,
                    scope : 'email name',
                    redirectURI : APPLE_REDIRECT_URL,
                    state : 'some string',
                    responseMode : 'form_post'
                });  
                this.bindEvents();              
            });

        }
        
        bindEvents= () =>{
            $('#apple-signin').click(function(e){
                try {
                    AppleID.auth.signIn().then(function(res){
                      console.log(res);
                    })
                    .catch(function(e){
                      console.log(e);
                    })
                } catch ( error ) {
                    console.log(error);
                }
              })
        }
    }

export default new AppleAuth();
