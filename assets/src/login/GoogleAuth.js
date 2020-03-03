const { $ } = window;
const  GOOGLE_CLIENT_ID = '1069543169353-3gmkmqqdc92egbu1dftpug0v3qu72jc5.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URL = 'http://pepodev.com/connect/google/oauth';

class GoogleAuth{
  construtor(){
    this.GoogleAuthObject = null;
  }

  init =()=> {
    try{
      gapi.load('auth2', () => {
        gapi.auth2.init(
          {
            client_id:GOOGLE_CLIENT_ID ,
            scope :"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
            ux_mode:'redirect',
            redirect_uri:GOOGLE_REDIRECT_URL
          }
        ).then((res) => {
          this.GoogleAuthObject = gapi.auth2.getAuthInstance();
          this.bindEvents();
        });
      });
    } catch(e) {
      console.log("Error occurred ", e);
    }

  }

  bindEvents = () =>{
    $('#google-sign-in').on('click',()=> {
      this.GoogleAuthObject.signIn().then((res)=> {

      });
    });
  }
}

export default new GoogleAuth();





