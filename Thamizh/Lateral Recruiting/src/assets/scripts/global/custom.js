let shrinkHeader = 50;
let sticyhead;

// function resizeScroll() {

//     if ($(window).outerWidth() <= 767) {
//         $(window).scroll(function () {
//             let scroll = getCurrentScroll();
//             console.log('if current scroll', scroll);
//             sticyhead = $('.sticky').height();
//             if (scroll >= shrinkHeader) {
//                 $('.sticky').addClass('active');
//                 $('.stickyEmpty').css('height', sticyhead);
//             }
//             else {
//                 $('.sticky').removeClass('active');
//                 setTimeout(function () {
//                     sticyhead = $('.sticky').height();
//                     $('.stickyEmpty').css('height', sticyhead);
//                 }, 50);
//             }
//         });
//     }
//     if ($(window).outerWidth() >= 768) {
//         let isSticky = false;
//         let stickyOffset = $(".subbannerpanel").height() - 150;
//         let stickyHeadHeight = $('.sticky').innerHeight();
//         $('.subbannerpanel').css({ 'margin-top': -$('.stickyEmpty').height() });

//         $(window).scroll(function () {
//             let scrollTop = $(window).scrollTop();
//             if (scrollTop > stickyOffset && !isSticky) {
//                 isSticky = true;
//                 $(".tabnavlinks").addClass("stickynavlinks");
//                 $(".sticky").addClass("active");
//                 $('.stickyEmpty').css('height', stickyHeadHeight);
//             } else if (scrollTop <= stickyOffset && isSticky) {
//                 isSticky = false;
//                 $(".tabnavlinks").removeClass("stickynavlinks");
//                 $(".sticky").removeClass("active");
//                 $('.stickyEmpty').css('height', stickyHeadHeight);
//                 $('.subbannerpanel').css({ 'margin-top': -$('.stickyEmpty').height() });
//             }
//         });
//     }
// }

// function getCurrentScroll() {
//     return window.scrollY || document.documentElement.scrollTop;
// }


// $(window).on("resize", function (e) {
//     // getCurrentScroll();
//     // resizeScroll();  
// });


function initSticky() {
    let isSticky = false;

    // Function to handle sticky behavior for below 768px
    function handleBelow768() {
        $(window).off('scroll.sticky'); // Unbind previous scroll events
        $(window).on('scroll.sticky', function () {
            let scroll = $(window).scrollTop();
            let sticyhead = $('.sticky').height();

            if (scroll >= shrinkHeader) {
                $('.sticky').addClass('active');
                $('.stickyEmpty').css('height', sticyhead);
            } else {
                $('.sticky').removeClass('active');
                setTimeout(function () {
                    sticyhead = $('.sticky').height();
                    $('.stickyEmpty').css('height', sticyhead);
                }, 50);
            }
        });
    }

    // Function to handle sticky behavior for above 768px
    function handleAbove768() {
        $(window).off('scroll.sticky'); // Unbind previous scroll events
        let isSticky = false; // Ensure variable is declared
        let stickyOffset = calculateStickyOffset();
        let stickyHeadHeight = $('.sticky').innerHeight();
        $('.subbannerpanel').css({ 'margin-top': -$('.stickyEmpty').height() });

        function calculateStickyOffset() {
            if ($(window).outerWidth() > 1024) {
                return $(".subbannerpanel").height() - 150;
            } else {
                return $(".subbannerpanel").height() - 142;
            }
        }

        $(window).on('scroll.sticky', function () {
            let scrollTop = $(window).scrollTop();

            if (scrollTop > stickyOffset && !isSticky) {
                isSticky = true;
                $(".tabnavlinks").addClass("stickynavlinks");
                $(".sticky").addClass("active");
                $('.stickyEmpty').css('height', stickyHeadHeight);
            } else if (scrollTop <= stickyOffset && isSticky) {
                isSticky = false;
                $(".tabnavlinks").removeClass("stickynavlinks");
                $(".sticky").removeClass("active");
                $('.stickyEmpty').css('height', stickyHeadHeight);
                $('.subbannerpanel').css({ 'margin-top': -$('.stickyEmpty').height() });
            }
        });
    }

    // Determine which script to use based on current window width
    if ($(window).outerWidth() < 768) {
        handleBelow768();
    } else {
        handleAbove768();
    }
}

