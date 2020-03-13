class  CurrentUser {
 
  constructor(){
    this.user = null;
  }
  
  initUser(currentUserData){
    if(!currentUserData) return ;
    this.user = currentUserData;
  }
  
  _getUser(){
    return this.apiData && this.apiData.logged_in_user;
  }
  
  _getUserDetails(){
    return this.apiData && this.apiData.users;
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
    
    var userId = user.id,
      userDetails = this._getUserDetails();
    return userDetails && userDetails[userId] && userDetails[userId].name;
  }
  
  getUserProfileImage(){
    var user = this._getUser();
    if(!user) return;
    
    var userId = user.id,
      userDetails = this._getUserDetails();
    var profileImageId = userDetails[userId].profile_image_id,
      userImage = this._getUserImage(),
      image = userImage && userImage[profileImageId];
    return image && image.resolutions &&
      image.resolutions['144w'] && image.resolutions['144w'].url;
  }
  
  getLoginType(){
    return this.apiData && this.apiData.meta && this.apiData.meta.service_type;
  }
}
export default  new CurrentUser();