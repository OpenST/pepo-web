const { $ } = window;

class GoogleAuth{

  init =()=> {
    this.bindEvents();
  }

  bindEvents = () =>{
    $('#google-sign-in').on('click',()=> {
      this.disableLoginBtns()
      this.getRedirectUrl();
      });
  }
  disableLoginBtns = () =>{
    $('.loginBtn').click(false);
  }

  enableLoginBtns = () =>{
    $('.loginBtn').click(false);
  }

  getRedirectUrl= () =>{
    $.ajax({
      url:'/api/web/auth/google/request-token',
      method:'GET'
    }).then(
      /* success callback */
      ( response )=>{
        this.onSuccess(response);
      },
      /* error callback */
      ( error )=>{
       this.onError( error );
      }

    );
  }

  onSuccess =( response )=> {
    this.enableLoginBtns();
    if (response && response.success) {
      console.log("*** sucesss", response);
      let authUrl = response && response.data && response.data.redirect_url;
      authUrl = authUrl + '&state=' + window.location;
      window.location = authUrl;
    }
  }

  onError =( error )=> {
    this.enableLoginBtns();
    console.log("*** error *** ");
  }

  logout = () => {
    $.ajax({
        url: '/auth/google-disconnect',
        type: "POST",
        success: () => {
           console.log("logged out");
        }
    });
}
}

export default new GoogleAuth();