// Initialize the sticky script and reinitialize on window resize
$(document).ready(function () {
    initSticky();

    $(window).on('resize', function () {
        initSticky();
    });
});

if ($(".alertsPannel").length > 0) {
    $(this).addClass('active');
}

$(document).ready(function () {

    $('a[href*="#"]:not([href="#"]):not(a[name^="_ftnref"])').click(function () {
        _hash = this.hash;
        _scroll_it(_hash);
    });
    let topHeight = $("header").height();
    let _hash = window.location.hash;
    if (_hash.length > 0) {
        window.scrollTo(0, 0);
        setTimeout(function () {
            _scroll_it(_hash);
        }, 800);
    }
    function _scroll_it(_hash) {
        $('html,body').animate({
            scrollTop: $(_hash).offset().top - topHeight - 70
        }, 800);
    }
});


// NProgress
$('body').show();
$('.version').text(NProgress.version);
NProgress.start();
setTimeout(function () {
    NProgress.done();
    $('.fade').removeClass('out');
    $('.loaderBlock').detach();
    $('html').addClass('bodyBg')
}, 1500);


// Browser Identification
$(document).ready(function () {

    if (navigator.userAgent.indexOf('Edge') >= 0) { $('html').addClass('ieEdge'); }

    function getOS() {
        const userAgent = window.navigator.userAgent;

        const platforms = {
            MacOS: ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            iOS: ['iPhone', 'iPad', 'iPod'],
            Windows: ['Win32', 'Win64', 'Windows', 'WinCE'],
            Android: /Android/,
            Linux: /Linux/
        };

        for (const [os, values] of Object.entries(platforms)) {
            if (Array.isArray(values)) {
                if (values.some(value => userAgent.includes(value))) {
                    return os;
                }
            } else if (values.test(userAgent)) {
                return os;
            }
        }

        return null; // Return null if no OS matches
    }

    // Add the OS class to the HTML element
    const osClass = getOS();
    if (osClass) {
        $('html').addClass(osClass);
    }

    let isMobile = {
        Android: function () {
            return /Android/i.exec(navigator.userAgent) !== null;
        },
        BlackBerry: function () {
            return /BlackBerry/i.exec(navigator.userAgent) !== null;
        },
        iOS: function () {
            return /iPhone|iPad|iPod/i.exec(navigator.userAgent) !== null;
        },
        iPad: function () {
            return /iPad/i.exec(navigator.userAgent) !== null;
        },
        Opera: function () {
            return /Opera Mini/i.exec(navigator.userAgent) !== null;
        },
        Windows: function () {
            return /IEMobile/i.exec(navigator.userAgent) !== null;
        },
        any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    };

    if (isMobile.iOS()) {
        $('html').addClass('iOS');
        let userAgent = navigator.userAgent;
        let isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent); // Exclude Edge
        let isSafari = /Safari/.test(userAgent) && !isChrome; // Only Safari if not Chrome

        if (isChrome) {
            console.log("You are using Chrome!");
        }
        if (isSafari) {
            console.log("You are using Safari!");
        }
    }


    if (isMobile.Android()) {
        $('html').addClass('Android');
    }

});

$(document).ready(function () {
    let ua = navigator.userAgent;
    let isFirefox = /firefox/i.exec(ua);
    let isChrome = /chrome/i.exec(ua);
    let isEdge = /Edge/i.exec(ua);
    let isIE = /Trident.*rv[ :]*11\./i.exec(ua);

    if (isFirefox || isIE) {
        $('html').addClass("firefox");
    }
    if (isChrome || isIE) {
        $('html').addClass("chrome");
    }
    if (isEdge || isIE) {
        $('html').addClass("Edge");
    }
});


function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

// End Off
// Back to Top

$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
        $('.backtoTop').fadeIn(200); // Fade in the arrow
    } else {
        $('.backtoTop').fadeOut(200); // Else fade out the arrow
    }
});

$('.backtoTop').click(function () { // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0 // Scroll to top of body
    }, 500);
});

