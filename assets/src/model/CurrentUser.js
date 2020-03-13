
const LOG_TAG = 'CurrentUser';

class  CurrentUser {

  constructor(){
    this.user = null;
  }

  initUser(apiResponse){
    console.debug(LOG_TAG, apiResponse);

    if (!apiResponse) {
      console.error(LOG_TAG, "ApiResponse is null");
      return;
    }

    const currentUserData = apiResponse.current_user_data;
    if (!currentUserData) {
      console.error(LOG_TAG, "CurrentUserData is null");
      return;
    }

    const loggedInUser = currentUserData.logged_in_user;
    if (!loggedInUser) {
      console.error(LOG_TAG, "LoggedInUser is null");
      return;
    }

    if (!currentUserData.users) {
      console.error(LOG_TAG, "Users are null");
      return;
    }

    const loggedInUserData = currentUserData.users[loggedInUser.id];

    if (!loggedInUserData) {
      console.error(LOG_TAG, "LoggedInUserData is null");
      return;
    }

    this.user = Object.assign({}, loggedInUserData, loggedInUser);

    this.userId = loggedInUser.id;

    console.log('CurrentUser', this.user);
  }

  getUserId() {
    return this.userId;
  }
}

export default  new CurrentUser();
