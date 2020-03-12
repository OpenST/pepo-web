import CurrentUser from "../../src/model/CurrentUser"

class BaseView {
  
  constructor( config ){
    this.config = config;
    this.initCurrentUser( config.apiResponse );
  }
  
  
  initCurrentUser(data){
    //@Preshita
  }
  
  initSdk(){
    //@Ashutosh
  }
  
  initPixelDrop(){
    //@Sharadha
  }
  
  initDataStore(){
    //@Mayur
  }
  
}


export default BaseView;