$(document).ready(function () {
    $('.header-menu .first-level-link').click(function () {
        $('.menusearchBlock').removeClass('act');
        $(".mhamburger").removeClass('is-active');
        $(".dkhamburger").removeClass("is-active");
    });

    $(".msubMenu").each(function () {
        $(this).wrapInner("<span></span>");
    });

    //Hamburger Menu
    // Mobile Menu Toggle
    $('.mhamburger').click(function (e) {
        e.preventDefault();
        $(this).trigger("blur");
        $('header').addClass('menuOpenState');
        $('html').toggleClass('menuOpened');
        $('.mnavWrapper').toggleClass('active');
        $('.innerloginWrapper').removeClass('active');
        $('.Loginbtn').removeClass('is-active');
        $(".mobileSearch").removeClass("act");
        $('.searchicon').removeClass('is-active');
    });
});

$(window).on("load", function (e) {
    $('.msubMenu').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        if ($this.hasClass("menuOpen")) {
            $this.removeClass('menuOpen');
            $this.parent().removeClass('mainActive');
            $this.parent().find('.inner').slideUp(200);
        } else {
            $this.closest('ul').find('.msubMenu').removeClass('menuOpen');
            $this.closest('ul').find('.mainActive').removeClass('mainActive');
            $this.closest('ul').find('.inner').slideUp(200);
            $this.addClass('menuOpen');
            $this.parent().addClass('mainActive');
            $this.parent().find('.inner').slideDown(200);
        }
    });


});

$(document).ready(function () {

    const $menusub = $('.headerWrapper .mainMenu .dropdownMenu');
    $(document).mouseup(function (e) {
        if (!$menusub.is(e.target) &&
            $menusub.has(e.target).length === 0) {
            $menusub.removeClass('menu-open');
            $(".headerWrapper .mainMenu .dropdownMenu").removeClass("menu-open");
        }
    });

    $('.headerWrapper .mainMenu .dropdownMenu a').click(function () {
        // $('.headerWrapper .mainMenu li.menu-open').removeClass('menu-open');
        // $(this).parent().addClass('menu-open'); 

        const $menuItem = $(this).parent();

        if ($menuItem.hasClass('menu-open')) {
            $menuItem.removeClass('menu-open');
        } else {
            $('.headerWrapper .mainMenu li.menu-open').removeClass('menu-open');
            $menuItem.addClass('menu-open');
        }
    });

    $('.menu__link,.menu__back').click(function (e) {
        setTimeout(function () {
            let txt = $(".menu__level--current").attr("aria-label");
            $('.menu__back span').text(txt);
        }, 750);
    });

});


$(window).on("load resize", function () {
    $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    if ($("header").hasClass("sticky")) {
        $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    }
});

$(document).ready(function () {
    const $menu = $('.header-menu li, .menusearchBlock, .loginDropdown');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) &&
            $menu.has(e.target).length === 0) {
            $menu.removeClass('active');
            $(".menusearchBlock").removeClass("act");
            $(".header-menu li").removeClass("active");

        }
    });

    $(window).on("load resize", function (e) {
        let headHgt = $('header').height(true);
        $('.mnavWrapper').css({ 'top': headHgt });
        $('.innerloginWrapper').css({ 'top': headHgt });
    });

});


$(function () {
    $('.menu-mega-blog').on('click', function () {
        $(".stickyEmpty").addClass('menuopen');
    });
    let hide = true;
    $('body').on("click", function () {
        if (hide) $('.stickyEmpty').removeClass('active');
        hide = true;
    });
    $('body').on('click', '.stickyEmpty', function () {
        let self = $(this);
        if (self.hasClass('menuopen')) {
            $('.stickyEmpty').removeClass('menuopen');
            return false;
        }
        $('.stickyEmpty').removeClass('menuopen');
        self.toggleClass('menuopen');
        hide = false;
    });
});
$('.mhamburger').click(function (f) {
    f.preventDefault();
    $(this).toggleClass('is-active')
    $('html').toggleClass('menuOpened');
    $('body').toggleClass('menuOpened');
});

$('.dkhamburger').click(function (f) {
    f.preventDefault();
    $(this).toggleClass('is-active');
    $('.menu-wrap').toggleClass('open');
});


if ($('.alertsPannel').length > 0) {
    $('.alertsPannel').each(function (idx, alert) {
        let alertId = $(this).attr('data-alert-id');
        let localStorageAlertContent = window.localStorage.getItem('emergencyAlertContent-' + alertId);
        let renderedAlertContent = $(this).find('.emergencyAlertContent').html();
        if (renderedAlertContent != localStorageAlertContent)
            $(this).fadeIn();
    });
}

