import CurrentUser from "../../src/model/CurrentUser" ;
import  BrowserSdk from "../../src/libs/browserSdk";
import SocketManager from "../../src/services/SocketManager";

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
    this.initPixelDrop(config.appMeta);

    $(document).ready(() => {
      this.initSocket();
    });
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

  initSocket() {
    SocketManager.init();
  }

}


export default BaseView;
