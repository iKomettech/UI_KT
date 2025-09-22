
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
var shrinkHeader = 80;
var sticyhead;
$(window).scroll(function () {
    var scroll = getCurrentScroll();
    sticyhead = $('.sticky').height();
    //console.log(sticyhead);
    if (scroll >= shrinkHeader) {
        $('.sticky').addClass('active');
        $('.stickyEmpty').css('height', sticyhead);
        $('.bioPanel').addClass('stickyBio');
        $('.threequestiondetailspanel').addClass('stickyColumn');
    }
    else {
        $('.sticky').removeClass('active');
        $('.bioPanel').removeClass('stickyBio');
        $('.threequestiondetailspanel').removeClass('stickyColumn');
        setTimeout(function () {
            sticyhead = $('.sticky').height();
            $('.stickyEmpty').css('height', sticyhead);
        }, 50);
    }
});
function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}
$(window).on("resize", function (e) {
    getCurrentScroll();
});
if ($(".alertsPannel").length > 0) {
    $(this).addClass('active');
}

$(document).ready(function () {

    //practice page
    var target = $('.accordionPanel');
    var headerHeight = $("header").outerHeight();
    setTimeout(function () {
        if (location.href.indexOf("#industries") > -1) {
            $('.allresult .industries-tab').click();
            $('html').animate({
                scrollTop: target.offset().top - headerHeight
            }, 400);
        }
    }, 2500);


    $('a[href*="#"]:not([href="#"]):not(a[name^="_ftnref"])').click(function () {
        _hash = this.hash;
        _scroll_it(_hash);
    });
    var topHeight = $("header").height();
    var _hash = window.location.hash;
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

if ($('.speedBump').length > 0) {
    var urls = jQuery("#excludeUrl").val();
    var urlsData = jQuery.parseJSON(urls);
    var urlArray = [];
    for (var i = 0; i < urlsData.length; i++) {
        var jsonUrls = urlsData[i];
        urlArray.push(jsonUrls["excludeUrl"]);
    }
    $('a').not(".noSpeedBump").each(function () {
        var a = new RegExp('/' + window.location.host + '/');
        if (urlArray.length > 0) {
            if (!a.test(this.href) && !urlArray.includes(this.href) && !this.href.includes("mailto:") && !this.href.includes("tel:") && this.href != "javascript:void(0);" && this.href != "javascript:void(0)" && this.href != "#") {
                $(this).addClass("speedBumpLink");
                $(this).attr("target", "_blank");
                $(this).attr("rel", "noopener");
            }
        }
        else {
            if (!a.test(this.href) && !this.href.includes("mailto:") && !this.href.includes("tel:") && this.href != "javascript:void(0);" && this.href != "javascript:void(0)" && this.href != "#") {
                $(this).addClass("speedBumpLink");
                $(this).attr("target", "_blank");
                $(this).attr("rel", "noopener");
            }
        }
    });

    $('a[target="_blank"]').attr("rel", "noopener");

    $(".speedBumpLink").click(function (e) {
        e.preventDefault();
        var link = $(this).attr("href");
        $("#urlText").html(link);
        $(".speedBump .proceed").attr("href", link);
        $(".speedBump").addClass('active');
    });

    $(".speedBump .cancel").click(function (e) {
        e.preventDefault();
        $(".speedBump").removeClass('active');
    });


    $(".speedContainer .close").click(function (e) {
        $(".speedBump").removeClass('active');
    });

    $(".speedContainer a").click(function (e) {
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

function detectmob() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}

// Equal Height

function equalheightBlock(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function () {
        $el = $(this);
        $($el).height('auto');
    });
    $(container).each(function () {
        $el = $(this);
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}


// Browser Identification
$(document).ready(function () {

    //setTimeout(function () {
    //    if ($('.popUpWrapper').length > 0) {
    //        alert("haii");
    //        $('html').addClass('popUpOpen');
    //        setTimeout(function () {
    //            $('.popupWrap .wrap,.popUpWrapper').addClass('Open');
    //        }, 100);
    //    }
    //}, 3000);

    function isInView(el) { if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0]; var rect = el.getBoundingClientRect(); var windowHeight = (window.innerHeight || document.documentElement.clientHeight); var windowWidth = (window.innerWidth || document.documentElement.clientWidth); return ((rect.left >= 0) && (rect.top >= 0) && ((rect.left + rect.width) <= windowWidth) && ((rect.top + rect.height) <= windowHeight)); }
    // IE FIxes
    function GetIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");
        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;
        else
            return 0; //It is not IE
    }
    if (GetIEVersion() > 0)

        $('html').addClass('ie' + GetIEVersion());
    else

        $('html').removeClass('ie' + GetIEVersion());
    if (navigator.userAgent.indexOf('Edge') >= 0) { $('html').addClass('ieEdge'); }

    function getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'MacOS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }
        return os;
    }
    $('html').addClass(getOS());

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
            return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "unknown";
    }
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        ipad: function () {
            return navigator.userAgent.match(/iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if (isMobile.iOS()) {
        $('html').addClass('iOS');
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (isChrome) { console.log("You are using Chrome!") };
        if (isSafari) console.log("You are using Safari!");
    }
    if (isMobile.Android()) {
        $('html').addClass('Android');
    }
});
$(document).ready(function () {
    var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
        browser;
    if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        browser = "msie";
    } else {
        browser = ua[1].toLowerCase();
    }
    if (navigator.userAgent.match(/firefox/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        $('html').addClass("firefox");
    }
    if (navigator.userAgent.match(/chrome/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        $('html').addClass("chrome");
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
    $('#searchInput').on('click', function () {
        $('.menusearchBlock').addClass('act');
    });
    $('.menusearchBlock button.submit').click(function () {
        $('.menusearchBlock').toggleClass('act');
        $('.mainManu li').removeClass('active');
        $('.mainNavigation li').removeClass('active');
        $('.mobileMenu, .mhamburger').removeClass('active');
        $('.mnavWrapper').removeClass('active');
        $(".mhamburger, .mobileMenu ").removeClass('is-active');
        $(".dkhamburger").removeClass("is-active");
        $(".mhamburger ").removeClass('active');
        $('.nav-wrapper').removeClass('show-menu');
        $('body').removeClass('menuOpened');
        $('.menu-wrap').removeClass('open');
        $("#searchInput").focus();
    });
    $('#inputSearch').keyup(function () {
        //alert("Key up detected");
        //console.log($(this).val());
        var minlength = 3;
        value = $(this).val();
        if (value != "" && value.length > 2) {
            if (value.length >= minlength) {
                setTimeout(function () {
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
        //alert("Key up detected");
        //console.log($(this).val());
        var minlength = 3;
        value = $(this).val();
        if (value != "" && value.length > 2) {
            if (value.length >= minlength) {
                setTimeout(function () {
                    $('.rserachLst, .bottomBtn').show();
                    $('.searchBoxMobile .wraps .searchIcon').hide();
                    $('.searchBoxMobile .wraps .closeIcon').show();
                }, 1000);
            }
        } else {
            setTimeout(function () {
                $('.rserachLst, .bottomBtn').hide();
                $('.searchBoxMobile .wraps .closeIcon').hide();
                $('.searchBoxMobile .wraps .searchIcon').show();
            }, 500);
        }
    });
    $('#searchInput').keyup(function () {
        //alert("Key up detected");
        //console.log($(this).val());
        var minlength = 3;
        value = $(this).val();
        if (value != "" && value.length > 2) {
            if (value.length >= minlength) {
                setTimeout(function () {
                    $('.reserachLst, .bottomBtn').show();
                }, 1000);
            }
        } else {
            setTimeout(function () {
                $('.reserachLst, .bottomBtn').hide();
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
    });
    $(".msubMenu").each(function () {
        $(this).wrapInner("<span></span>");
    });
    var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

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
        var $this = $(this);
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
    // Header
    $('.menu__link,.menu__back').click(function (e) {
        setTimeout(function () {
            var txt = $(".menu__level--current").attr("aria-label");
            $('.menu__back span').text(txt);
        }, 750);
    });

    $("#ml-menu").find("li.menu-item-has-children").each(function () {
        $(this).addClass("hasSubmenu");
        var overViewLink = $(this).find("a").first().attr("href");
        var menuTitle = $(this).find("a").first().text();
        var target = $(this).find("a").first().attr("target");
        if (typeof target == "undefined") {
            target = "_self";
        }

        $(this).find("a").first().attr("href", "javascript:void(0);");
        if (overViewLink != "#" && overViewLink != "javascript:void(0);" && overViewLink != "javascript:void(0)") {
            $(this).find('.sub-menu').first().prepend('<li class="menu__item title"><a class="menu__link" href="javascript:void(0);">' + menuTitle + '</a></li><li class="menu__item  menu-item menu-item-type-custom menu-item-object-custom"><a class="menu__link" target="' + target + '" href="' + overViewLink + '">' + menuTitle + '</a></li>');
        } else {
            $(this).find('.sub-menu').first().prepend('<li class="menu__item title"><a class="menu__link" href="javascript:void(0);">' + menuTitle + '</a></li>');
        }
        $(this).find("a").first().attr("data-submenu", "submenu-" + i + "").attr("aria-owns", "submenu-" + i + "");
        var menuLabeltext = $(this).find("a").first().text();
        subMenu += '<ul data-menu="submenu-' + i + '" id="submenu-' + i + '" class="menu__level" tabindex="-1" role="menu" aria-label="' + menuLabeltext + '">' + $(this).find('.sub-menu').first().html() + '</ul>';
        $(this).find('.sub-menu').first().remove();
        i++;
    });

});



setTimeout(function () { $('.bannerpanel.banner-animate').removeClass('banner-animate') }, 1000);

$(document).ready(function () {
    $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    $(window).on("resize", function (e) {
        var headHgt = $('header').outerHeight();
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
        var headHgt = $('header').height(true);
        $('.mnavWrapper').css({ 'top': headHgt });
        $('.innerloginWrapper').css({ 'top': headHgt });
    });
});

//Hamburger Menu

$(document).ready(function () {
    // Header
    $('.menu__link,.menu__back').click(function (e) {
        setTimeout(function () {
            var txt = $(".menu__level--current").attr("aria-label");
            $('.menu__back span').text(txt);
        }, 750);
    });

    $("#ml-menu").find("li.menu-item-has-children").each(function () {
        $(this).addClass("hasSubmenu");
        var overViewLink = $(this).find("a").first().attr("href");
        var menuTitle = $(this).find("a").first().text();
        var target = $(this).find("a").first().attr("target");
        if (typeof target == "undefined") {
            target = "_self";
        }

        $(this).find("a").first().attr("href", "javascript:void(0);");
        if (overViewLink != "#" && overViewLink != "javascript:void(0);" && overViewLink != "javascript:void(0)") {
            $(this).find('.sub-menu').first().prepend('<li class="menu__item title"><a class="menu__link" href="javascript:void(0);">' + menuTitle + '</a></li><li class="menu__item  menu-item menu-item-type-custom menu-item-object-custom"><a class="menu__link" target="' + target + '" href="' + overViewLink + '">' + menuTitle + '</a></li>');
        } else {
            $(this).find('.sub-menu').first().prepend('<li class="menu__item title"><a class="menu__link" href="javascript:void(0);">' + menuTitle + '</a></li>');
        }
        $(this).find("a").first().attr("data-submenu", "submenu-" + i + "").attr("aria-owns", "submenu-" + i + "");
        var menuLabeltext = $(this).find("a").first().text();
        subMenu += '<ul data-menu="submenu-' + i + '" id="submenu-' + i + '" class="menu__level" tabindex="-1" aria-label="' + menuLabeltext + '">' + $(this).find('.sub-menu').first().html() + '</ul>';
        $(this).find('.sub-menu').first().remove();
        i++;
    });
    $('.mhamburger').click(function (e) {
        e.preventDefault();
        $('header').removeClass('menuOpenState');

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


$('.searchicon').click(function (f) {
    f.preventDefault();
    $(this).toggleClass('is-active')
    $('html').toggleClass('menuOpened');
    $('.mobileSearch').toggleClass('act');
    $('.innerloginWrapper').removeClass('active');
    $('.Loginbtn').removeClass('is-active');
    $(".mhamburger, .mobileMenu ").removeClass('is-active');
    $(".mhamburger").removeClass('active');
    $('.nav-wrapper').removeClass('show-menu');
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

if ($('.alertsPannel').length > 0) {
    $('.alertsPannel').each(function (idx, alert) {
        var alertId = $(this).attr('data-alert-id');
        var localStorageAlertContent = window.localStorage.getItem('emergencyAlertContent-' + alertId);
        var renderedAlertContent = $(this).find('.emergencyAlertContent').html();
        if (renderedAlertContent != localStorageAlertContent)
            $(this).fadeIn();
    });
}

if ($('.alertBox').length > 0) {
    $('.alertBox').each(function (idx, alert) {
        var alertId = $(this).attr('data-alert-id');
        var localStorageAlertContent = window.localStorage.getItem('popupAlertContent-' + alertId);
        var renderedAlertContent = $(this).find('.popContent').html();
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
    var $alert = $(this).closest(".alertsPannel");
    $alert.fadeOut();

    // Add a class to hide the alert in the header
    $("header .alertsPannel").addClass('hideAlert');

    // Adjust other elements as needed
    setTimeout(function () {
        var heightSticky = $("header").height();
        $(".innerloginWrapper").css('top', heightSticky);
        $(".mobileSearch .desktopSearch").css('top', heightSticky);
        $(".stickyEmpty").css("height", heightSticky);
    }, 500);

    // Save a flag in local storage indicating that the alert has been closed
    var alertId = $alert.attr('data-alert-id');
    var emergencyAlertContentHtml = $alert.find('.emergencyAlertContent').html();
    window.localStorage.setItem('emergencyAlertContent-' + alertId, emergencyAlertContentHtml);
});

// Check if each alert has been closed previously
$(".alertsPannel").each(function () {
    var alertId = $(this).attr('data-alert-id');
    var alertClosed = window.localStorage.getItem('emergencyAlertClosed-' + alertId);
    var emergencyAlertContentHtml = $(this).find('.emergencyAlertContent').html();
    var localStorageAlertContent = window.localStorage.getItem('emergencyAlertContent-' + alertId);

    if (!alertClosed && localStorageAlertContent !== emergencyAlertContentHtml) {
        // Show the alert if it has not been closed previously and content has changed
        $(this).fadeIn();
    }
});


$(document).ready(function () {
    popupheight();
    function popupheight() {
        var topHeight = $(".stickyEmpty").height();
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
    var $alert = $(this).closest(".alertsPannel.footeraletpanel");
    $alert.fadeOut();
    // Save a flag in local storage indicating that the alert has been closed
    var alertId = $alert.attr('data-alert-id');
    window.localStorage.setItem('footeralertsPannelClose-' + alertId, "true");
});

// Function to check if the alert has been closed previously
function checkAlertStatus() {
    $(".alertsPannel.footeraletpanel").each(function () {
        var alertId = $(this).attr('data-alert-id');
        var alertClosed = window.localStorage.getItem('footeralertsPannelClose-' + alertId);

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
    var alertId = $(this).attr('data-alert-id');
    $(this).closest("#alertBox-" + alertId).fadeOut();
    var popupAlertContentHtml = $('#popupAlertContent-' + alertId).html();
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
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
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

    $(".selectMenu").selectmenu();

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
                defaults.initElem.on('click', '.has-dropdown > .has-dropdown-icon', function (e) {
                    e.preventDefault();
                    menu.curItem = $(this).parent();
                    _updateActiveMenu(menu);
                    var title = $(this).parent().parent().find('.itemtitle').text();
                    $('.nav-toggle .nav-title .back').text(title);
                });

                defaults.initElem.on('click', '.nav-toggle .nav-title .home', function () {
                    _updateActiveMenu(menu, 'main');
                    //alert('hi');
                });
                defaults.initElem.on('click', '.nav-toggle .nav-title .back', function () {
                    _updateActiveMenu(menu, 'back');
                    //alert('hi');
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
                var title = defaults.menuTitle;
                if (menu.curLevel > 0) {
                    title = menu.curItem.children('a').text();
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
        var MobileMenu = new MobileNav({
            initElem: "nav",
            menuTitle: "Push menu demo",
        });
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
    $('.ac-title h2').click(function (e) {
        $(this).find("span").toggleClass('arrow-up');
        $(this).toggleClass('acc-active');
        var getID = $(this).parent().attr('data-in');
        $(getID).slideToggle();
    });
});

$(document).ready(function () {
    if ($('.checking').length > 0) {
        resize();

        function resize() {
            var i = 1;
            $('body .checking').each(function () {
                $(this).attr('id', 'tablenormal' + i).addClass('responsive_table');
                var j = 1;
                var arr = [];
                var arrBG = [];
                var vInsertAfter = '#tablenormal' + i;
                if ($('#tablenormal' + i + '  tr th').length > 0) {
                    $('#tablenormal' + i + '  tr').each(function () {
                        if (j == 1) {
                            var k = 0;
                            $('#tablenormal' + i + '  tr th').each(function () {
                                arr[k] = $(this).html();
                                arrBG[k] = $(this).css('background-color');
                                k++;
                            });

                        }
                        else {
                            var k = 0;
                            var vTr;
                            $('<table />', { 'class': 'responsive_table', 'id': 'tablemobile' + i + j }).insertAfter(vInsertAfter);
                            $(this).find('td').each(function () {
                                $('<tr/>').append($('<td/>', { 'html': arr[k], 'style': 'background-color:' + arrBG[k] + ';font-weight:bold' })).append($('<td/>', { 'html': $(this).html() })).appendTo($('#tablemobile' + i + j));
                                k++;
                            });
                            vInsertAfter = '#tablemobile' + i + j;
                        }
                        j++;
                    });
                }
                else {
                    $('#tablenormal' + i + '  tr').each(function () {
                        var j = 0;
                        /*if (j == 1) {
                            var k = 0;
                            var vTr;
                            $('<table />', { 'class': 'responsive_table noheader_table', 'id': 'tablemobile' + i + j }).insertAfter(vInsertAfter);
                            $(this).find('td').each(function () {
                                $('<tr/>').append($('<td/>', { 'html': $(this).html() })).appendTo($('#tablemobile' + i + j));
                                k++;
                            });
                            vInsertAfter = '#tablemobile' + i + j;
  
                        }
                        else {*/
                        var k = 0;
                        var vTr;
                        $('<table />', { 'class': 'responsive_table noheader_table', 'id': 'tablemobile' + i + j }).insertAfter(vInsertAfter);
                        $(this).find('td').each(function () {

                            if ($(this).html().trim() != '&nbsp;') {
                                if (k / 2 == 0)
                                    $('<tr/>').append($('<td/>', { 'html': $(this).html(), 'style': 'background-color: #fafafa' })).appendTo($('#tablemobile' + i + j));
                                else
                                    $('<tr/>').append($('<td/>', { 'html': $(this).html(), 'style': 'background-color:#eeeeee' })).appendTo($('#tablemobile' + i + j));

                                k++;
                            }
                        });
                        vInsertAfter = '#tablemobile' + i + j;
                        /*}*/
                        j++;
                    });
                }
                i++;
            });
        }
    };
});

$(document).ready(function () {
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream) {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
    }
});


$(document).ready(function() {
    function adjustFooterPadding() {
        if ($(window).outerWidth() >= 768) {
            $('.twocolumscontentpanel .grid-container .flexwrap .leftwrap .contentless').css({'height': $('.twocolumscontentpanel .grid-container .flexwrap .rightwrap').outerHeight()});
        } else {
            $('.twocolumscontentpanel .grid-container .flexwrap .leftwrap .contentless').removeAttr("style");
        }
    }
    adjustFooterPadding();

    $(window).on("resize load", function() {
        adjustFooterPadding();
    });
});

$(document).ready(function () {
    function updateTextBasedOnView() {
        var isMobile = window.innerWidth <= 767;
        if (isMobile) {
            $('body').addClass('mobile-view');
        } else {
            $('body').removeClass('mobile-view');
        }

        if (!$(".readMore a").hasClass("activelink")) {
            var text = $('body').hasClass('mobile-view') ? "Expand" : "Read More";
            $(".readMore a").find('p span').text(text);
        } else {
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $(".readMore a").find('p span').text(text);
        }

        if (!$(".readMorePractice a").hasClass("activelink")) {
            var text = $('body').hasClass('mobile-view') ? "Expand" : "Read More";
            $(".readMorePractice a").find('p span').text(text);
        } else {
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $(".readMorePractice a").find('p span').text(text);
        }
    }

    updateTextBasedOnView();

    $(window).resize(function () {
        updateTextBasedOnView();
    });

    $(".readMorePractice a").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.readMorePractice').parent().parent();
        var tabHeight = 0;

        if (parentPanel.hasClass("active")) {
            parentPanel.removeClass("active");
            $('.contentwrap').addClass('contenthidden');
            $this.removeClass('activelink');
            $(".rpara").show();
            var text = $('body').hasClass('mobile-view') ? "Expand" : "Read More";
            $this.find('p span').text(text);
            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            $('.contentwrap').removeClass('contenthidden');
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $this.find('p span').text(text);
            $(".rpara").hide();
            $this.addClass('activelink');
        }
    });

    $(".readMore a").click(function(e) {
        e.preventDefault();
        var $this = $(this);
        var parentPanel = $this.closest('.readMore').parent().parent();
        var tabHeight = 0;
       
        if (parentPanel.hasClass("active")) {
            parentPanel.find(".collapsePanel").slideUp(400, function() {
                parentPanel.removeClass("active");
                $this.removeClass('activelink');
                $(".rpara").show();
            });
 
            var text = $('body').hasClass('mobile-view') ? "Expand" : "Read More";
            $this.find('p span').text(text);
           
            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            parentPanel.find(".collapsePanel").slideDown(400);
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $this.find('p span').text(text);
            $(".rpara").hide();
            $this.addClass('activelink');
        }
    });
});

$(document).ready(function () {
    $(".viewlist a").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.viewlist').parent().parent();
        var tabHeight = 0;

        if (parentPanel.hasClass("active")) {
            parentPanel.find(".collapsePanel").slideUp(400, function () {
                parentPanel.removeClass("active");
                $this.removeClass('activelink');
            });

            var text = $('body').hasClass('mobile-view') ? "View Full List" : "View Full List";
            $this.find('p span').text(text);

            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            parentPanel.find(".collapsePanel").slideDown(400);
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "View Less List" : "View Less List";
            $this.find('p span').text(text);

            $this.addClass('activelink');
        }
    });
});


$(document).ready(function () {
    $(".expandmore").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.expandmore').parent().parent();
        var tabHeight = 0;

        if (parentPanel.hasClass("active")) {
            parentPanel.find(".collapsePanelNew").slideUp(400, function () {
                parentPanel.removeClass("active");
                $this.removeClass('activelink');
            });

            var text = $('body').hasClass('mobile-view') ? "Expand" : "Expand";
            $this.find('p span').text(text);

            // $('html, body').animate({
            //     scrollTop: parentPanel.offset().top + tabHeight
            // }, "slow");
        } else {
            parentPanel.find(".collapsePanelNew").slideDown(400);
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Collapse";
            $this.find('p span').text(text);

            $this.addClass('activelink');
        }
    });
});

$(document).ready(function () {
    function updateTextBasedOnView() {
        var isMobile = window.innerWidth <= 767;

        if (isMobile) {
            $('body').addClass('mobile-view');
        } else {
            $('body').removeClass('mobile-view');
        }

        if (!$(".expandbio a").hasClass("activelink")) {
            var text = $('body').hasClass('mobile-view') ? "Expand Biography" : "Read More";
            $(".expandbio a").find('p span').text(text);
        } else {
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $(".expandbio a").find('p span').text(text);
        }
    }

    updateTextBasedOnView();

    $(window).resize(function () {
        updateTextBasedOnView();
    });

    $(".expandbio a").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.expandbio').parent().parent();
        var tabHeight = 0;
 

        if (parentPanel.hasClass("active")) {
            parentPanel.removeClass("active");
            $('.expanded-area').addClass('contenthidden');
            $this.removeClass('activelink');
            $(".rpara").show();
            var text = $('body').hasClass('mobile-view') ? "Expand" : "Read More";
            $this.find('p span').text(text);
            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            $('.expanded-area').removeClass('contenthidden');
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Collapse" : "Read Less";
            $this.find('p span').text(text);
            $(".rpara").hide();
            $this.addClass('activelink');
        }
    });
});

$(document).ready(function () {
    $('.twocolumscontentpanel .listwrap li a').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            var headerHeight = $("header").outerHeight();
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 400);
            }, 1000);
        }
    });

    // $('.linkspanel ul li a').on('click', function (event) {
    //     event.preventDefault();
        
    //     // Get the ID from the href attribute of the clicked link
    //     var id = '#targetPanel';
    //     var targetId = $(this).attr('href');
    //     var target = $(targetId + '#targetPanel');
        
    //     if (target.length) { // Check if the target exists
    //         var headerHeight = $("header").outerHeight();
            
    //         $('html, body').animate({
    //             scrollTop: target.offset().top - headerHeight
    //         }, 400);
    //     }
    // });
});
$(document).ready(function () {
    $('.eventpanel .contentwrap .brief a[name^="_ftnref"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            var headerHeight = $("header").outerHeight() + 10;
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 400);
        }
    });
});
$(document).ready(function () {
    function updateTextBasedOnView() {
        var isMobile = window.innerWidth <= 767;

        if (isMobile) {
            $('body').addClass('mobile-view');
        } else {
            $('body').removeClass('mobile-view');
        }

        if (!$(".readTranscript a").hasClass("activelink")) {
            var text = $('body').hasClass('mobile-view') ? "Read More" : "View Full Transcript";
            $(".readTranscript a").find('p span').text(text);
        } else {
            var text = $('body').hasClass('mobile-view') ? "Read Less" : "View Less Transcript";
            $(".readTranscript a").find('p span').text(text);
        }
    }

    updateTextBasedOnView();

    $(window).resize(function () {
        updateTextBasedOnView();
    });

    $(".readTranscript a").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.readTranscript').parent().parent();
        var tabHeight = 0;

        if (parentPanel.hasClass("active")) {
            parentPanel.find(".collapsePanel").slideUp(400, function () {
                parentPanel.removeClass("active");
                $this.removeClass('activelink');
            });

            var text = $('body').hasClass('mobile-view') ? "Read More" : "View Full Transcript";
            $this.find('p span').text(text);

            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            parentPanel.find(".collapsePanel").slideDown(400);
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Read Less" : "View Less Transcript";
            $this.find('p span').text(text);

            $this.addClass('activelink');
        }
    });
});



$(document).ready(function () {
    function updateTextBasedOnView() {
        var isMobile = window.innerWidth <= 767;

        if (isMobile) {
            $('body').addClass('mobile-view');
        } else {
            $('body').removeClass('mobile-view');
        }

        if (!$(".readCareer a").hasClass("activelink")) {
            var text = $('body').hasClass('mobile-view') ? "Read More" : "Read More";
            $(".readCareer a").find('p span').text(text);
        } else {
            var text = $('body').hasClass('mobile-view') ? "Read Less" : "Read Less";
            $(".readCareer a").find('p span').text(text);
        }
    }

    updateTextBasedOnView();

    $(window).resize(function () {
        updateTextBasedOnView();
    });

    $(".readCareer a").click(function () {
        var $this = $(this);
        var parentPanel = $this.closest('.readCareer').parent().parent().parent();
        var tabHeight = 0;

        if (parentPanel.hasClass("active")) {
            parentPanel.find(".collapsePanel").slideUp(400, function () {
                parentPanel.removeClass("active");
                $this.removeClass('activelink');
            });

            var text = $('body').hasClass('mobile-view') ? "Read More" : "Read More";
            $this.find('p span').text(text);

            $('html, body').animate({
                scrollTop: parentPanel.offset().top + tabHeight
            }, "slow");
        } else {
            parentPanel.find(".collapsePanel").slideDown(400);
            parentPanel.addClass("active");
            var text = $('body').hasClass('mobile-view') ? "Read Less" : "Read Less";
            $this.find('p span').text(text);

            $this.addClass('activelink');
        }
    });
});


$(document).ready(function () {
    function adjustProgressWrap() {
        var footer = $('.foot-custom');
        var aTop = footer.offset().top;
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        var footscroll = (scrollPos + windowHeight) - aTop;

        if (windowWidth >= 1280) {
            if (scrollPos + windowHeight >= aTop) {
                $('.progress-wrap').css('bottom', (footscroll - 30) + 'px');
            } else {
                $('.progress-wrap').css('bottom', '10px');
            }
        } else {
            $('.progress-wrap').css('bottom', '10px');
        }
    }

    $(window).scroll(function () {
        adjustProgressWrap();
    });

    $(window).resize(function () {
        adjustProgressWrap();
    });
});






$(document).ready(function () {
    $(".set > .acclaw").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".accordioncontent")
                .slideUp(200);
        } else {
            $(".set > .acclaw").removeClass("active");
            $(".practice > .accpract ").removeClass("active");
            $(this).addClass("active");
            $(".accordioncontent").slideUp(200);
            $(this)
                .siblings(".accordioncontent")
                .slideDown(200);
        }
    });
});



