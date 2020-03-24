const { $ } = window;

class Base{

    constructor(){
        this.isGettingRedirectXhr = false;
    }

    init =()=> {
        this.bindEvents();
    }

    bindEvents = () =>{
        let jButtonSelector = this.getButtonSelector();
        if(!jButtonSelector) return;
        $(jButtonSelector).on('click',()=> {
            if(this.isGettingRedirectXhr) return;
            this.disableLoginBtns();
            this.getRedirectUrl();
        });
    };

    disableLoginBtns = () =>{
        $("#googleSignIn").addClass("disableClick");
        $("#twitterSignIn").addClass("disableClick");
        $("#githubSignIn").addClass("disableClick");
        $("#appleSignIn").addClass("disableClick");
    };

    enableLoginBtns = () =>{
        $("#googleSignIn").removeClass("disableClick");
        $("#twitterSignIn").removeClass("disableClick");
        $("#githubSignIn").removeClass("disableClick");
        $("#appleSignIn").removeClass("disableClick");
    };

    getRedirectUrl = () => {
        let urlEndpoint = this.getUrlEndpoint();
        this.isGettingRedirectXhr = true;
        $.ajax({
            url: urlEndpoint,
            method:'GET',
            success: ( response )=>{
                this.onRedirectSuccess(response);
            },
            error : ( xhr,status,error )=>{
                this.onRedirectError( error );
            }
        });
    };

    onRedirectSuccess = ( response ) => {
        if (response && response.success) {
            let resultType = response && response.data && response.data['result_type'],
                redirectUrl = response && response.data && response.data[resultType];
            window.location = redirectUrl && redirectUrl.url;
        }else {
            this.onRedirectError(response)
        }
    };

    onRedirectError = ( error ) => {
      this.isGettingRedirectXhr =false;
      this.enableLoginBtns();
    };
    
    logout = () => {
        $.ajax({
            url: this.getDisconnectUrl(),
            type: "POST",
            success: (result) => {
                location.reload();
                console.log("Log out success ", result);
            },
            error: (xhr,status,error) => {
                console.log("logged out error", error);
            }
        });
    };

    getButtonSelector = () => {
        //implement in child
    };

    getUrlEndpoint = () => {
        //implement in child
    };

    getDisconnectUrl = () => {
        //implement in child
    }

}

export default Base;





