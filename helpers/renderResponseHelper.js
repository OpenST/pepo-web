const rootPrefix = "../";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider"),
      coreConstants = require(rootPrefix + '/config/coreConstants');

class ResponseRenderer {

  getPageMeta( contentPartialPath ) {
    return pageMetaProvider(contentPartialPath);
  }

  validateCsrfToken(request, layout, locals){
    if(layout == 'login'){
      return;
    }
    this.populateCSRFToken(request, locals);
  }

  renderWithLayout(request, response, layout, contentPartialPath, locals, callback) {
    locals = locals || {};
    this.validateCsrfToken(request, layout, locals);

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

    response.render(layout, locals, callback);
  }

  populateCSRFToken(request, locals) {
    locals._CSRFToken = request.csrfToken();
  }
}


module.exports = new ResponseRenderer();
