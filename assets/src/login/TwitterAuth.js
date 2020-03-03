const { $ } = window;

class TwitterAuth{

    constructor(){
        this.twitterRedirectURL = '';
    }
    
    init = () => {
        this.getRequestToken();
    }

    getRequestToken = () => {
        $.ajax({
            type: "GET",
            url: '/api/web/auth/twitter/request_token',
            success: (res) => {
                this.twitterRedirectURL = res.data && res.data.twitterRedirectUrl;
                this.bindEvents();
            }
        })
    }
    
    bindEvents = () => {
        $('#twitter-signin').click((e)=>{
            window.location = this.twitterRedirectURL;
        })
    }
}
export default new TwitterAuth();

