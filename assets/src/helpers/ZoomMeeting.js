import  deepGet from "lodash/get";

const namespace = "zoomMeeting" ;

const LOG_TAG = "ZoomMeeting";

class ZoomMeeting {

  constructor() {
    this.zoomMeeting = null;
    this.systemRequirements = false;
    this.readyStateAttempt = 0;

    //Sachin :: Don't call this.init from constructor
  }

  getSystemRequirements() {
    return this.systemRequirements;
  }

  /**
   * For init you have require or add this in your content partial.
   * <iframe id="zoomMeetingHidden" class="meeting-iframe" src="/zoom-meeting" style="display: none;"></iframe>
   * @param isSupportedBrowserCallback
   */
  init( isSupportedBrowserCallback ){
    const oThis = this;

    $(".jJoinMeeting").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      //TODO check is isSupportedBrowserCallback, remove || true
      if(oThis.isFullySupported(oThis.systemRequirements)){
        isSupportedBrowserCallback && isSupportedBrowserCallback($(this));
        return;
      }
      //TODO show not supported modal
      $("#browser-not-supported").modal("show");
    });

  }

  isFullySupported(systemRequirements){

    systemRequirements = systemRequirements || this.systemRequirements;

    if(!systemRequirements) return false;

    if(
      systemRequirements &&
      systemRequirements.features &&
      systemRequirements.features.length > 0 &&
      !systemRequirements.features.includes('computerAudio')
    ) {
      return false;
    } else if (this.isiOSDevice()) {
      return false;
    }
    return true;
  }

  isiOSDevice() {
    return navigator.userAgent.indexOf("iPhone") !== -1 || navigator.userAgent.indexOf("iPad") !== -1;
  }
}



export default  new ZoomMeeting();