if ($('.alertBox').length > 0) {
    $('.alertBox').each(function (idx, alert) {
        let alertId = $(this).attr('data-alert-id');
        let localStorageAlertContent = window.localStorage.getItem('popupAlertContent-' + alertId);
        let renderedAlertContent = $(this).find('.popContent').html();
        if (renderedAlertContent != localStorageAlertContent) {
            $(this).fadeIn();
            if (!$('html').hasClass('popUpOpen'))
                $('html').addClass('popUpOpen');
            setTimeout(function () {
                $('#alertBox-' + alertId).find('.popupWrap .wrap,.popUpWrapper').addClass('Open');
            }, 100);
        }
    });
}

$(".alertsPannelClose").on("click", function () {
    // Fade out the clicked alert
    let $alert = $(this).closest(".alertsPannel");
    $alert.fadeOut();

    // Add a class to hide the alert in the header
    $("header .alertsPannel").addClass('hideAlert');

    // Adjust other elements as needed
    setTimeout(function () {
        let heightSticky = $("header").height();
        $(".innerloginWrapper").css('top', heightSticky);
        $(".mobileSearch .desktopSearch").css('top', heightSticky);
        $(".stickyEmpty").css("height", heightSticky);
    }, 500);

    // Save a flag in local storage indicating that the alert has been closed
    let alertId = $alert.attr('data-alert-id');
    let emergencyAlertContentHtml = $alert.find('.emergencyAlertContent').html();
    window.localStorage.setItem('emergencyAlertContent-' + alertId, emergencyAlertContentHtml);
});

// Check if each alert has been closed previously
$(".alertsPannel").each(function () {
    let alertId = $(this).attr('data-alert-id');
    let alertClosed = window.localStorage.getItem('emergencyAlertClosed-' + alertId);
    let emergencyAlertContentHtml = $(this).find('.emergencyAlertContent').html();
    let localStorageAlertContent = window.localStorage.getItem('emergencyAlertContent-' + alertId);

    if (!alertClosed && localStorageAlertContent !== emergencyAlertContentHtml) {
        // Show the alert if it has not been closed previously and content has changed
        $(this).fadeIn();
    }
});


$(document).ready(function () {
    popupheight();
    function popupheight() {
        let topHeight = $(".stickyEmpty").height();
        $(".innerloginWrapper").css('top', topHeight);
        $(".mobileSearch .desktopSearch").css('top', topHeight);
    }
    $(window).on("resize", function () {
        setTimeout(function () {
            popupheight();
        }, 100);
    });
});

// Event handler for closing alerts
$(".footeralertsPannelClose").on("click", function () {
    // Fade out the clicked alert
    let $alert = $(this).closest(".alertsPannel.footeraletpanel");
    $alert.fadeOut();
    // Save a flag in local storage indicating that the alert has been closed
    let alertId = $alert.attr('data-alert-id');
    window.localStorage.setItem('footeralertsPannelClose-' + alertId, "true");
});

// Function to check if the alert has been closed previously
function checkAlertStatus() {
    $(".alertsPannel.footeraletpanel").each(function () {
        let alertId = $(this).attr('data-alert-id');
        let alertClosed = window.localStorage.getItem('footeralertsPannelClose-' + alertId);

        // Check if the alert has not been closed previously
        if (!alertClosed) {
            // Show the alert
            $(this).fadeIn();
        } else {
            // Hide the alert if it was closed previously
            $(this).hide();
        }
    });
}

// Hide all alerts immediately on page load
$(".alertsPannel.footeraletpanel").hide();

// Call the checkAlertStatus function after a short delay to ensure consistency
$(document).ready(function () {
    setTimeout(checkAlertStatus, 100); // Adjust the delay as needed
});



$(".popup-close").on("click", function () {
    let alertId = $(this).attr('data-alert-id');
    $(this).closest("#alertBox-" + alertId).fadeOut();
    let popupAlertContentHtml = $('#popupAlertContent-' + alertId).html();
    window.localStorage.setItem('popupAlertContent-' + alertId, popupAlertContentHtml);
    $('#alertBox-' + alertId).find('.popupWrap .wrap,.popUpWrapper').removeClass('Open');
});

