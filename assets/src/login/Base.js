const { $ } = window;

class Base{

    constructor(){}

    init =()=> {
        this.bindEvents();
    }

    bindEvents = () =>{
        let jButtonSelector = this.getButtonSelector();
        if(!jButtonSelector) return;
        $(jButtonSelector).on('click',()=> {
            this.disableLoginBtns();
            this.getRedirectUrl();
        });
    }

    disableLoginBtns = () =>{
        $("#googleSignIn").removeClass().addClass("disableClick");
        $("#twitterSignIn").removeClass().addClass("disableClick");
        $("#githubSignIn").removeClass().addClass("disableClick");
        $("#appleSignIn").removeClass().addClass("disableClick");
    }

    enableLoginBtns = () =>{
        $("#googleSignIn").removeClass().addClass("enableClick");
        $("#twitterSignIn").removeClass().addClass("enableClick");
        $("#githubSignIn").removeClass().addClass("enableClick");
        $("#appleSignIn").removeClass().addClass("enableClick");
    }

    getRedirectUrl = () => {
        let urlEndpoint = this.getUrlEndpoint();
        $.ajax({
            url: urlEndpoint,
            method:'GET',
            success: ( response )=>{
                this.onRedirectSuccess(response);
            },
            error : ( xhr,status,error )=>{
                this.onRedirectError( error );
            },
            complete: ()=>{
                this.onRedirectComplete();
            }
        });
    }

    onRedirectSuccess = ( response ) => {
        if (response && response.success) {
            let resultType = response && response.data && response.data['result_type'],
                redirectUrl = response && response.data && response.data[resultType];
            window.location = redirectUrl && redirectUrl.url;
        }
    }

    onRedirectError = ( error ) => {
        console.log("Redirect error ", error);
    }

    onRedirectComplete = () => {
        this.enableLoginBtns();
    }

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
    }

    getButtonSelector = () => {
        //implement in child
    }

    getUrlEndpoint = () => {
        //implement in child
    }

    getDisconnectUrl = () => {
        //implement in child
    }

}

export default Base;





