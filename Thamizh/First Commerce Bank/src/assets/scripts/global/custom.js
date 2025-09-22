
let shrinkHeader = 70;
let sticyhead;
$(window).scroll(function () {
    let scroll = getCurrentScroll();
    sticyhead = $('.sticky').height();
    if (scroll >= shrinkHeader) {
        $('.sticky').addClass('active');
        $('.stickyEmpty').css('height', sticyhead);
        $('.header-menu .mainMenu').addClass('hidden');
    }
    else {
        $('.sticky').removeClass('active');
        $('.stickyEmpty').css('height', sticyhead);
        $('.sticky .loginCta .login ').removeClass('selected');
        $('.sticky .innerloginWrapper').removeClass('active');
        $('.header-menu .mainMenu').addClass('hidden');
    }
});
function getCurrentScroll() {
    return window.scrollY || document.documentElement.scrollTop;
}
$(window).on("resize", function (e) {
    getCurrentScroll();
});
if ($(".alertsPannel").length > 0) {
    $(this).addClass('active');
}

$(document).ready(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        _hash = this.hash;
        _scroll_it(_hash);
    });
    let topHeight = $(".stickyEmpty").height();
    let _hash = window.location.hash;
    if (_hash.length > 0) {
        window.scrollTo(0, 0);
        setTimeout(function () {
            _scroll_it(_hash);
        }, 1000);
    }
    function _scroll_it(_hash) {
        $('html,body').animate({
            scrollTop: $(_hash).offset().top - topHeight - 30
        }, 1000);
    }
});

//Speedbump

if ($('.speedBump').length > 0) {
    const urls = jQuery("#excludeUrl").val();
    const urlsData = jQuery.parseJSON(urls);
    const urlArray = urlsData.map(jsonUrls => new URL(jsonUrls["excludeUrl"]).hostname);

    const isExternalLink = (href) => {
        const currentHostPattern = new RegExp('/' + window.location.host + '/');
        return !currentHostPattern.test(href) &&
            !urlArray.includes(href) &&
            !href.includes("mailto:") &&
            !href.includes("tel:") &&
            !href.includes("javascript:void(0)") &&
            href !== "#";
    };

    $('a').not(".noSpeedBump").each(function () {
        if (isExternalLink(this.href)) {
            $(this).addClass("speedBumpLink").attr({
                target: "_blank",
                rel: "noopener"
            });

            // Remove the class if the link matches any domain in urlArray
            if (urlArray.some(domain => this.href.includes(domain))) {
                $(this).removeClass("speedBumpLink");
            }
        }
    });

    $('a[target="_blank"]').attr("rel", "noopener");

    $(".speedBumpLink").click(function (e) {
        e.preventDefault();
        const link = $(this).attr("href");
        $("#urlText").html(link);
        $(".speedBump .proceed").attr("href", link);
        $(".speedBump").addClass('active');
    });

    $(".speedBump .proceed").click(function (e) {
        e.preventDefault();
        const link = $(this).attr("href");

        // Open the link in a new tab
        window.open(link, "_blank", "noopener");
        $(".speedBump").removeClass('active');
    });

    $(".speedBump .cancel, .speedContainer .close, .speedContainer a").click(function (e) {
        e.preventDefault();
        $(".speedBump").removeClass('active');
    });
}


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
        let isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent) && !/OPR/.test(userAgent) && !/CriOS/.test(userAgent); // Exclude Edge, Opera, and Chrome on iOS
        let isSafari = /Safari/.test(userAgent) && !isChrome && !/CriOS/.test(userAgent); // Only Safari if not Chrome or Chrome on iOS
    
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
    const $menu = $('.header-menu li, .menusearchBlock');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) &&
            $menu.has(e.target).length === 0) {
            $menu.removeClass('active');
            $(".menusearchBlock").removeClass("act");
            $(".header-menu li").removeClass("active");


        }
    });

    $('.header-menu .first-level-link').click(function () {
        $('.menusearchBlock').removeClass('act');
        $(".mhamburger").removeClass('is-active');
    });

    $('.menusearchBlock button.submit').click(function () {
        $('.menusearchBlock').toggleClass('act');
        $('.search-bar-container .yxt-SearchBar-input').focus();
        $('.mainManu li').removeClass('active');
        $('.mainNavigation li').removeClass('active');
        $('.mobileMenu, .mhamburger').removeClass('active');
        $('.mnavWrapper').removeClass('active');
        $(".mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger ").removeClass('active');
        $('.nav-wrapper').removeClass('show-menu');
        $('body').removeClass('menuOpened');
        $('.innerloginWrapper').removeClass('active');
        $('.login').removeClass('selected');
        $('#inputSearch').focus();
    });
    $('#inputSearch').keyup(function () {
        let minlength = 3;
        let value = $(this).val();
        if (value != "" && value.length > 2) {
            if (value.length >= minlength) {
                setTimeout(function(){ 
                   $('.rserachLst, .bottomBtn').show();
                }, 1000);
            }
        } else {
            setTimeout(function () {
                $('.rserachLst, .bottomBtn').hide();
            }, 500);
        }
    });
    $('#inputSearchMobile').keyup(function () {
        let minlength = 3;
        let value = $(this).val();
        if (value != "" && value.length > 2) {
            if (value.length >= minlength) {
                setTimeout(function(){ 
                   $('.rserachLst, .bottomBtn').show();
                   $("#inputSearchMobile").addClass("inputBg");
                   $('.searchBoxMobile .wraps .searchIcon').hide();
                   $('.searchBoxMobile .wraps .closeIcon').show();
                }, 1000);
            }
        } else {
            setTimeout(function () {
                $('.rserachLst, .bottomBtn').hide();
                $("#inputSearchMobile").removeClass("inputBg");
                $('.searchBoxMobile .wraps .closeIcon').hide();
                $('.searchBoxMobile .wraps .searchIcon').show();
            }, 500);
        }
    });
});


