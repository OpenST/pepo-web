class CurrentUser {
    constructor(params){
        this.user = params.logged_in_user || {};
    }

    getUser(){
        return this.user;
    }

    isLoggedIn(){
        return !!this.user;
    }

    getUserName(){

    }
}

module.exports = CurrentUser;