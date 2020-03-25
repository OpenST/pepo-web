const {$} = window;
import Fingerprint from 'fingerprintjs';
import CurrentUser from "../model/CurrentUser" ;
import {setDataStore} from "../model/DataStore";
import SocketManager from "../../src/services/SocketManager";
import appleAuth from "../login/AppleAuth";
import googleAuth from "../login/GoogleAuth";
import navBar from "./navBar";
import twitterAuth from "../login/TwitterAuth";

window.Fingerprint = Fingerprint; // This has to be before importing ajaxHooks;
import * as ajaxHooks from '../utils/ajaxHooks';

class BaseView {

  constructor( config ){

    if(typeof config.apiResponse == "string"){
      config.apiResponse =  JSON.parse( config.apiResponse );
    }
    if(typeof config.appMeta == "string"){
      config.appMeta =  JSON.parse( config.appMeta );
    }
    this.config = config;
    if(!this.config ) return;
    this.initCurrentUser( config.apiResponse );
    this.initDataStore( config.apiResponse  );
    this.initSocket();
    this.initLogin();
    return;
    this.initSdk(config.appMeta, config.apiResponse["current_user_data"]);
    this.initPixelDrop(config.appMeta);
  }

  initLogin (){
    navBar.init();
    appleAuth.init();
    twitterAuth.init();
    googleAuth.init();
    $(window).on('resize scroll', () => {
      navBar.fixedNavBarMenu();
    });
  }

  initCurrentUser(apiResponse={}){
    CurrentUser.initUser(apiResponse["current_user_data"]);
  }


  initDataStore(data){
    if(!data) return;
    setDataStore(data);
  }

  initSocket() {
    SocketManager.init();
  }

  initSdk(config, params){
    if(!config) return;
    //BrowserSdk.init(config, params);
  }

  initPixelDrop(config){
    if(!config) return;
    //@Sharadha
  }



}


export default BaseView;
