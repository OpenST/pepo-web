import ejs from "ejs";

const {$} = window;
import CurrentUser from "../model/CurrentUser";
import LoginServiceFactory from '../login/LoginServicefactory';
import adminCommunityList from './adminCommunityList.html';
import deepGet from 'lodash/get';
import {setDataStore} from "../model/DataStore";

const LOG_TAG = 'NavBar';

const namespace = "navbar";

class NavBar {

  constructor() {
    this.jNavEl = null;
    this.jUberBanner = null;
    this.jNavPhantomEl = null;
    this.jNavTogglerEl = null;
    this.heightTrigger = 0;
    this.uberBannerHeight = 42;
  }

  init() {
    this.jNavEl = $('.pepo-nav');
    this.jUberBanner = $('.uber-banner');
    this.jNavPhantomEl = $('.navbar-phatom-el');
    this.jNavTogglerEl = $('#navbarToggler');
    this.jDialogLogout = $('.modal-dialog-logout');
    this.jDialogGoLive = $('.modal-dialog-go-live');
    this.jDialogLogin = $('.modal-dialog-login');
    this.logoutMarginTop = parseInt(this.jDialogLogout.css('margin-top'));
    this.loginMarginTop = this.jUberBanner.outerHeight() ? parseInt(this.jDialogLogin.css('margin-top')) : parseInt(this.jDialogLogin.css('margin-top')) - this.uberBannerHeight;
    this.goLiveMarginTop = parseInt(this.jDialogGoLive.css('margin-top'));

    this.bindEvents();
    this.fixedNavBarMenu();

    const oThis = this;

    oThis.getManagedCommunities(CurrentUser.getUserId())
      .then((response) => {
        oThis.setManagedCommunities(response);
        if (!oThis.channels) return;

        const modal = ejs.compile(adminCommunityList, {client: true});
        let adminCommunityListHtml = $(modal({
          channels: oThis.channels
        }));

      $("#navbarToggler3").html(adminCommunityListHtml);
      }).catch((err) => {
      console.warn(LOG_TAG, 'initUser', err);
    })
  }



  bindEvents = () => {
    const oThis = this
    ;

    $("#toggle-menu").off(`click.${namespace}`).on(`click.${namespace}`, function () {
      $(this).toggleClass("is-active");
    });

    $('nav .downloadApp.web').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      $('#downloadModal').modal('show');
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    $('.loginApp').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      let loginModal = $('#loginModal'),
        backdrop = window.innerWidth < 768 ? true : false
      ;
      loginModal.modal({
        backdrop: backdrop
      });
      loginModal.modal('show');
      $('body').on('click', function () {
        if (loginModal.length !== 0) {
          loginModal.modal('hide');
        }

      });
      e.preventDefault();
      e.stopPropagation();
    });

    $('#logoutAppWeb').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      let logoutModal = $('#logoutModal'),
        arrowIcon = logoutModal.closest('body').find('.downward-arrow-icon');
      logoutModal.modal({
        backdrop: false
      });
      logoutModal.modal('show');
      arrowIcon.css({'transform': "rotate(180deg)"});
      $('body').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
        if (logoutModal.length !== 0) {
          logoutModal.modal('hide');
          arrowIcon.css({'transform': "rotate(0deg)"});
        }
      });
      e.preventDefault();
      e.stopPropagation();
    });

    $(".logoutBtn").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      let loginType = CurrentUser.getLoginType(),
        loginInstance = LoginServiceFactory.getLoginServiceInstance(loginType);
      loginInstance.logout();
      e.stopPropagation();
    });

    $(".jGoLiveBtn").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
      if (!CurrentUser.isLoggedIn()) {
        $("#logged-out-instructions").modal("show");
      } else if (!CurrentUser.isChannelAdmin()) {
        $("#logged-in-instructions").modal("show");
      } else {

        if (!oThis.channels) return;

        const channelIdList = Object.keys(oThis.channels);
        if (channelIdList.length === 1) {
          let channel = oThis.channels[channelIdList[0]] || {};
          window.location = `/communities/${channel.permalink}/`
        } else {
          let goLiveModal = $('#goLiveModal'),
            backdrop = window.innerWidth < 768 ? true : false
          ;
          goLiveModal.modal({
            backdrop: backdrop
          });
          goLiveModal.modal('show');
          $('body').on('click', function () {
            if (goLiveModal.length !== 0) {
              goLiveModal.modal('hide');
            }

          });
        }
      }
      e.stopPropagation();
      e.preventDefault();

    });


  };

  setupUberBanner = () => {
    if (this.jUberBanner && this.jUberBanner.length === 0) {
      this.heightTrigger = 0;
    } else {
      this.heightTrigger = this.jUberBanner.outerHeight();
    }
  };

  fixedNavBarMenu() {
    this.setupUberBanner();
    let scrollTop = $(window).scrollTop();
    if (scrollTop > this.heightTrigger) {
      this.jNavPhantomEl.height(this.jNavEl.outerHeight());
      this.jNavEl.addClass('nav-box-shadow fixed-top');
      this.jNavTogglerEl.css({top: this.jNavEl.outerHeight()});
      this.jDialogLogout.css({marginTop: this.logoutMarginTop - this.jUberBanner.outerHeight()});
      this.jDialogLogin.css({marginTop: this.loginMarginTop - this.jUberBanner.outerHeight()});
      this.jDialogGoLive.css({marginTop: this.goLiveMarginTop - this.jUberBanner.outerHeight()});
    } else {
      this.jNavPhantomEl.height(0);
      this.jNavEl.removeClass('nav-box-shadow fixed-top');
      this.jNavTogglerEl.css({top: this.jNavEl.outerHeight() + this.jUberBanner.outerHeight()});
      this.jDialogLogout.css({marginTop: this.logoutMarginTop});
      this.jDialogLogin.css({marginTop: this.loginMarginTop});
      this.jDialogGoLive.css({marginTop: this.goLiveMarginTop});
    }

  }

  setManagedCommunities(response) {
    let data = deepGet(response, 'data');
    setDataStore(data);

    let resultType = deepGet(response, 'data.result_type');
    this.channels = deepGet(response, `data.${resultType}`);
  }

  getManagedCommunities(userId) {
    let _resolve,
      _reject
    ;

    if (!userId) return Promise.resolve();

    let urlEndpoint = `/api/web/users/${userId}/channels`;
    console.log(LOG_TAG, urlEndpoint);

    $.ajax({
      url: urlEndpoint,
      method: 'GET',
      success: (response) => {
        console.log(LOG_TAG, JSON.stringify(response, null, 4));
        return _resolve(response);
      },
      error: (xhr, status, error) => {
        console.log(LOG_TAG, JSON.stringify(error, null, 4));
        return _reject(error);
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

export default new NavBar();
