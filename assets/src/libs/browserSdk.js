const LOG_TAG = "BrowserSdk";

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
  
  init( sdkConfig, params ){
    const oThis = this;
    this.sdkConfig = this.getConfig(sdkConfig["TOKEN_ID"] , sdkConfig["PLATFORM_API_ENDPOINT"] , sdkConfig["SDK_ENV"]);
    OstWalletSdk.init(this.sdkConfig).then((res)=> {
      console.log("OstWalletSdk.init : ", res);
      oThis.setupDeviceWorkflow(params);
    })
  }

  setupDeviceWorkflow( config ){
    const oThis = this;
    const sdkDelegate = new OstSetupDeviceDelegate();
    console.log("sdkDelegate=",sdkDelegate);
    sdkDelegate.registerDevice = function( apiParams ) {
      console.log("registerDevice");
      return oThis.postRegisterDevice(apiParams);
    };
    const user_id = config.logged_in_user.user_id;
    const ost_user_id = config.users[user_id].ost_user_id;
    const ost_token_id = config.token.ost_token_id;
    OstWalletSdk.setupDevice(ost_user_id, ost_token_id, sdkDelegate);
  }

  postRegisterDevice(apiParams) {
    let _resolve,
      _reject,
      urlEndpoint = `/api/web/users/register-device`
    ;
    console.log(LOG_TAG, urlEndpoint);
    $.ajax({
      url: urlEndpoint,
      method: 'POST',
      data: {
        "device_address": apiParams.device_address,
        "api_signer_address": apiParams.api_signer_address
      },
      success: (response) => {
        console.log(LOG_TAG, JSON.stringify(response, null, 4));
        return _resolve(response);
      },
      error: (xhr, status, errorResponse) => {
        let isDeviceAlreadyRegistered = false;
        // Response if already registered.
        //{"success":false,"internal_id":"l_oah_1","code":"ALREADY_EXISTS","msg":"Duplicate entity already exists."}

        if ( errorResponse && errorResponse.success === false ) {
          if ( errorResponse.code === "ALREADY_EXISTS") {
            isDeviceAlreadyRegistered = true;
          }
        }

        if ( isDeviceAlreadyRegistered ) {
          console.log("device already registered.");
          // ignore the error.
          return _resolve(true);
        }

        //Todo:: Should be removed after debug
        alert('Unable to register device.');
        
        // If not, throw the error.
        return _reject(errorResponse);
      },
      complete: () => {
        console.log(LOG_TAG, 'Complete');
      }
    });
    return new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  }

}


export  default  new BrowserSdk();