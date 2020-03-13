import CurrentUser from "../../src/model/CurrentUser" ;
import  BrowserSdk from "../../src/libs/browserSdk";
import dataStoreHelper from "../../src/libs/dataStoreHelper";
import  ns from "../../src/libs/namespace";
import SocketManager from "../../src/services/SocketManager";
import deepGet from 'lodash/get';

class BaseView {

  constructor( config ){
    console.log(config.apiResponse,"config.apiResponse");
    console.log(config);
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
    this.initSdk(config.appMeta, config.apiResponse["current_user_data"]);
    this.initPixelDrop(config.appMeta);

    $(document).ready(() => {
      this.initSocket();
    });
  }


  initCurrentUser(apiResponse={}){
    CurrentUser.initUser(apiResponse["current_user_data"]);
  }


  initDataStore(data){
    if(!data) return;
    const pepo = ns("pepo");
    const dataStore = pepo.dataStore || {};
    pepo.dataStore = dataStoreHelper(data, dataStore);
    console.log('pepo.dataStore', pepo.dataStore);
  }

  initSdk(config, params){
    if(!config) return;
    BrowserSdk.init(config, params);
  }

  initPixelDrop(config){
    if(!config) return;
    //@Sharadha
  }

  initSocket() {
    SocketManager.init();
  }

}


export default BaseView;