$(window).on("resize", function () {
    if ($(window).width() >= 500) {
        $('.mobileMenu').removeClass('is-active');
        $('.mhamburger').removeClass('is-active');
        $('.searchicon').removeClass('is-active');
        $('.menusearchBlock').removeClass('act');
        $('.mobileSearch').removeClass('act');
        $('.dropdownMenu.menu-mega-blog').removeClass('menu-open');
        //$('.innerloginWrapper').removeClass('active');
        $('body').removeClass('menuOpened');
        $('.nav-wrapper').removeClass('show-menu');
        $('.formSearch').removeClass('searchOpen');
        $('#search-toggle').removeClass('searchclose');
    }
}).resize();


$(document).ready(function () {
    "use strict";
    let progressPath = document.querySelector('.progress-wrap path');
    let pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    let updateProgress = function () {
        let scroll = $(window).scrollTop();
        let height = $(document).height() - $(window).height();
        let progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    let offset = 50;
    let duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
});

$(document).ready(function () {

    //$(".selectMenu").selectmenu();

    $('.selectMenu').selectmenu({
        open: function () {
            $('div.ui-selectmenu-menu li.ui-menu-item').each(function (idx) {
                $(this).addClass($('select option').eq(idx).attr('class'))
            })
        }
    });

    $(window).on("resize", function (e) {
        $('[role="combobox"][aria-expanded="true"]').each(function () {
            $(this).prev().selectmenu("close").selectmenu("close");
        });
    });

    $(window).scroll(function () {
        $('[role="combobox"][aria-expanded="true"]').each(function () {
            $(this).prev().selectmenu("close").selectmenu("close");
        });
    });

});


$(document).ready(function () {
    (function ($) {
        this.MobileNav = function () {
            this.curItem = null;
            this.curLevel = 0;
            this.transitionEnd = _getTransitionEndEventName();

            let defaults = {
                initElem: ".main-menu",
                menuTitle: "Menu"
            }

            // Check if MobileNav was initialized with some options and assign them to the "defaults"
            if (arguments[0] && typeof arguments[0] === "object") {
                extendDefaults(defaults, arguments[0]);
            }

            // Add to the "defaults" ONLY if the key is already in the "defaults"
            function extendDefaults(source, extender) {
                for (let option in extender) {
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
                let initElem = ($(defaults.initElem).length) ? $(defaults.initElem) : false;

                if (initElem) {
                    defaults.initElem = initElem;
                    _clickHandlers(MobileNav);
                    _updateMenuTitle(MobileNav);
                } else {
                    console.log(defaults.initElem + " element doesn't exist, menu not initialized.");
                }
            }(this));

            function _getTransitionEndEventName() {
                let i,
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
                defaults.initElem.on('click', '.has-dropdown > .has-dropdown-icon', handleDropdownClick.bind(null, menu));
                defaults.initElem.on('click', '.nav-toggle .nav-title .home', handleHomeClick.bind(null, menu));
                defaults.initElem.on('click', '.nav-toggle .nav-title .back', handleBackClick.bind(null, menu));
            }

            function handleDropdownClick(menu, e) {
                e.preventDefault();
                menu.curItem = $(this).parent();
                _updateActiveMenu(menu);
                let title = $(this).parent().parent().find('.itemtitle').text();
                $('.nav-toggle .nav-title .back').text(title);
            }

            function handleHomeClick(menu) {
                _updateActiveMenu(menu, 'main');
                //alert('hi');
            }

            function handleBackClick(menu) {
                _updateActiveMenu(menu, 'back');
                //alert('hi');
            }




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
                if (direction === "main") {
                    //alert("hi");
                    menu.curItem = menu.curItem.closest('li');
                    console.log(menu.curItem);
                    menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                    $('.primarymeu li.has-dropdown').removeClass('nav-dropdown-open nav-dropdown-active');
                    _updateMenuTitle(menu);
                }
            };

            // Update main menu title to be the text of the clicked menu item
            function _updateMenuTitle(menu) {
                //let title = defaults.menuTitle;
                if (menu.curLevel > 0) {
                    //let title = menu.curItem.children('a').text();
                    defaults.initElem.find('.nav-toggle').addClass('back-visible');
                } else {
                    defaults.initElem.find('.nav-toggle').removeClass('back-visible');
                }
                if (menu.curLevel > 1) {
                    $('.nav-wrapper nav .nav-toggle.back-visible .nav-title .back').show();
                } else {
                    $('.nav-wrapper nav .nav-toggle.back-visible .nav-title .back').hide();
                }
                //$('.nav-title .nav-heading-title').text(title);
            };

            // Slide the main menu based on current menu depth
            function _slideMenu(menu, direction) {
                if (direction === "back") {
                    menu.curLevel = (menu.curLevel > 0) ? menu.curLevel - 1 : 0;
                } else {
                    menu.curLevel += 1;
                }
                if (direction === "main") {
                    menu.curLevel = (menu.curLevel < 0) ? menu.curLevel - 1 : 0;
                }
                defaults.initElem.children('.menu-section').css({
                    "transform": "translateX(-" + (menu.curLevel * 100) + "%)"
                });
            };
        }
    }(jQuery));

    $(document).ready(function () {
        // let MobileMenu = new MobileNav({
        //     initElem: "nav",
        //     menuTitle: "Push menu demo",
        // });
        $('.mhamburger').on('click', function (e) {
            e.preventDefault();
            $('.nav-wrapper').toggleClass('show-menu');
            $('.back-visible').trigger('click');
        });

        $('.nav-toggle').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.primarymeu li.has-dropdown .has-dropdown-icon').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.topmeu li.has-dropdown .has-dropdown-icon').on('click', function (e) {
            $('.nav-wrapper').toggleClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });
        $('.nav-wrapper nav .innermenu .homemenuitem').on('click', function (e) {
            $('.nav-toggle .nav-title .home').trigger('click');
        });
        $('.nav-wrapper nav .innermenu .submenuitem').on('click', function (e) {
            $('.nav-toggle .nav-title .back').trigger('click');
        });
    });
});


