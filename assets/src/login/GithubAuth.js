import qs from 'qs';

const { $ } = window;
const GITHUB_CLIENT_ID = 'dac2bcce562025beaf89';
const GITHUB_REDIRECT_URL = 'http://pepodev.com/connect/github/oauth';
const GITHUB_BASE_URL = 'https://github.com/login/oauth';

class GithubAuth{

    constructor(){
        this.githubRedirectURL = '';
    }
    
    init = () => {
        let params = {
            client_id : GITHUB_CLIENT_ID,
            redirect_uri : GITHUB_REDIRECT_URL,
            scope : 'read:user user:email',
            response_type : 'code'
            };
            let queryParams = qs.stringify(params);
            this.githubRedirectURL = GITHUB_BASE_URL + '/authorize?'+queryParams;
            this.bindEvents();
    }
    
    bindEvents= () => {
        $('#github-signin').click((e) => {
            window.location = this.githubRedirectURL;
        })
    }
}
export default new GithubAuth();
