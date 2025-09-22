
$(document).ready(function () {
    const $menu = $('.header-menu li');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) &&
            $menu.has(e.target).length === 0) {
            $menu.removeClass('active');
            $(".header-menu li").removeClass("active");


        }
    });

    $('.header-menu .first-level-link').click(function () {
        $('.menusearchBlock').removeClass('act');
        $('.dLogin,.dloginWrapper').removeClass('is-active');
        $('.dLogin a').removeClass('button-removed');
        $(".hamburger").removeClass('is-active');
    });

    $('.menusearchBlock button.submit').click(function () {
        $('.menusearchBlock').toggleClass('act');
        $('.dLogin a').toggleClass('button-removed');
        $('.mainManu li').removeClass('active');
        $('#searchform input').focus();
        $('#searchform-mob input').focus();
        $('.dLogin,.dloginWrapper').removeClass('is-active');
        $('.mobileMenu, .hamburger, .mhamburger').removeClass('active');
        $(".hamburger, .mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger ").removeClass('active');
        $('.searchpage').toggleClass('mobilesearch');
        $('body').removeClass('menuOpened');
        var searchval = $('#searchid').val();
        if (searchval != "") {
            $('#searchform').submit();
        }
    });

    $('.search .mblsubmit').click(function () {
        var mobsearchval = $('#mob-search').val();
        if (mobsearchval != "") {
            $('#searchform-mob"').submit();
        }

    });

    $('.dLogin a').click(function () {
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
                var headHgt1 = $('.stickyEmpty').outerHeight();
                $('.dloginWrapper').css({ 'top': headHgt1 });
            }, 50);
        }

        if ($("header").hasClass("alertadded")) {
            setTimeout(function () {
                var headHgts2 = $('.alertsPannel').height() + $('.menugridsec').height() + 35;
                $('.dloginWrapper').css({ 'top': headHgts2 });
                console.log(headHgts2);
            }, 50);
        }
    });
  
});

// Menu
//Hamburger Tablandscape and Desktop

$(function () {
    $('.menu-mega-blog').on('click', function () {
        $(".stickyEmpty").addClass('menuopen');
    });
    hide = true;
    $('body').on("click", function () {
        if (hide) $('.stickyEmpty').removeClass('active');
        hide = true;
    });
    $('body').on('click', '.stickyEmpty', function () {
        var self = $(this);
        if (self.hasClass('menuopen')) {
            $('.stickyEmpty').removeClass('menuopen');
            return false;
        }
        $('.stickyEmpty').removeClass('menuopen');
        self.toggleClass('menuopen');
        hide = false;
    });
});

$(document).ready(function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    // if (windowwi <= 1023) {
    //     $(".fixedSideNav").css('top', alertpanelhgt);
    // }


});

$(window).on("load resize", function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    // if (windowwi <= 1023) {
    //     $(".fixedSideNav").css('top', alertpanelhgt);
    // }

});

    $(document).ready(function () {
        $('.mainManu li .first-level-link').click(function () {
            $('.mainManu li.menu-open').removeClass('menu-open');
            $('.dlogin a').removeClass('button-removed');
            $(this).parent().addClass('menu-open');
             if ($('.dLogin').hasClass("active")) {
                $(this).removeClass('active');
             }
        });
        const $menu = $('.menu-mega-blog');
        $(document).mouseup(function (e) {
            if (!$menu.is(e.target) &&
                $menu.has(e.target).length === 0) {
                $menu.removeClass('menu-open');
                $(".megaMenu li").removeClass("menu-open");
            }
        });
    });


$(document).ready(function () {
    $('.headerWrapper .dropdownMenu .menu-mega-blog-nav li').each(function () {
        $('.headerWrapper .dropdownMenu .menu-mega-blog-nav li').click(function () {
            $('.dropdownMenu.menu-mega-blog').removeClass('menu-open');
        });
    });
    $('.mobileNav .subMenu li a').each(function () {
        $(this).click(function () {
            $('.mobileMenu').removeClass('is-active');
            $('.mhamburger').removeClass('is-active');
        });
    });
});

