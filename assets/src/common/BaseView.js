import CurrentUser from "../../src/model/CurrentUser" ;
import  BrowserSdk from "../../src/libs/browserSdk";
import SocketManager from "../../src/services/SocketManager";
import deepGet from 'lodash/get';

class BaseView {

  constructor( config ){
    if(typeof config.apiResponse == "string"){
      config.apiResponse =  JSON.parse( config.apiResponse );
    }
    if(typeof config.appMeta == "string"){
      config.appMeta =  JSON.parse( config.appMeta );
    }
    this.config = config;
    if(!this.config) return;
    this.initCurrentUser( config.apiResponse );
    this.initDataStore( config.apiResponse  );
    this.initSdk(config.appMeta);
    this.initPixelDrop(config.appMeta);

    $(document).ready(() => {
      this.initSocket();
    });
  }


  initCurrentUser(apiResponse={}){
    CurrentUser.initUser(apiResponse["current_user_data"]);
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
