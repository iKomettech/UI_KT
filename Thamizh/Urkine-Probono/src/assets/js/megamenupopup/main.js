
$(document).ready(function () {
  

    $('.dLogin a').on("click", function () {

        if ($('.dloginWrapper').length > 0) {
            var headHgt = $('header').height();
            var headHgts = $('.menugridsec').height();
            $('.mSearchWrapper').removeClass('search-active');
            $('.fixedSideNave ul li.contactUs').removeClass('nav-open');
            $('.dloginWrapper').css({ 'top': headHgt });
            $('.dLogin').toggleClass('is-active');
            $('.dloginWrapper').toggleClass('is-active');

            $('.hamburger, .mhamburger, .mobileMenu').removeClass('act');
            $('.menusearchBlock').removeClass('is-active');
            $(".nav-wrapper").removeClass("show-menu");
            $('.nav-wrapper').removeClass('show-menu');
            $(".hamburger .mhamburger").removeClass("is-active");
            setTimeout(function () {
                console.log('test23')
                var headHgt2 = $('header').height();
                var headHgts = $('.stickyEmpty').height();
                $('.dloginWrapper').css({ 'top': headHgts });
            }, 50);

            if ($(window).width() <= 1023) {
                setTimeout(function () {
                    console.log('tes')
                    var headHgt1 = $('.stickyEmpty').height();
                    $('.dloginWrapper').css({ 'top': headHgt1 });
                }, 50);
            }

            if ($("header").hasClass("alertadded")) {
                setTimeout(function () {
                    var headHgts = $('.stickyEmpty').height();
                    $('.dloginWrapper').css({ 'top': headHgts });
                    console.log(headHgts2);
                }, 50);
            }
        }

        if ($('.homeloginpopupwrapper').length > 0) {
            $("body").css({ "overflow": "hidden" });
            $('.homeloginpopupwrapper .overlay').fadeIn(300);
            $('.siteWrap').addClass("popupOpened");

            $('.homeloginpopupwrapper .close').click(function () {
                $("body").css({ "overflow-y": "visible" });
                $('.homeloginpopupwrapper .overlay').fadeOut(300);
                $('.siteWrap').removeClass("popupOpened");
            });
        }
    });
});