$(document).ready(function () {
    $('.searchBoxMobile .wraps .closeIcon').click(function (e) {
        e.preventDefault();
        $(this).hide();
        $('.searchBoxMobile .wraps .searchIcon').show();
        $('.rserachLst, .bottomBtn').hide();
        $('#inputSearchMobile').val('');
        $("#inputSearchMobile").removeClass("inputBg");
    });

    $(window).on("load resize", function (e) {
        let headHgt = $('header').height(true);
        $('.mnavWrapper').css({
            'top': headHgt
        });
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
        $('.login').removeClass('selected');
    });
});

$(window).on("load", function (e) {
    $('.msubMenu').on('click', function (e) {
        if ($(window).width() <= 767) {

            e.preventDefault();
            let $this = $(this);
            $this.parent().parent().each(function () {
                $(this).find('.inner').not($this).removeClass('mainActive');
                $(this).find('a.msubMenu').not($this).removeClass('menuOpen');
                $(this).find('a.msubMenu').next().slideUp();
            });
            if (!$this.hasClass("menuOpen")) {
                $this.addClass('menuOpen');
                $this.next().addClass('mainActive');
                $this.next().slideToggle();
            } else {
                $this.parent().parent().find('li .inner').removeClass('mainActive');
                $this.removeClass('menuOpen');
                $this.next().removeClass('mainActive');
                $this.next().slideUp();
            }
        }
    });
    if ($(window).width() >= 767) {
        $('.mnavWrapper ul li a.msubMenu').removeClass('menuOpen');
        $('.mnavWrapper ul li .inner').removeClass('mainActive');
    }
});
setTimeout(function () { $('header').addClass('come-in') }, 500);
setTimeout(function () { $('.bannerpanel.banner-animate').removeClass('banner-animate') }, 1000);

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

    $('.mhamburger').click(function (f) {
        f.preventDefault();
        $('this').toggleClass('is-active')
        $('body').toggleClass('menuOpened');
        $('.mobileMenu').toggleClass('is-active');
        $('body').removeClass('loginopen');
    });

    $(window).on("load resize", function (e) {
        let headHgt = $('header').height(true);
        $('.mnavWrapper').css({ 'top': headHgt });
        $('.innerloginWrapper').css({ 'top': headHgt });
    });

    $('.msubMenu').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        $(this).parent().parent().find('.hov').not($(this).parent()).removeClass('mainActive');
        $(this).parent().parent().find('.hov').each(function () {
            $(this).find("ul").not($this.next()).slideUp();
        });

        if ($(this).parent().hasClass("mainActive")) {
            $(this).parent().toggleClass('mainActive');
            $this.next().slideUp();
        } else {
            $(this).parent().toggleClass('mainActive');
            $this.next().slideDown();
        }

    });
});

