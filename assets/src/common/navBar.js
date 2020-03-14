import $ from 'jquery';
import LoginServiceFactory from  '../login/LoginServicefactory';

class NavBar {

    constructor(){
        this.jNavEl = null;
        this.jUberBanner = null;
        this.jNavPhantomEl = null;
        this.heightTrigger = 0;
    }

    init(){
        this.jNavEl =  $('.pepo-nav');
        this.jUberBanner = $('.uber-banner');
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
              arrowIcon   = logoutModal.closest('body').find('.downward-arrow-icon'),
              loginType   = $(this).attr('data-login-type');
          logoutModal.modal({
            backdrop:false
          });
          logoutModal.modal('show');
          arrowIcon.css({'transform': "rotate(180deg)"});
          $('body').off("click.logout").on('click.logout',function (e) {
            if(logoutModal.length !== 0 ){
              logoutModal.modal('hide');
              arrowIcon.css({'transform': "rotate(0deg)"});
            }
          });
          $("#logoutBtn").off("click.logout").on("click.logout", function (e) {
            let loginInstance = LoginServiceFactory.getLoginServiceInstance( loginType );
            loginInstance.logout();
            e.preventDefault();
            e.stopPropagation();
          });
          e.preventDefault();
          e.stopPropagation();
        })
    }

    setupUberBanner = () => {
        if( this.jUberBanner.length === 0 ) {
            this.heightTrigger = 0;
        } else {
            this.heightTrigger = Math.max(this.jUberBanner.outerHeight())
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
