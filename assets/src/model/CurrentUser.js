
const LOG_TAG = 'CurrentUser';

class  CurrentUser {

  constructor(){
    this.user = null;
    this.meta = null;
  }

  initUser(currentUserData) {
    console.log(LOG_TAG, currentUserData);

    if (!currentUserData) {
      console.warn(LOG_TAG, "CurrentUserData is null");
      return;
    }

    const loggedInUser = currentUserData.logged_in_user;
    if (!loggedInUser) {
      console.warn(LOG_TAG, "LoggedInUser is null");
      return;
    }

    if (!currentUserData.users) {
      console.warn(LOG_TAG, "Users are null");
      return;
    }

    const loggedInUserData = currentUserData.users[loggedInUser.id];

    if (!loggedInUserData) {
      console.warn(LOG_TAG, "LoggedInUserData is null");
      return;
    }

    this.user = Object.assign({}, loggedInUserData, loggedInUser);
    
    this.meta = currentUserData.meta || {};

    this.userId = loggedInUser.id;
    
  };

  getUserId(){
    return this.userId;
  };
  
  getLoginType(){
    return this.meta.service_type;
  };
}

export default new CurrentUser();