//Hamburger Menu

$(document).ready(function () {
    // Header
    $('.menu__link,.menu__back').click(function (e) {
        setTimeout(function () {
            let txt = $(".menu__level--current").attr("aria-label");
            $('.menu__back span').text(txt);
        }, 750);
    });
});

// Menu
//Hamburger Tablandscape and Desktop

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
    let attr = $(this).attr('data-tab');
    if (typeof attr !== typeof undefined && attr !== false) {
        let tab_id = $(this).attr('data-tab');
        $('.mobileMenu').addClass('menuOpened');
        $('.mobileNav .subMenu li a').removeClass('active');
        $('.mobileMenu .tab-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
    }
});

$('.mhamburger').click(function (f) {
    f.preventDefault();
    $(this).toggleClass('is-active')
    $('html').toggleClass('menuOpened');
});


$(document).ready(function () {
    $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function () {
        $('.module').each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('come-in');
            }
        });
    });
});

$(function () {
    $('.login').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('selected');
        $(".innerloginWrapper").toggleClass('active');
        $(".menusearchBlock").removeClass("act");
        $(".mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger").removeClass('active');
        $('.Loginbtn').toggleClass('is-active')
    });
    $('.Loginbtn').on('click', function (event) {
        $(this).toggleClass('is-active');
        $(".innerloginWrapper").toggleClass('active');
        $(".menusearchBlock").removeClass("act");
        $(".mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger").removeClass('active');
        $('.nav-wrapper').removeClass('show-menu');
        $(".mobileSearch").removeClass("act");
        $('.searchicon').removeClass('is-active');
        $('.login').toggleClass('selected');
    });
});
$(document).ready(function () {
    (function ($) {
        $.fn.visible = function (partial) {
            let $t = $(this),
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
    let win = $(window);
    let allMods = $(".module");
    allMods.each(function (i, el) {
        let elall = $(el);
        if (elall.visible(true)) {
            elall.addClass("come-in");
        }
    });
    win.scroll(function (event) {
        allMods.each(function (i, el) {
            let el1 = $(el);
            if (el1.visible(true)) {
                el1.addClass("come-in");
            }
        });
    });
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
    function popupheight(){
        let  topHeight = $(".stickyEmpty").height();
        $(".innerloginWrapper").css('top', topHeight);
        $(".mobileSearch .desktopSearch").css('top', topHeight);
    }
    $(window).on("resize", function ()
    {   setTimeout(function() {
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
    setTimeout(function () {
        $('#alertBox-' + alertId).find('.popupWrap .wrap,.popUpWrapper').removeClass('Open');
    }, 100);
});

$(window).on("resize", function () {
    if ($(window).width() >= 500) {
        $('.mobileMenu').removeClass('is-active');
        $('.mhamburger').removeClass('is-active');
        $('.menusearchBlock').removeClass('act');
        $('.dropdownMenu.menu-mega-blog').removeClass('menu-open');
        $('body').removeClass('menuOpened');
        $('.nav-wrapper').removeClass('show-menu');
        $('.formSearch').removeClass('searchOpen');
        $('#search-toggle').removeClass('searchclose');
        $('.headerMainWrapper .header-menu .menu-mega-blog .flexBox.navInner').removeAttr("style");
    }
}).resize();

$(document).ready(function () {
    $('.mainMenu li.menu-mega-blog .first-level-link').click(function () {
        $('.header-menu .mainMenu').removeClass('hidden');
        let $parentLi = $(this).parent();
        if ($parentLi.hasClass('menu-open')) {
            $parentLi.removeClass('menu-open');
            $('.headerMainWrapper .header-menu .menu-mega-blog .flexBox.navInner').removeAttr("style");
        } else {
            $('.mainMenu li.menu-open').removeClass('menu-open');
            $parentLi.addClass('menu-open');
            scrollmenu(); 
        }
        function scrollmenu(){
            let winHet = $(window).height();
            let magaMenuHet = $('.headerMainWrapper .header-menu .menu-mega-blog .flexBox.navInner').height();
        
            console.log("Window Height: ", winHet);
            console.log("Menu Height: ", magaMenuHet);
            if (magaMenuHet >= winHet) {
                $('.headerMainWrapper .header-menu .menu-mega-blog .flexBox.navInner').css('max-height', winHet - 200);
            }
        }
        
        $('.formSearch').removeClass('searchOpen');
        $('#search-toggle').removeClass('searchclose');
        $('.innerloginWrapper').removeClass('active');
        $('.login').removeClass('selected');
        $('.Loginbtn').removeClass('is-active');
    });
    
    const $menu = $('.menu-mega-blog');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) &&
            $menu.has(e.target).length === 0) {
            $menu.removeClass('menu-open');
            $(".megaMenu li").removeClass("menu-open");
            $('.headerMainWrapper .header-menu .menu-mega-blog .flexBox.navInner').removeAttr("style");
        }
    });


    const $menusub = $('.secondary-nav .mainmenu .singlemenu');
    $(document).mouseup(function (e) {
        if (!$menusub.is(e.target) &&
            $menusub.has(e.target).length === 0) {
            $menusub.removeClass('menu-open');
            $(".secondary-nav .mainsubMenu li").removeClass("menu-open");
        }
    });
    
    const $menuLang = $('.languageDropdown .singlemenu');
    $(document).mouseup(function (e) {
        if (!$menuLang.is(e.target) &&
            $menuLang.has(e.target).length === 0) { 
            $menuLang.removeClass('menu-open');
            $(".languageDropdown li").removeClass("menu-open");
        }
    });    

    $('.secondary-nav .mainmenu .singlemenu a').click(function () {
        $('.secondary-nav .mainsubMenu li.menu-open').removeClass('menu-open');
        $(this).parent().addClass('menu-open');
        $('.formSearch').removeClass('searchOpen'); 
        $('#search-toggle').removeClass('searchclose');
        $('.innerloginWrapper').removeClass('active');
        $('.login').removeClass('selected');
    });

    $('.languageDropdown .singlemenu a').click(function () { 
        $('.languageDropdown .singlemenu.menu-open').removeClass('menu-open'); 
        $(this).parent().addClass('menu-open');
    });
    
});

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

    $(".selectMenu").each(function () {
        $(this).selectmenu({
            open: function (event, ui) {
                let menu = $("#" + $(this).attr("id") + "-menu"); // Target specific menu
                $(this).parent().addClass("zIndex");
                menu.removeClass("curvermenu");
                menu.css("top", "-=0px");
            },
            close: function (event, ui) {
                $(this).parent().removeClass("zIndex");
            },
        });
    });
    
    $(".selectMenuCurve").each(function () {
        $(this).selectmenu({
            open: function (event, ui) {
                let menu = $("#" + $(this).attr("id") + "-menu"); // Target specific menu
                console.log(menu.parent());
                $(this).parent().addClass("zIndex");
                menu.parent().addClass("curvermenu");
                menu.parent().css("top", "-=40px");
                $(".siteInner").css('z-index', 'unset');
            },
            close: function (event, ui) {
                $(this).parent().removeClass("zIndex");
                $(".siteInner").css('z-index', '999');
            },
        });
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
        this.MobileNav = function (options) {
            this.curItem = null;
            this.curLevel = 0;
            this.transitionEnd = getTransitionEndEventName();

            let defaults = {
                initElem: ".main-menu",
                menuTitle: "Menu"
            };

            if (options && typeof options === "object") {
                extendDefaults(defaults, options);
            }

            const initElem = initializeMenu(defaults);

            if (initElem) {
                defaults.initElem = initElem;
                attachClickHandlers(this, defaults);
                updateMenuTitle(this, defaults);
            } else {
                console.log(defaults.initElem + " element doesn't exist, menu not initialized.");
            }

            this.defaults = defaults; // Assigning `defaults` to the `MobileNav` instance for reference.
        };

        // Top-Level Functions

        function initializeMenu(defaults) {
            return ($(defaults.initElem).length) ? $(defaults.initElem) : false;
        }

        function extendDefaults(source, extender) {
            for (let option in extender) {
                if (source.hasOwnProperty(option)) {
                    source[option] = extender[option];
                }
            }
        }

        function getTransitionEndEventName() {
            const el = document.createElement('div');
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'otransitionend',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (let i in transitions) {
                if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                    return transitions[i];
                }
            }
        }

        function attachClickHandlers(menu, defaults) {
            const initElem = defaults.initElem;

            initElem.on('click', '.has-dropdown > .has-dropdown-icon', function (e) {
                handleDropdownClick(e, menu, defaults);
            });

            initElem.on('click', '.nav-toggle .nav-title .home', function () {
                updateActiveMenu(menu, 'main', defaults);
            });

            initElem.on('click', '.nav-toggle .nav-title .back', function () {
                updateActiveMenu(menu, 'back', defaults);
            });
        }

        function handleDropdownClick(event, menu, defaults) {
            event.preventDefault();
            menu.curItem = $(event.currentTarget).parent();
            updateActiveMenu(menu, undefined, defaults);
            const title = menu.curItem.parent().find('.itemtitle').text();
            $('.nav-toggle .nav-title .back').text(title);
        }

        function updateActiveMenu(menu, direction, defaults) {
            slideMenu(menu, direction, defaults);
            adjustMenuClasses(menu, direction);
            updateMenuTitle(menu, defaults);
        }

        function adjustMenuClasses(menu, direction) {
            if (direction === "back") {
                menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
                menu.curItem = menu.curItem.parent().closest('li');
                menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
            } else if (direction === "main") {
                menu.curItem = menu.curItem.closest('li');
                $('.primarymeu li.has-dropdown').removeClass('nav-dropdown-open nav-dropdown-active');
            } else {
                menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
            }
        }

        function updateMenuTitle(menu, defaults) {
            const initElem = defaults.initElem;

            if (menu.curLevel > 0) {
                initElem.find('.nav-toggle').addClass('back-visible');
            } else {
                initElem.find('.nav-toggle').removeClass('back-visible');
            }

            toggleBackButton(menu);
        }

        function toggleBackButton(menu) {
            if (menu.curLevel > 1) {
                $('.nav-wrapper nav .nav-toggle.back-visible .nav-title .back').show();
            } else {
                $('.nav-wrapper nav .nav-toggle.back-visible .nav-title .back').hide();
            }
        }

        function slideMenu(menu, direction, defaults) {
            if (direction === "back") {
                menu.curLevel = (menu.curLevel > 0) ? menu.curLevel - 1 : 0;
            } else if (direction === "main") {
                menu.curLevel = 0;
            } else {
                menu.curLevel += 1;
            }

            defaults.initElem.children('.menu-section').css({
                "transform": "translateX(-" + (menu.curLevel * 100) + "%)"
            });
        }
    }(jQuery));

    // Initialization and Event Handlers
    $(document).ready(function () {
        MobileNav({
            initElem: "nav",
            menuTitle: "Push menu demo",
        });

        attachGlobalClickHandlers();
    });

    function attachGlobalClickHandlers() {
        $('.mhamburger').on('click', function (e) {
            e.preventDefault();
            $('.nav-wrapper').toggleClass('show-menu');
            $('.back-visible').trigger('click');
        });

        $('.nav-toggle').on('click', function () {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.primarymeu li.has-dropdown .has-dropdown-icon').on('click', function () {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.topmeu li.has-dropdown .has-dropdown-icon').on('click', function () {
            $('.nav-wrapper').toggleClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.nav-wrapper nav .innermenu .homemenuitem').on('click', function () {
            $('.nav-toggle .nav-title .home').trigger('click');
        });

        $('.nav-wrapper nav .innermenu .submenuitem').on('click', function () {
            $('.nav-toggle .nav-title .back').trigger('click');
        });
    }
});



$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 210) {
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
    $('.ac-title h2').click(function (e) {
        $(this).find("span").toggleClass('arrow-up');
        $(this).toggleClass('acc-active');
        let getID = $(this).parent().attr('data-in');
        $(getID).slideToggle();
    });
});


