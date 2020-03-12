const rootPrefix = "../";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider"),
  UserApi = require(rootPrefix + '/lib/pepoApi/User'),
  coreConstants = require(rootPrefix + '/config/coreConstants'),
  cookieConstants = require(rootPrefix + '/lib/globalConstant/cookie');

class ResponseRenderer {

  getPageMeta( contentPartialPath ) {
    return pageMetaProvider(contentPartialPath);
  }

  renderWithLayout(request, response, layout, contentPartialPath, locals, callback) {
    locals = locals || {};
    this.populateCSRFToken(request, locals);

    if ( !locals.pageMeta ) {
      locals.pageMeta = this.getPageMeta( contentPartialPath );
    } else {
      locals.pageMeta = Object.assign({}, this.getPageMeta( contentPartialPath ), locals.pageMeta)
    }

    if ( !locals._contentPartial ) {
      locals._contentPartial = contentPartialPath;
    }

    if ( !locals._environment ) {
      locals._environment = coreConstants.environment;
    }

    if ( !locals.hasOwnProperty('showFooter')) {
      locals.showFooter = true;
    }

    // if(request.headers && cookieConstants.hasWebLoginCookie(request.headers['cookie'])){
    //
    //   locals.current_user_data = currentUserRespdata || {};
    // }

    response.render(layout, locals, callback);
  }

  populateCSRFToken(request, locals) {
    locals._CSRFToken = (typeof request.csrfToken == 'function' ? request.csrfToken() : '');
  }

  async getCurrentUserData(request) {
    let shareResponse = await new UserApi(request.headers).getUserProfileShareDetails({})
  }
}


module.exports = new ResponseRenderer();
