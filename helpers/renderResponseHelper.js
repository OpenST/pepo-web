const rootPrefix = "../";

// All Requires
const pageMetaProvider = require(rootPrefix + "/config/pageMetaProvider");

class ResponseRenderer {

  getPageMeta( contentPartialPath ) {
    return pageMetaProvider(contentPartialPath);
  }

  renderWithLayout(response, layout, contentPartialPath, locals, callback) {
    locals = locals || {};
    if ( !locals.pageMeta ) {
      locals.pageMeta = this.getPageMeta( contentPartialPath );
    }

    locals._contentPartial = contentPartialPath;

    response.render(layout, locals, callback);
  }
}


module.exports = new ResponseRenderer();