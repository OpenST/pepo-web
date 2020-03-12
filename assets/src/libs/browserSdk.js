// import OstWalletSdk from '@ostdotcom/ost-wallet-sdk-browser' ;

class BrowserSdk {

  constructor(){
    this.sdkConfig = this.getConfig();
  }
  
  getConfig(TOKEN_ID=null , PLATFORM_API_ENDPOINT=null , SDK_ENDPOINT=null){
    return {
      token_id : TOKEN_ID ,
      api_endpoint: PLATFORM_API_ENDPOINT ,
      sdk_endpoint: SDK_ENDPOINT
    }
  }
  
  init( sdkConfig ){
    this.sdkConfig = this.getConfig(sdkConfig["TOKEN_ID"] , sdkConfig["PLATFORM_API_ENDPOINT"] , sdkConfig["SDK_ENDPOINT"]);
    console.log("this.sdkConfig" ,  this.sdkConfig , sdkConfig);
   // OstWalletSdk.init(sdkConfig);
  }

}


export  default  new BrowserSdk();