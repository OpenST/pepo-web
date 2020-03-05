const { $ } = window;

class TwitterAuth{

    constructor(){
        this.twitterRedirectURL = '';
    }
    
    init = () => {
        this.bindEvents();
    }

  disableLoginBtns = () =>{
    $('.loginBtn').click(false);
  }

  enableLoginBtns = () =>{
    $('.loginBtn').click(false);
  }


  getRedirectUrl = () => {
        $.ajax({
            type: "GET",
            url: '/api/web/auth/twitter/request-token'
        }).then(
          ( response ) =>{
            this.enableLoginBtns();
              if(response && response.success){
                this.storeCurrentURL();
                let authUrl = response && response.data && response.data.redirect_url;
                authUrl = authUrl + '&state='+window.location;
                window.location = authUrl;
              }
          },
          ( error ) => {
            this.enableLoginBtns();
            console.log(" *** error *** ",error);
          }
        )
    }

  bindEvents = () => {
        $('#twitter-signin').click((e)=>{
          this.disableLoginBtns()
          this.getRedirectUrl();
        })
    }

  storeCurrentURL = () =>{
        document.cookie = "state="+window.location;
  }

    logout = () => {
        $.ajax({
            url: '/auth/twitter-disconnect',
            type: "POST",
            success: () => {
               console.log("logged out");
            }
        });
    }
}
export default new TwitterAuth();

