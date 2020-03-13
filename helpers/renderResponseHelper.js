const rootPrefix = "..";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider"),
  coreConstants = require(rootPrefix + '/config/coreConstants');

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

    response.render(layout, locals, callback);
  }
  
  populateSDKConfig(request, locals){
    if(locals.skipAppMeta) return;
    locals['appMeta'] = {
      TOKEN_ID : coreConstants.PEPO_TOKEN_ID,
      PLATFORM_API_ENDPOINT : coreConstants.PEPO_PLATFORM_API_ENDPOINT,
      SDK_ENV: coreConstants.PEPO_SDK_ENV,
      TRACKER_ENDPOINT: coreConstants.PEPO_TRACKER_ENDPOINT,
      TRACKER_URL: coreConstants.PEPO_TRACKER_URL
    }
  }
  

  populateCSRFToken(request, locals) {
    locals._CSRFToken = (typeof request.csrfToken == 'function' ? request.csrfToken() : '');
  }

}


module.exports = new ResponseRenderer();
