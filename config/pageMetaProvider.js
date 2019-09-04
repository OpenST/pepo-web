const rootPrefix = "..";

// All includes/requires go here.
const cloneDeep = require("lodash/cloneDeep"),
      merge = require("lodash/merge"),
      coreConstants = require(rootPrefix + "/config/coreConstants"),
      defaultMeta =  require(rootPrefix + "/config/pageMeta/_default")
;

//TODO: Read all config files from pageMeta folder and process it.
const configs = ["web"];
const meta = {};


/**
 * loadAll - loads all configs.
 */
const loadAll = () => {
  //TODO: Populate allConfigs by reading listing all config files placed in pageMeta folder.
  const allConfigs = configs;
  let len = allConfigs.length;
  while( len-- ) {
    loadPageMeta( allConfigs[ len ] );
  }
};

/**
 * loadPageMeta - loads the page meta for perticular controller.
 * @param  {[String]} controller - name of the json file placed in pageMeta folder.
 */
const loadPageMeta = (controller, pageMeta) => {
  pageMeta = pageMeta || require(rootPrefix + "/config/pageMeta/" + controller + ".json");
  
  // Create a copy of pageMeta.
  pageMeta = cloneDeep(pageMeta);

  // Process Page Meta
  for(let action in pageMeta) {
    if ( !pageMeta.hasOwnProperty( action ) ) { continue; }
    let actionMeta = pageMeta[ action ];
    //1. Create a deep copy of default-meta.
    let finalActionMeta = cloneDeep(defaultMeta);

    //2. Deep merge actionMeta with default-meta.
    merge(finalActionMeta, actionMeta);

    //3. Process CSS & JS assets config.
    processActionMeta(controller, action, finalActionMeta);
    //Finally, Reassign it.
    pageMeta[ action ] = finalActionMeta;
  }

  // Finally, add it meta.
  meta[controller] = pageMeta;
};

const processActionMeta = (controller, action, actionMeta) => {
  processCSSAssetsConfig(controller, action, actionMeta.assets);
  processJSAssetsConfig(controller, action, actionMeta.assets);
};

const processCSSAssetsConfig = ( controller, action, assetsConfig ) => {
  const assetsArrayProp = "css",
        commonProp = "common_css",
        manifestProp = "css_manifest";

  return genericAssetConfigProcessor(controller, action, assetsConfig, assetsArrayProp, commonProp, manifestProp);
};

const processJSAssetsConfig = ( controller, action, assetsConfig ) => {
  const assetsArrayProp = "js",
        commonProp = "common_js",
        manifestProp = "js_manifest";

  return genericAssetConfigProcessor(controller, action, assetsConfig, assetsArrayProp, commonProp, manifestProp);
}

const genericAssetConfigProcessor = (controller, action, assetsConfig, assetsArrayProp, commonProp, manifestProp) => {
  assetsConfig = assetsConfig || {};

  if ( assetsConfig[ assetsArrayProp ] && assetsConfig[ assetsArrayProp ].length ) {
    // Custom CSS array has been defined.
    return;
  }

  let cssArray = [];
  if ( assetsConfig[commonProp] ) {
    cssArray.push("common");
  }

  if ( assetsConfig[ manifestProp ] ) {
    if ( typeof assetsConfig[ manifestProp ] === "string" ) {
      // Full path to manifest has been provided.
      cssArray.push(assetsConfig[ manifestProp ] );
    } else {
      cssArray.push( getDefaultAssetPath(controller, action) );
    }
  }

  assetsConfig[ assetsArrayProp ] = cssArray;  

};

const getDefaultAssetPath = (controller, action) =>{
  controller = controller || "";
  const viewPathSplits = controller.split(".");
  viewPathSplits.push(action);
  return viewPathSplits.join("/");
}

const processViewPath = (viewPath) => {
  const viewPathSplits = viewPath.split("/");
  
  let action = viewPathSplits.pop();
  action = action.replace("_", "");
  action = action.replace(".ejs", "");

  const controller = viewPathSplits.join(".");
  return {
    "action": action,
    "controller": controller
  };
};


// Pre-Process on server boot.
loadAll();

module.exports = ( viewPath ) => {
  viewPath = viewPath || "";
  let processedPath = processViewPath(viewPath),
      controller = processedPath.controller,
      action = processedPath.action,
      controllerMeta = meta[ controller ];

  if ( null == controllerMeta ) {
    // Controller key not found.
    // Create one and cache it.
    controllerMeta = {};
    meta[ controller ] = controllerMeta;
  }

  let actionMeta = controllerMeta[ action ];
  if ( null == actionMeta ) {
    // action key not found. 
    // Create one and cache it.
    actionMeta = cloneDeep(defaultMeta);
    processActionMeta(controller,action, actionMeta);
    controllerMeta[ action ] = actionMeta;
  }

  console.log("controller", controller, "action", action);
  console.log("actionMeta", actionMeta);

  return actionMeta;
};