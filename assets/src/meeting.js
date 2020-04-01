import ns from "../js/libs/namespace";
import BasicHelper from '../src/helpers/basic'
import BaseView from "../src/common/BaseView";
import zoomMeeting from "./helpers/ZoomMeeting";
import CurrentUser from "./model/CurrentUser";
require('../src/libs/share-buttons/share-buttons.js');

const {$} = window;
const namespace = "meeting";

class Meeting extends BaseView {

  constructor(config) {
    super(config);
    this.config = config;
    this.leaveUrl = this.config.leaveUrl;
    this.apiResponse = this.config.apiResponse;
    this.meeting = this.apiResponse.meeting;
    this.meetingId = this.meeting.id;
    this.channelId = this.apiResponse.meeting.channel_id;
    this.channel = this.apiResponse.channels[this.channelId];
    this.channelPermalink = this.channel.permalink;
    this.zoomMeeting = null;
    this.systemRequirements = false;
    this.readyStateAttempt = 0;
    this.jWrapper = $('#meetingWrapper');
    this.jqIframe = $('#zoomMeeting');
    this.jqError = $('#meetingError');
    this.jqLoader = $('#meetingLoader');
    this.jGuestJoining = $('#guestJoining');
    this.isCustomUserName = false;
    this.fallbackErrorMsg = 'Something went wrong';

    this.userName = "Pepo User";

    this.onJoinError = this.onJoinError.bind(this);
    this.onJoinSuccess = this.onJoinSuccess.bind(this);

    this.isCloseShareEventBinded = false;

    this.init();
    this.bindEvents();
    this.adjustWidth();
  }

  init() {
    if (this.meeting && (this.meeting.status == 'STARTED' || this.meeting.status == 'WAITING')) {
      this.initZoom();
    } else {
      this.showError('This Pepo live event has ended');
    }
    this.bindEvents();
  }

  bindEvents() {
    const oThis = this;

    if ( !this.isCloseShareEventBinded ) {
      this.isCloseShareEventBinded = true;

      const jMeetingShareBtn = $(".jMeetingShareBtn");
      const jMeetingShareOptions = $("#meetingShareOptions");
      const copyToClipboardClass = ".copyToClipboard";

      jMeetingShareBtn.off(`click`).on(`click`, () => {
        jMeetingShareOptions.show();
      });

      document.body.addEventListener('click', (e) => {
        if ( !e.target ) {
          return;
        }

        if ( jMeetingShareBtn.has(e.target).length ) {
          return;
        }

        if (e.target.hasClass(copyToClipboardClass) ) {
          return;
        }

        jMeetingShareOptions.hide();

      }, true);
    }

    

    $(".copyToClipboard").off(`click.${namespace}`).on(`click.${namespace}`, (e) => {
      if ( !oThis.config.apiResponse )  {
        return;
      }

      let shareDetails = oThis.config.apiResponse.socialShareDetails || oThis.config.apiResponse.social_share_details;
      if ( !shareDetails ) {
        return;
      }

      let textToCopy = shareDetails["default"];
      

      let isCopied = BasicHelper.copyToClipboard(textToCopy, $(e.target));
      $("#meetingShareOptions").hide();
      if (isCopied) {
        $('.toast-copied-to-clipboard').toast('show');
      } else {
        $('.toast-copied-to-clipboard-failed').toast('show');
      }
      e.stopPropagation();
    });

  }

  adjustWidth() {
    const minWidth = 410;
    let width = $(window).innerWidth();
    if (width < minWidth) {
      let ratio = minWidth / width;
      let ratioInverse = width / minWidth;
      let ratioDiff = (ratio - 1) / 2;
      let halfRatio = ratio - ratioDiff;
      let halfRatioDiff = (halfRatio - 1) / 2;
      this.jWrapper.css({
        transform: `scale(${ratioInverse})`,
        width: `${ratio * 100}%`,
        left: `-${ratioDiff * 100}%`,
        height: `${halfRatio * 100}%`,
        top: `-${halfRatioDiff * 100}%`,
        position: 'relative'
      });
    }
  }

  canStartMeeting() {
    return (this.config.apiResponse.current_user_channel_relations[this.channel.id] || {}).is_admin == 1;
  }

  initZoom() {
    this.showLoader();
    let contentWindow = this.jqIframe[0].contentWindow;
    this.readyStateAttempt++;
    if (contentWindow.document.readyState == 'complete' && contentWindow.ZoomMeeting) {
      const ZoomMeeting = contentWindow.ZoomMeeting;
      this.zoomMeeting = new ZoomMeeting();

      if (!this.isBrowserSupported()) return;

      this.handleZoomMeeting();

    } else {
      if (this.readyStateAttempt >= 3) {
        this.showError('Error initiating Zoom Web');
        return;
      }
      setTimeout(() => this.initZoom(), this.readyStateAttempt * 500);
    }

  }

