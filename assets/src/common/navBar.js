import $ from 'jquery';
import LoginServiceFactory from  '../login/LoginServicefactory';

class NavBar {

    constructor(){
        this.jNavEl = null;
        this.jUberBannerDesktop = null;
        this.jUberBannerMobile = null;
        this.jNavPhantomEl = null;
        this.heightTrigger = 0;
    }

    init(){
        this.jNavEl =  $('.pepo-nav');
        this.jUberBannerDesktop = $('.uber-banner-desktop');
        this.jUberBannerMobile = $('.uber-banner-mobile');
        this.jNavPhantomEl = $('.navbar-phatom-el');

        this.bindEvents();
    }

    bindEvents = () => {

        $("#toggle-menu").on('click', function(){
            $(this).toggleClass("is-active");
        });

        $('nav .downloadApp.web').on('click', function (e) {
            $('#downloadModal').modal('show');
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        $('.loginApp').on('click',function (e) {
            let loginModal = $('#loginModal');
            loginModal.modal({
              backdrop:false
            });
            loginModal.modal('show');
                $('body').on('click',function () {
                    if(loginModal.length !== 0 ){
                    loginModal.modal('hide');
                }

            });
            e.preventDefault();
            e.stopPropagation();
        })

        $('#logoutApp').on('click',function (e) {
          let logoutModal = $('#logoutModal'),
                loginType= $(this).attr('data-login-type');
          logoutModal.modal({
            backdrop:false
          });
          logoutModal.modal('show');
          $('body').on('click',function (e) {
            if(logoutModal.length !== 0 ){
              logoutModal.modal('hide');
            }
            let loginInstance = LoginServiceFactory.getLoginServiceInstance( loginType );
            loginInstance.logout();
          });
            e.preventDefault();
            e.stopPropagation();
        })
    }

    setupUberBanner = () => {
        if(this.jUberBannerDesktop.length === 0 && this.jUberBannerMobile.length === 0) {
            this.heightTrigger = 0;
        } else {
            this.heightTrigger = Math.max(this.jUberBannerDesktop.outerHeight(), this.jUberBannerMobile.outerHeight())
        }
    }

    fixedNavBarMenu(){
        this.setupUberBanner();
        let scrollTop = $(window).scrollTop();
        if(scrollTop > this.heightTrigger){
            this.jNavPhantomEl.height( this.jNavEl.outerHeight() );
            this.jNavEl.addClass('nav-box-shadow fixed-top');
        } else{
            this.jNavPhantomEl.height( 0 );
            this.jNavEl.removeClass('nav-box-shadow fixed-top');
        }

    }


}

export default new NavBar();