$(document).ready(function () {
    if ($('.checking').length > 0) {
        resize();
    }

    function resize() {
        let tableIndex = 1;
        $('body .checking').each(function () {
            processTable($(this), tableIndex);
            tableIndex++;
        });
    }

    function processTable($table, tableIndex) {
        $table.attr('id', `tablenormal${tableIndex}`).addClass('responsive_table');

        let headers = [];
        let headerStyles = [];
        let vInsertAfter = `#tablenormal${tableIndex}`;
        const hasHeaders = $table.find('tr th').length > 0;

        if (hasHeaders) {
            collectHeaders($table, headers, headerStyles);
            createResponsiveTablesWithHeaders($table, tableIndex, headers, headerStyles, vInsertAfter);
        } else {
            createResponsiveTablesWithoutHeaders($table, tableIndex, vInsertAfter);
        }
    }

    function collectHeaders($table, headers, headerStyles) {
        $table.find('tr th').each(function () {
            headers.push($(this).html());
            headerStyles.push($(this).css('background-color'));
        });
    }

    function createResponsiveTablesWithHeaders($table, tableIndex, headers, headerStyles, vInsertAfter) {
        let rowIndex = 1;

        $table.find('tr').each(function () {
            if (rowIndex > 1) {
                let cellIndex = 0;
                const tableId = `tablemobile${tableIndex}${rowIndex}`;
                $('<table />', { 'class': 'responsive_table', 'id': tableId }).insertAfter(vInsertAfter);

                $(this).find('td').each(function () {
                    createRowWithHeader(headers[cellIndex], headerStyles[cellIndex], $(this).html(), `#${tableId}`);
                    cellIndex++;
                });

                vInsertAfter = `#${tableId}`;
            }
            rowIndex++;
        });
    }

    function createResponsiveTablesWithoutHeaders($table, tableIndex, vInsertAfter) {
        let rowIndex = 1;

        $table.find('tr').each(function () {
            const tableId = `tablemobile${tableIndex}${rowIndex}`;
            $('<table />', { 'class': 'responsive_table noheader_table', 'id': tableId }).insertAfter(vInsertAfter);

            let cellIndex = 0;
            $(this).find('td').each(function () {
                const content = $(this).html().trim();
                if (content !== '&nbsp;') {
                    const bgColor = cellIndex % 2 === 0 ? '#fafafa' : '#eeeeee';
                    createRowWithoutHeader(content, bgColor, `#${tableId}`);
                    cellIndex++;
                }
            });

            vInsertAfter = `#${tableId}`;
            rowIndex++;
        });
    }

    function createRowWithHeader(header, bgColor, content, tableId) {
        $('<tr/>')
            .append($('<td/>', { 'html': header, 'style': `background-color:${bgColor};font-weight:bold` }))
            .append($('<td/>', { 'html': content }))
            .appendTo($(tableId));
    }

    function createRowWithoutHeader(content, bgColor, tableId) {
        $('<tr/>')
            .append($('<td/>', { 'html': content, 'style': `background-color:${bgColor}` }))
            .appendTo($(tableId));
    }
});


