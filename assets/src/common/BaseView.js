import zoomMeeting from "../helpers/ZoomMeeting";

const {$} = window;
import CurrentUser from "../model/CurrentUser" ;
import {setDataStore} from "../model/DataStore";
import SocketManager from "../../src/services/SocketManager";
import appleAuth from "../login/AppleAuth";
import googleAuth from "../login/GoogleAuth";
import navBar from "./navBar";
import twitterAuth from "../login/TwitterAuth";

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
    this.bindCommonEvents();
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

  bindCommonEvents() {
    //For zoom meeting join
    $('body').off('click.jJoinMeeting').on('click.jJoinMeeting', '.jJoinMeeting', function (e) {
      let meetingUrl = $(this).data('meeting-url');
      if (!meetingUrl) return;

      if (zoomMeeting.isUnsupportedDeviceOrBrowser()) {
        $("#broser-not-supported").modal("show");
        e.stopPropagation();
        return;
      }

      window.location = meetingUrl;
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
