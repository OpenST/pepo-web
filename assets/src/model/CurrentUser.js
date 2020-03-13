
const LOG_TAG = 'CurrentUser';

class  CurrentUser {

  constructor(){
    this.user = null;
  }

  initUser(apiResponse){

    if (!apiResponse) {
      return;
    }

    const currentUserData = apiResponse.current_user_data;
    if (!currentUserData) {
      return;
    }

    const loggedInUser = currentUserData.logged_in_user;
    if (!loggedInUser) {
      return;
    }

    if (!currentUserData.users) {
      return;
    }

    const loggedInUserData = currentUserData.users[loggedInUser.id];

    if (!loggedInUserData) {
      return;
    }

    this.user = Object.assign({}, loggedInUserData, loggedInUser);

    this.userId = loggedInUser.id;
    
  }

  getUserId() {
    return this.userId;
  }
}

export default  new CurrentUser();