$(document).ready(function () {
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream)
    {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
    }
});

$(document).ready(function() {
    $('.tabHorizontal [data-toggle="tab"]').click(function(e) {
        e.preventDefault();        
        let $tabContainer = $(this).closest('.tabHorizontal'); 
        let $targetTab = $($(this).data('target'));         
        $tabContainer.find('.nav-tabs li').removeClass("active");
        $tabContainer.find('.nav-tabs li a').removeClass("active");
        $tabContainer.next('.tab-content').find('.tab-pane').removeClass("active show");         
        $(this).parent().addClass("active");
        $(this).addClass("active");
        $targetTab.addClass("active show");         
        $tabContainer.next('.tab-content').find('.tab-pane').css('transform', 'translateX(-100%)');
        $targetTab.css('transform', 'translateX(0)');        
        return false;
    });
});



$(document).ready(function () {
    
    $("#findbranch").submit(function(){
        if ($("#cityzipcode").val()== '') {
            $('.error-text').show();
            return false;
        }
    });

    $("#cityzipcode").keypress(function () {
        $('.error-text').hide();
    }); 
});

$('.searchIcon').click(function () {   
    $('#inputSearchMobile').focus();
});

$(document).ready(function() {
    function adjustFooterPadding() {
        $('.progress-wrap.active-progress').css({ 'bottom': $('footer').outerHeight() });
        if ($(window).outerWidth() >= 1024) {
            $('.siteInner').css({'padding-bottom': $('footer').outerHeight()});
            $('.main').removeAttr("style");
        } else {
            $('.siteInner').removeAttr("style");
            let windowheight = $(window).innerHeight();
            let footerheight = $("footer").innerHeight();
            let headerheight = $("header").innerHeight();
            let window_height = footerheight + headerheight;
            let main_height = windowheight - window_height;
            $('.main').css({ 'min-height': main_height });
        }
        if ($(window).outerWidth() >= 768) {
            let footercolwidth = $('.primaryfooter .column-4').width();
            $('.relationshipmanager').css({ 'max-width': footercolwidth });
        }
    }

    adjustFooterPadding();

    $(window).on("resize load", function() {
        adjustFooterPadding();
    });
    
});

$(document).ready(function() {
    $('#manager-filter').on('selectmenuchange', function() {
        $('.managerform-overlay').fadeIn();
        $('body').addClass('scroll-hidden');
    });
    $('.managerform-close').on('click', function() {
        $('.managerform-overlay').fadeOut();
        $('body').removeClass('scroll-hidden');
        $('#manager-filter').val('0').selectmenu('refresh');
    });
    $('.umbraco-forms-navigation .cancel').on('click', function() {
        $('.managerform-close').trigger('click');
    });
    
});


$(document).ready(function() {
  $('.menuWrapper .menu-mega-blog-nav .navlinks').find("a[id^='nav-']").mouseenter(function() {
    var targetId = $(this).attr('id');
    $('.col .two-Column').removeClass('active').css({ display: 'none' });
    if (targetId) {
      $('.two-Column[data-id="' + targetId + '"]').fadeIn(300).addClass('active').css({ display: 'flex' });
    }
  });
});