//Mobile Menu
$(".mobileNav > ul > li .mbLevel1").click(function () {
    $(".mobileNav > ul > li .subMenu").slideUp();
    if ($(this).parent().hasClass("active")) {
        $(".mobileNav > ul > li").removeClass("active");
        $(this).parent().find(".subMenu").slideUp();
    } else {
        $(".mobileNav > ul > li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().find(".subMenu").slideDown();
    }
})

$('.mobileNav .subMenu li a').click(function () {
    var attr = $(this).attr('data-tab');
    if (typeof attr !== typeof undefined && attr !== false) {
        var tab_id = $(this).attr('data-tab');
        $('.mobileMenu').addClass('menuOpened');
        $('.mobileNav .subMenu li a').removeClass('active');
        $('.mobileMenu .tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    }
})
$('.hamburger a').click(function (f) {
    f.preventDefault();
    $(this).toggleClass('is-active')
    $('html').toggleClass('menuOpened');
});



$(function () {
    $('.login > a').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('selected');
        $(this).parent().find('ul').first().toggle(400);
        //Hide menu when clicked outside
        $(this).parent().find('ul').parent().mouseleave(function () {
            var thisUI = $(this);
            $('html').click(function () {
                thisUI.children(".login-menu").hide();
                thisUI.children("a").removeClass('selected');
                $('html').unbind('click');
            });
        });
        $(".menusearchBlock").removeClass("act");
        $(".dlogin").removeClass("button-removed");
        $(".hamburger, .mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger ").removeClass('active');
    });
});



$(window).on("resize", function () {
    if ($(window).width() >= 500) {
        $('.mobileMenu').removeClass('is-active');
        $('.mhamburger').removeClass('is-active');
        // $('.menusearchBlock').removeClass('act');
        $(".nav-wrapper").removeClass("show-menu");
        $(".hamburger .mhamburger").removeClass("is-active");
        // $('.dLogin').removeClass('button-removed');
        //  $('.dropdownMenu.menu-mega-blog').removeClass('menu-open');
        // $('.dropdownMenu.menu-mega-blog').removeClass('active');
        $('body').removeClass('menuOpened');
        $('.login-menu').css({ 'display': 'none' });
        $('.dLogin,.dloginWrapper').removeClass('is-active');
    }
}).resize();


$(document).ready(function () {
    (function ($) {
        this.MobileNav = function () {
            this.curItem,
                this.curLevel = 0,
                this.transitionEnd = _getTransitionEndEventName();

            var defaults = {
                initElem: ".main-menu",
                menuTitle: "Menu"
            }

            // Check if MobileNav was initialized with some options and assign them to the "defaults"
            if (arguments[0] && typeof arguments[0] === "object") {
                this.options = extendDefaults(defaults, arguments[0]);
            }

            // Add to the "defaults" ONLY if the key is already in the "defaults"
            function extendDefaults(source, extender) {
                for (option in extender) {
                    if (source.hasOwnProperty(option)) {
                        source[option] = extender[option];
                    }
                }
            }

            MobileNav.prototype.getCurrentItem = function () {
                return this.curItem;
            };

            MobileNav.prototype.setMenuTitle = function (title) {
                defaults.menuTitle = title;
                _updateMenuTitle(this);
                return title;
            };

            // Init is an anonymous IIFE
            (function (MobileNav) {
                var initElem = ($(defaults.initElem).length) ? $(defaults.initElem) : false;

                if (initElem) {
                    defaults.initElem = initElem;
                    _clickHandlers(MobileNav);
                    _updateMenuTitle(MobileNav);
                } else {
                    console.log(defaults.initElem + " element doesn't exist, menu not initialized.");
                }
            }(this));

            function _getTransitionEndEventName() {
                var i,
                    undefined,
                    el = document.createElement('div'),
                    transitions = {
                        'transition': 'transitionend',
                        'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
                        'MozTransition': 'transitionend',
                        'WebkitTransition': 'webkitTransitionEnd'
                    };

                for (i in transitions) {
                    if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                        return transitions[i];
                    }
                }
            };

            function _clickHandlers(menu) {
                defaults.initElem.on('click', '.has-dropdown > a', function (e) {
                    e.preventDefault();
                    menu.curItem = $(this).parent();
                    _updateActiveMenu(menu);
                });

                defaults.initElem.on('click', '.nav-toggle', function () {
                    _updateActiveMenu(menu, 'back');
                });
            };

            // TODO: Make this DRY (deal with waiting for transitionend event)
            function _updateActiveMenu(menu, direction) {
                _slideMenu(menu, direction);
                if (direction === "back") {
                    /*defaults.initElem.children('ul').one(menu.transitionEnd, function(e) {
                            menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                            menu.curItem = menu.curItem.parent().closest('li');
                            menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                            _updateMenuTitle(menu);
                    });*/

                    menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                    menu.curItem = menu.curItem.parent().closest('li');
                    menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                    _updateMenuTitle(menu);
                } else {
                    menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
                    _updateMenuTitle(menu);
                }
            };

            // Update main menu title to be the text of the clicked menu item
            function _updateMenuTitle(menu) {
                var title = defaults.menuTitle;
                if (menu.curLevel > 0) {
                    title = menu.curItem.children('a').text();
                    defaults.initElem.find('.nav-toggle').addClass('back-visible');
                } else {
                    defaults.initElem.find('.nav-toggle').removeClass('back-visible');
                }
                $('.nav-title').text(title);
            };

            // Slide the main menu based on current menu depth
            function _slideMenu(menu, direction) {
                if (direction === "back") {
                    menu.curLevel = (menu.curLevel > 0) ? menu.curLevel - 1 : 0;
                } else {
                    menu.curLevel += 1;
                }
                defaults.initElem.children('.menu-section').css({
                    "transform": "translateX(-" + (menu.curLevel * 100) + "%)"
                });
            };
        }
    }(jQuery));

    $(document).ready(function () {
        var MobileMenu = new MobileNav({
            initElem: "nav",
            menuTitle: "Push menu demo",
        });
        $('.hamburger a').on('click', function (e) {
            e.preventDefault();
            $('.nav-wrapper').toggleClass('show-menu');
            $('.dLogin,.dloginWrapper').removeClass('is-active');
        });

        $('.nav-toggle').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
        });

        $('.primarymeu li.has-dropdown a').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
        });

        $('.topmeu li.has-dropdown a').on('click', function (e) {
            $('.nav-wrapper').toggleClass('menubg');
        });
    });


});


 $(window).on('load', function () {
     setTimeout(function(){ 
    $('.threecolumnModule .offerImages .colblock.videoblock .bcmPlayerBanner').css({'width': "", 'height': ""});
}, 1200);
 });

 $(".menu-mega-blog-nav .menuItem.secondarymenu").hover(function(){
    $(this).parent().find('.menuItem.secondarymenu').each(function(){
        $(this).removeClass("show");
      })
     $(this).addClass("show");
        $('.secondarymenulist').attr("style","");
        //var headerHgt = $(this).find('.secondarymenulist .grid.grid-lined').outerHeight(true);
        $(this).parent().parent().parent().find('.secondarymenulist').css({'min-height': headerHgt});
  });


 $(".header-menu ul").find("li.dropdownMenu").each(function(){

    var i=$(this).index();
    $(this).find(".menu-mega-blog-nav .menuItem.secondarymenu").each(function(){
    var currentnav=$(this);
    // console.log($(this).parent().find(".show"));
    if($(this).parent().find(".show").length==0){
        $(this).addClass("show").addClass("active");
    }else{
      $(this).find('.secondarymenu ').find("li").each(function(){
        if($(this).hasClass("show")){
          currentnav.addClass("show").addClass("active");
        }
      });
    }

  });
});