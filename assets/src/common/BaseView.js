import CurrentUser from "../../src/model/CurrentUser" ;
import  BrowserSdk from "../../src/libs/browserSdk";

class BaseView {
  
  constructor( config ){
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
    CurrentUser.initUser(data);
  }
  
  
  initDataStore(data){
    //@Mayur
  }
  
  initSdk(config){
    BrowserSdk.init(config);
  }
  
  initPixelDrop(config){
    //@Sharadha
  }

  
}


export default BaseView;