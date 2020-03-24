const {$} = window;
import CurrentUser from "../model/CurrentUser";
import LoginServiceFactory from  '../login/LoginServicefactory';

const namespace = "navbar";

class NavBar {

    constructor(){
        this.jNavEl = null;
        this.jUberBanner = null;
        this.jNavPhantomEl = null;
        this.jNavTogglerEl = null;
        this.heightTrigger = 0;
    }

    init(){
        this.jNavEl =  $('.pepo-nav');
        this.jUberBanner = $('.uber-banner');
        this.jNavPhantomEl = $('.navbar-phatom-el');
        this.jNavTogglerEl = $('#navbarToggler');

        this.bindEvents();
        this.fixedNavBarMenu();
    }

    bindEvents = () => {

        $("#toggle-menu").off(`click.${namespace}`).on(`click.${namespace}`, function(){
            $(this).toggleClass("is-active");
        });

        $('nav .downloadApp.web').off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
            $('#downloadModal').modal('show');
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        $('.loginApp').off(`click.${namespace}`).on(`click.${namespace}`,function (e) {
            let loginModal = $('#loginModal') ,
              backdrop = window.innerWidth < 768  ? true: false
            ;
            loginModal.modal({
              backdrop:backdrop
            });
            loginModal.modal('show');
                $('body').on('click',function () {
                    if(loginModal.length !== 0 ){
                    loginModal.modal('hide');
                }

            });
            e.preventDefault();
            e.stopPropagation();
        });

        $('#logoutAppWeb').off(`click.${namespace}`).on(`click.${namespace}`,function (e) {
          let logoutModal = $('#logoutModal'),
              arrowIcon   = logoutModal.closest('body').find('.downward-arrow-icon');
          logoutModal.modal({
            backdrop:false
          });
          logoutModal.modal('show');
          arrowIcon.css({'transform': "rotate(180deg)"});
          $('body').off(`click.${namespace}`).on(`click.${namespace}`,function (e) {
            if(logoutModal.length !== 0 ){
              logoutModal.modal('hide');
              arrowIcon.css({'transform': "rotate(0deg)"});
            }
          });
          e.preventDefault();
          e.stopPropagation();
        });

      $(".logoutBtn").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
        let loginType = CurrentUser.getLoginType(),
            loginInstance = LoginServiceFactory.getLoginServiceInstance( loginType );
        loginInstance.logout();
        e.stopPropagation();
      });
      
      $(".jGoLiveBtn").off(`click.${namespace}`).on(`click.${namespace}`, function (e) {
        if(!CurrentUser.isLoggedIn()){
          $("#logged-out-instructions").modal("show");
        }else if(!CurrentUser.isChannelAdmin()){
          $("#logged-in-instructions").modal("show");
        }
        e.stopPropagation();
        e.preventDefault();
      });
    };

    setupUberBanner = () => {
        if( this.jUberBanner && this.jUberBanner.length === 0 ) {
            this.heightTrigger = 0;
        } else {
            this.heightTrigger = this.jUberBanner.outerHeight();
        }
    }

    fixedNavBarMenu(){
        this.setupUberBanner();
        let scrollTop = $(window).scrollTop();
        if(scrollTop > this.heightTrigger){
            this.jNavPhantomEl.height( this.jNavEl.outerHeight() );
            this.jNavEl.addClass('nav-box-shadow fixed-top');
            this.jNavTogglerEl.css({top: this.jNavEl.outerHeight()});
        } else{
            this.jNavPhantomEl.height( 0 );
            this.jNavEl.removeClass('nav-box-shadow fixed-top');
            this.jNavTogglerEl.css({top: this.jNavEl.outerHeight() + this.jUberBanner.outerHeight()});
        }

    }


}

export default new NavBar();
