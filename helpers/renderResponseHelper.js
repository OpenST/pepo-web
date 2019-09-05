const rootPrefix = "../";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider");

class ResponseRenderer {

  getPageMeta( contentPartialPath ) {
    return pageMetaProvider(contentPartialPath);
  }

  renderWithLayout(request, response, layout, contentPartialPath, locals, callback) {
    locals = locals || {};
    this.populateCSRFToken(request, locals);

    if ( !locals.pageMeta ) {
      locals.pageMeta = this.getPageMeta( contentPartialPath );
    }

    locals._contentPartial = contentPartialPath;

    response.render(layout, locals, callback);
  }

  populateCSRFToken(request, locals) {
    locals._CSRFToken = request.csrfToken();
  }
}


module.exports = new ResponseRenderer();