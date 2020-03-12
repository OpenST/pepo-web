class CurrentUser {
    constructor(params){
        console.log("======current user", params);
        this.apiData = params;
        this.initUser();
    }

    initUser(){
      let user = this.apiData && this.apiData.logged_in_user,
          userDetails = this.apiData && this.apiData.users;
      if(!user || !userDetails) return;
      this.user = Object.assign({}, user, userDetails[user.id]);
    }

    _getUser(){
        return this.user;
    }

    _getUserImage(){
        return this.apiData && this.apiData.images;
    }

    isLoggedIn(){
        return !!this._getUser();
    }

    getUserName(){
        var user = this._getUser();
        if(!user) return;

        return user.name;
    }

    getUserProfileImage(){
        var user = this._getUser();
        if(!user) return;

        var profileImageId = user.profile_image_id,
            userImage = this._getUserImage(),
            image = userImage && userImage[profileImageId];
        return image && image.resolutions &&
                 image.resolutions['144w'] && image.resolutions['144w'].url;
    }

    getLoginType(){
        return this.apiData && this.apiData.meta && this.apiData.meta.service_type;
    }

}

module.exports = CurrentUser;
