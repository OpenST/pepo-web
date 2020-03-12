import CurrentUser from "../../src/model/CurrentUser" ;
import  BrowserSdk from "../../src/libs/browserSdk";
import dataStoreHelper from "../../src/libs/dataStoreHelper";
import  ns from "../../src/libs/namespace";
class BaseView {
  
  constructor( config ){
    console.log(config.apiResponse,"config.apiResponse");
    if(typeof config.apiResponse == "string"){
      config.apiResponse =  JSON.parse( config.apiResponse );
    }
    if(typeof config.appMeta == "string"){
      config.appMeta =  JSON.parse( config.appMeta );
    }
    this.config = config;
    this.initCurrentUser( config.apiResponse );
    this.initDataStore( config.apiResponse  );
    this.initSdk(config.appMeta);
    this.initPixelDrop(config.appMeta)
  }
  
  
  initCurrentUser(data){
    if(!data) return;
    CurrentUser.initUser(data);
  }

  
  initDataStore(data){
    if(!data) return;
    const pepo = ns("pepo");
    const dataStore = pepo.dataStore || {};
    pepo.dataStore = dataStoreHelper(data, dataStore);
    console.log('pepo.dataStore', pepo.dataStore);
  }
  
  initSdk(config){
    if(!config) return;
    BrowserSdk.init(config);
  }

  initPixelDrop(config){
    if(!config) return;
    //@Sharadha
  }


}


export default BaseView;