$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 210) {
        //alert ("footer reached!");
        $('.newsletterPannel form .txtBox').blur();
    }
});


//Phone Number Format
$(".phone-format").text(function (i, text) {
    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return text;
});
$(document).ready(function () {
    setTimeout(function () {
        $('.getstartedform .umbraco-forms-page fieldset').prepend("<legend class='screen-reader-text'>Signup Form</legend>");
    }, 500);
});

$(document).ready(function () {
    if ($(".videoPlayer").length > 0) {
        jQuery("a.videoPlayer").YouTubePopUp();
    }
});

$(document).ready(function () {
    (function ($) {
        $.fn.visible = function (partial) {
            var $t = $(this),
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;
            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };

    })(jQuery);
    var win = $(window);
    var allMods = $(".module");
    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });
    win.scroll(function (event) {
        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in");
            }
        });
    });
});

setTimeout(function () { $('header').addClass('come-in') }, 500);
$(document).ready(function () {

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function () {
        $('.module').each(function () {
            var activeColor = $(this).attr('class');
            if ($(this).isInViewport()) {
                $(this).addClass('come-in');
            }
        });
    });
});

$(document).ready(function () {
    $('.ac-title h2').click(function (e) {
        $(this).find("span").toggleClass('arrow-up');
        $(this).toggleClass('acc-active');
        let getID = $(this).parent().attr('data-in');
        $(getID).slideToggle();
    });
});

$(document).ready(function () {
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream) {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
    }
});


$(document).ready(function () {
    function adjustNavPadding() {
        let subbannerHeight;
        if ($(window).outerWidth() <= 767) {
            subbannerHeight = $('.subbannerpanel').height() + 14;
        } else if ($(window).outerWidth() <= 876) {
            subbannerHeight = $('.subbannerpanel').height() + 12;
        } else if ($(window).outerWidth() <= 1023) {
            subbannerHeight = $('.subbannerpanel').height() + 13;
        } else if ($(window).outerWidth() <= 1279) {
            subbannerHeight = $('.subbannerpanel').height() + 31.5;
        } else {
            subbannerHeight = $('.subbannerpanel').height() + 32;
        }
        $('.subbannerpanel').css({ 'margin-top': - $('.stickyEmpty').height() });
        $('.tabnavlinks').css('max-width', $('.grid-container').width());
        $('.tabnavlinks').css('top', subbannerHeight - $('.tabnavlinks').height());
    }
    adjustNavPadding();

    $(window).on("resize", function () {
        setTimeout(function () {
            adjustNavPadding();
        }, 200);
    });
});
