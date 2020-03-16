
import OstWalletSdk from '@ostdotcom/ost-wallet-sdk-browser'
import OstSetupDeviceDelegate from '@ostdotcom/ost-wallet-sdk-browser';

//TODO lets see
const sdkConfig = {
  "token_id": "[YOUR_TOKEN_ID]",
  "api_endpoint": "https://api.ost.com/testnet/v2/",
  "sdk_endpoint": "https://[YOUR_TOKEN_SDK_ENDPOINT]"
};

class BrowserSdk {

  constructor(){
    OstWalletSdk.init( sdkConfig );
    const sdkDelegate = new OstSetupDeviceDelegate();
  }


}


export  default  new BrowserSdk();