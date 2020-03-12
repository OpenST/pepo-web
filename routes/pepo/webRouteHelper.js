const rootPrefix = "../..";

// All Requires
const UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  renderResponseHelper = require(rootPrefix + '/helpers/renderResponseHelper'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie'),
  CurrentUser = require(rootPrefix + '/lib/model/CurrentUser');

  class webRouteHelper {

  /**
   *
   * @param request
   * @param response
   * @param layout
   * @param contentPartialPath
   * @param locals
   * @param callback
   */
  async perform(request, response, layout, contentPartialPath, locals, callback) {
    const oThis = this;

    locals = locals || {};
    locals.apiResponseData = locals.apiResponseData || {};

    console.log('==111111========locals====-===================', locals);

    if(!locals.apiResponseData.current_user_data && request.headers && cookieConstants.hasWebLoginCookie(request.headers['cookie'])){
      let currentUserData = await oThis.getCurrentUserData(request);
      if(currentUserData.data){
        locals.apiResponseData.current_user_data = currentUserData.data;
      }
    }
    console.log('==222222========locals====-===================', locals);

    let currentUserDetails = locals.apiResponseData && locals.apiResponseData.data
                             && locals.apiResponseData.data.current_user_data;

    console.log('======currentUserDetails/n/n/n', locals.apiResponseData, "/n/n/n", locals.apiResponseData.data,"/n/n/n", locals.apiResponseData.data.current_user_data );

    locals.currentUser = new CurrentUser(currentUserDetails);

    renderResponseHelper.renderWithLayout(request, response, layout, contentPartialPath, locals, callback);

  }

  async getCurrentUserData(request) {
    let currentUserResponse = await new UserApi(request.headers).getCurrentUser({});
    console.log('==========currentUserResponse============', currentUserResponse);
    return currentUserResponse;
  }
}


module.exports = new webRouteHelper();
