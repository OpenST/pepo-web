const rootPrefix = "../";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider"),
  UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

class ResponseRenderer {

  /**
   *
   * @param contentPartialPath
   * @returns {*}
   */
  getPageMeta( contentPartialPath ) {
    return pageMetaProvider(contentPartialPath);
  }

  /**
   *
   * @param request
   * @param response
   * @param layout
   * @param contentPartialPath
   * @param locals
   * @param callback
   */
  async renderWithLayout(request, response, layout, contentPartialPath, locals, callback) {
    const oThis = this;

    locals = locals || {};
    oThis.populateCSRFToken(request, locals);
    oThis.populateSDKConfig(request, locals);

    if ( !locals.pageMeta ) {
      locals.pageMeta = oThis.getPageMeta( contentPartialPath );
    } else {
      locals.pageMeta = Object.assign({}, oThis.getPageMeta( contentPartialPath ), locals.pageMeta)
    }

    if ( !locals._contentPartial ) {
      locals._contentPartial = contentPartialPath;
    }
    
    if ( !locals._endJSPartial ) {
      locals._endJSPartial = null;
    }

    if ( !locals._environment ) {
      locals._environment = coreConstants.environment;
    }

    if ( !locals.hasOwnProperty('showFooter')) {
      locals.showFooter = true;
    }

    console.log('==111111========locals====-===================', locals);
    if(!locals.current_user_data && request.headers && cookieConstants.hasWebLoginCookie(request.headers['cookie'])){
      let currentUserData = await oThis.getCurrentUserData(request);
      if(currentUserData.data){
        locals.current_user_data = currentUserData.data;
      }
    }
    console.log('==222222========locals====-===================', locals);

    response.render(layout, locals, callback);
  }
  
  populateSDKConfig(request, locals){
    if(locals.skipAppMeta) return;
    locals['appMeta'] = {
      TOKEN_ID : coreConstants.PEPO_TOKEN_ID,
      PLATFORM_API_ENDPOINT : coreConstants.PEPO_PLATFORM_API_ENDPOINT,
      SDK_ENDPOINT: coreConstants.PEPO_SDK_ENDPOINT,
      TRACKER_ENDPOINT: coreConstants.PEPO_TRACKER_ENDPOINT,
      TRACKER_URL: coreConstants.PEPO_TRACKER_URL
    }
  }
  

  populateCSRFToken(request, locals) {
    locals._CSRFToken = (typeof request.csrfToken == 'function' ? request.csrfToken() : '');
  }

  async getCurrentUserData(request) {
    let currentUserResponse = await new UserApi(request.headers).getCurrentUser({});
    console.log('==========currentUserResponse============', currentUserResponse);
    return currentUserResponse;
  }
}


module.exports = new ResponseRenderer();
