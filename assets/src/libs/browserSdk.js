class BrowserSdk {

  constructor(){
    this.sdkConfig = this.getConfig();
  }
  
  getConfig(TOKEN_ID=null , PLATFORM_API_ENDPOINT=null , SDK_ENV=null){
    return {
      token_id : TOKEN_ID ,
      api_endpoint: PLATFORM_API_ENDPOINT ,
      environment:SDK_ENV
    }
  }
  
  init( sdkConfig ){
    this.sdkConfig = this.getConfig(sdkConfig["TOKEN_ID"] , sdkConfig["PLATFORM_API_ENDPOINT"] , sdkConfig["SDK_ENV"]);
    OstWalletSdk.init(this.sdkConfig).then((res)=> {
      console.log("OstWalletSdk.init : ", res);
    })
  }

}


export  default  new BrowserSdk();