  joinZoom(data) {

    this.zoomMeeting.init({
        leaveUrl: `/zoom-meeting?goto=${this.leaveUrl}&role=${data.role}&channel_permalink=${this.channelPermalink}&meeting_id=${this.meetingId}`,
        disableInvite: true,
        disableRecord: true,
        screenShare: true /* Always show share screen button. */
      },
      () => {
        console.log("init zoom done");
        this.zoomMeeting.join({
            meetingNumber: data.zoom_meeting_id,
            userName: data.name,
            apiKey: data.api_key,
            signature: data.signature,
            participantId: data.participant_id
          },
          this.onJoinSuccess,
          this.onJoinError
        );
      },
      (error) => this.showError(`Error initiating Zoom Web: ${error && error.errorMessage}`)
    );
  }

  isBrowserSupported() {
    // Cos this might break at times
    try {
      this.systemRequirements = this.zoomMeeting.getZoomMtg().checkSystemRequirements();
    } catch (e) {
      console.warn(e);
    }
    if (!zoomMeeting.isFullySupported(this.systemRequirements)) {
      let browser = (this.systemRequirements && this.systemRequirements.browserInfo) || 'this';
      this.showError(`Pepo live events are not supported on ${browser} browser, please use Chrome or Edge browsers.`);
      return false;
    }
    return true;
  }

  ensureUserName() {
    const oThis = this;

    if (CurrentUser.isLoggedIn()) {
      oThis.getJoinParamsAndJoin();
      return;
    }

    //Ask for sign in or enter user name
    oThis.showLogIn();
    oThis.isCustomUserName = true;
    oThis.getUsernameFromPopup();
  }

  handleZoomMeeting() {
    const oThis = this
    ;

    oThis.ensureUserName();
  }

  getJoinParamsAndJoin() {
    let userName = this.userName;

    if (
      this.config.apiResponse &&
      this.config.apiResponse.current_meeting_id &&
      this.channel
    ) {
      $.ajax({
        url: `/api/web/channels/${this.channel.permalink}/meetings/${this.config.apiResponse.current_meeting_id}/join-payload`,
        data: {guest_name: userName},
        success: (response) => {
          if (
            response.success &&
            response.data &&
            response.data.result_type &&
            response.data[response.data.result_type]
          ) {
            this.hideLogIn();
            this.joinZoom(response.data[response.data.result_type]);
          } else {
            let errorMsg = this.fallbackErrorMsg;
            if (response.err) {
              if (response.err.error_data &&
                response.err.error_data[0] &&
                response.err.error_data[0].msg) {

                errorMsg = response.err.error_data[0].msg;
                if (this.isCustomUserName) {
                  this.showErrorInGuestForm(errorMsg);
                  return;
                }
              } else {
                if (response.err.msg) {
                  errorMsg = response.err.msg;
                }
              }
            }
            this.hideLogIn();
            this.showError(errorMsg);
          }
        },
        error: (jqXHR) => {
          let error = jqXHR.responseJSON;
          let errorMsg = this.fallbackErrorMsg;
          if (error && error.err && error.err.msg) {
            errorMsg = error.err.msg;
          }
          if (this.isCustomUserName) {
            this.showErrorInGuestForm(errorMsg);
            return;
          }
          this.showError(errorMsg);
        },
        complete: () => {
          const jEl = $('.join-event-btn');
          jEl.text('Join');
          jEl.removeAttr('disabled');
        }
      })
    } else {
      this.showError(this.fallbackErrorMsg);
    }
  }

  showErrorInGuestForm(errorMsg) {
    $(".jJoinError").html(errorMsg);
  }

  getUsernameFromPopup() {
    const oThis = this
    ;

    let name = '';
    const jEl = $('.join-event-btn');
    jEl.on(`click`, function (e) {
      name = $("#username-input").val();
      $(".jJoinError").html("&nbsp;");
      name = name.trim();
      if (!name || name == '') {
        $(".jJoinError").html("Please enter your name to join the event");
      } else {
        oThis.userName = name;
        oThis.getJoinParamsAndJoin();
        jEl.text('Joining...');
        jEl.attr('disabled');
      }
    });
  }

  showLogIn() {
    this.jqLoader.hide();
    this.jqIframe.hide();
    this.jqError.hide();
    this.jGuestJoining.show();
  }

  hideLogIn() {
    this.jqIframe.hide();
    this.jqError.hide();
    this.jGuestJoining.hide();
    this.jqLoader.show();
  }

  showError(message) {
    this.jqIframe.hide();
    this.jqLoader.hide();
    this.jqError.find('.error-text').html(message);
    this.jqError.find('.error-btn').attr("href", '/' + this.leaveUrl);
    this.jqError.show();
  }

  showLoader() {
    this.jqIframe.hide();
    this.jqError.hide();
    this.jqLoader.show();
  }


  onJoinSuccess(response) {
    console.log(response);
    this.jqLoader.hide();
    this.jqError.hide();
    this.jqIframe.show();
  }

  onJoinError(error) {
    this.showError(error.errorMessage);
  }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
