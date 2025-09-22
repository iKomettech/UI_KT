if (!String.prototype.includes) {
    String.prototype.includes = function (str) {
        var returnValue = false;
        if (this.indexOf(str) !== -1) {
            returnValue = true;
        }
        return returnValue;
    }
}

$(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > 0) {
        $(".sticky").addClass("active");
    } else {
        $(".sticky").removeClass("active");
    }
});

if ($(".alertsPannel").length > 0) {
    $(this).addClass('active');
}

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
            if (!a.test(this.href) && urlArray.indexOf(this.href) == -1 && this.href.indexOf("mailto:") == -1 && !this.href.includes("tel:") && this.href != "javascript:void(0);" && this.href != "javascript:void(0)" && this.href != "#") {
                $(this).addClass("speedBumpLink");
                $(this).attr("target", "_blank");
                $(this).attr("rel", "noopener");
            }
        }
        else {
            if (!a.test(this.href) && this.href.indexOf("mailto:") == -1 && !this.href.includes("tel:") && this.href != "javascript:void(0);" && this.href != "javascript:void(0)" && this.href != "#") {
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

// Button Reple Effects
(function (window) {

    'use strict';
    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;
        docElem = doc.documentElement;
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';
        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }
        return style;
    }
    var Effect = {
        duration: 750,
        show: function (e, element) {

            if (e.button === 2) {
                return false;
            }
            var el = element || this;
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            var pos = offset(el);
            var relativeY = (e.pageY - pos.top);
            var relativeX = (e.pageX - pos.left);
            var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';

            if ('touches' in e) {
                relativeY = (e.touches[0].pageY - pos.top);
                relativeX = (e.touches[0].pageX - pos.left);
            }

            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            var rippleStyle = {
                'top': relativeY + 'px',
                'left': relativeX + 'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['transition-duration'] = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function (e) {
            TouchHandler.touchup(e);
            var el = this;
            var width = el.clientWidth * 1.4;
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX = ripple.getAttribute('data-x');
            var relativeY = ripple.getAttribute('data-y');
            var scale = ripple.getAttribute('data-scale');

            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            setTimeout(function () {
                var style = {
                    'top': relativeY + 'px',
                    'left': relativeX + 'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function () {
                    try {
                        el.removeChild(ripple);
                    } catch (e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        wrapInput: function (elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('btnWaves') !== -1) {
                        continue;
                    }

                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };

    var TouchHandler = {

        touches: 0,
        allowEvent: function (e) {

            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function () {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }
            return allow;
        },
        touchup: function (e) {
            TouchHandler.allowEvent(e);
        }
    };

    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('ctaLinks') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('ctaLinks')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function (options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        Effect.wrapInput($$('.ctaLinks'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    Waves.attach = function (element) {

        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function () {
        Waves.displayEffect();
    }, false);

})(window);

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

var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;

    translate = 'translate(' + x + 'px, ' + y + 'px)';

    $('.mobileApp .imgWrap').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });

    window.requestAnimationFrame(moveBackground);
}

$('.mobileApp').on('mousemove click', function (e) {

    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (10 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (5 * lMouseY) / 100;

});

moveBackground();

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
        //$('.dLogin a').toggleClass('button-removed');
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

$(document).ready(function () {
    $(window).on("load resize", function (e) {
        var headHgt = $('header').height(true);
        $('.mnavWrapper').css({
            'top': headHgt
        });
    });
    $(".msubMenu").each(function () {
        $(this).wrapInner("<span></span>");
    });
    var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");



    //Hamburger Menu
    // Mobile Menu Toggle
    $('.hamburger a').click(function (e) {
        e.preventDefault();
        $(this).trigger("blur");
        $('header').addClass('menuOpenState');
        $(this).toggleClass('active');
        $('html').toggleClass('menuOpened');
        $('.mnavWrapper').toggleClass('active');
        $('.menusearchBlock.mobilesearch').addClass('act');
    });
});

$(window).on("load", function (e) {
    $('.msubMenu').on('click', function (e) {
        if ($(window).width() <= 767) {

            e.preventDefault();
            $this = $(this);
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
    console.log("document");
});

$(function () {
    console.log("ready!");
    $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
});

$(window).on("load resize", function () {
    $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    if ($("header").hasClass("sticky")) {
        $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    }
});

$(document).ready(function () {
    const $menu = $('.header-menu li, .loginDropdown');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) &&
            $menu.has(e.target).length === 0) {
            $menu.removeClass('active');
            $(".dlogin").removeClass("button-removed");
            $(".header-menu li").removeClass("active");

        }
    });

    $('.hamburger a').click(function (f) {
        f.preventDefault();
        $('this').toggleClass('is-active')
        $('body').toggleClass('menuOpened');
        $('.mobileMenu').toggleClass('is-active');
        $('body').removeClass('loginopen');
    });

    $(window).on("load resize", function (e) {
        var headHgt = $('header').height(true);
        $('.mnavWrapper').css({ 'top': headHgt });
        $('.innerloginWrapper').css({ 'top': headHgt });
    });

    $('.msubMenu').click(function (e) {
        e.preventDefault();
        var $this = $(this);
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
    $('.hamburger').click(function (e) {
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

$(document).ready(function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() + 53;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    // if (windowwi <= 1023) {
    //     $(".fixedSideNav").css('top', alertpanelhgt);
    // }


});

$(window).on("load resize", function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() + 53;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    // if (windowwi <= 1023) {
    //     $(".fixedSideNav").css('top', alertpanelhgt);
    // }

});

    // $(document).ready(function () {
    //     $('.mainManu li .first-level-link').click(function () {
    //         $('.mainManu li.menu-open').removeClass('menu-open');
    //         $('.dlogin a').removeClass('button-removed');
    //         $(this).parent().addClass('menu-open');
    //          if ($('.dLogin').hasClass("active")) {
    //             $(this).removeClass('active');
    //          }
    //     });
    //     const $menu = $('.menu-mega-blog');
    //     $(document).mouseup(function (e) {
    //         if (!$menu.is(e.target) &&
    //             $menu.has(e.target).length === 0) {
    //             $menu.removeClass('menu-open');
    //             $(".megaMenu li").removeClass("menu-open");
    //         }
    //     });
    // });


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
        $('.menusearchBlock').removeClass('act');
    }
}).resize();



$(document).ready(function () {
    if (window.location.hash) {
        setTimeout(function () {
        var hash = window.location.hash;
        $('.stickyEmpty').css({'height':  $('header').height()});
        if ($(hash).offset().top > $('header').height()) {
            $("header").addClass("active");
            $('.stickyEmpty').css({ 'height': $('header').height() });
        }
        var scrollHeight = $(hash).offset().top - $("header").height();
      
            $('html, body').animate({
                scrollTop: scrollHeight
            }, 800);

        }, 500);
    };
});

$(function () {
    var searchQuery = $("#searchid").val();
    $("body").delegate("a#search-toggle", "click", function (event) {
        event.preventDefault();
        if ($("#searchid").val() != "") {
            if (searchQuery != $("#searchid").val()) {
                $("#searchform").submit();
            }
        }
    });
    $("#spanSearchTool").click(function () {
        $("#searchform").submit();
    });
});


// $(document).ready(function () {
//     var sOffset = $(".floatingnews,.fixedSideNav").offset();
//     var shareheight = $(".floatingnews").height() + 40;
//     $(window).scroll(function () {
//         var scrollYpos = $(document).scrollTop();
//         if ($(window).height() < 700) {
//             if (scrollYpos > 50) {
//                 $(".floatingnews,.fixedSideNav").css({
//                     'bottom': '250px',
//                     'position': 'fixed',
//                     'top': '167px',
//                 });
//             } else {
//                 $(".floatingnews,.fixedSideNav").css({
//                     'top': '167px',
//                     'bottom': 'auto',
//                     'position': 'fixed'
//                 });
//                 if ($(window).width() < 1280) {
//                     $(".floatingnews,.fixedSideNav").css({
//                         'top': '167px',
//                         'bottom': 'auto',
//                         'position': 'fixed'
//                     });
//                 }
//                 if ($(window).width() < 1024) {
//                     $(".floatingnews,.fixedSideNav").css({
//                         'top': '167px',
//                         'bottom': 'auto',
//                         'position': 'fixed'
//                     });
//                 }
//             }
//         }
//     });
// });

// $(document).ready(function () {
//     var sOffset = $(".fixedSideNav").offset();
//     var shareheight = $(".fixedSideNav").height() + 40;
//     $(window).scroll(function () {
//         var scrollYpos = $(document).scrollTop();
//         if ($(window).height() < 700) {
//             if (scrollYpos > 50) {
//                 $(".fixedSideNav").css({
//                     'bottom': '250px',
//                     'position': 'fixed',
//                     'top': 'auto',
//                 });
//             } else {
//                 $(".fixedSideNav").css({
//                     'top': '320px',
//                     'bottom': 'auto',
//                     'position': 'fixed'
//                 });
//                 if ($(window).width() < 1280) {
//                     $(".fixedSideNav").css({
//                         'top': '320px',
//                         'bottom': 'auto',
//                         'position': 'fixed'
//                     });
//                 }
//                 if ($(window).width() < 1024) {
//                     $(".fixedSideNav").css({
//                         'top': '320px',
//                         'bottom': 'auto',
//                         'position': 'fixed'
//                     });
//                 }
//             }
//         }
//     });
// });

$(function () {
    $(".newsQuickLnk").click(function () {
        $(".floatingnews").toggleClass("active");
       // var opAct = $(".floatingnews .floatingnewsec").height();
        //$(".floatingnews").css("width", opAct);
    });

});




//banner slider panel//
var YoutubeplayerList = [];
var VimeoplayerList = [];
var initYoutubeVideo = null;
var initVimeoVideo = null;
var YoutubevideoPlayers = 0;
var VimeovideoPlayers = 0;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// function initYoutubeYoutubevideoPlayers() {
//     i = 0;
//     YoutubeplayerList = []; //create new array to hold youtube player
//     $(".youtube-video-src").each(function () {
//         $(this).closest(".videoPanel").attr("data-index", i);
//         if (i == 0){
//             var player = new YT.Player($(this).attr("id"), {
//                 height: '360',
//                 width: '640',
//                 videoId: $(this).attr("data-videoId"),
//                 events: {
//                     'onReady': onPlayerReady,
//                     'onStateChange': onPlayerStateChange
//                 },
                
//                 playerVars: {
//                     autoplay:0,
//                     rel: 0,
//                     showinfo: 0,
//                     ecver: 0,
//                     mute: 1,
//                     loop: 1,
//                     controls: 1,
//                     caption: 0,
//                     playsinline: 1,
//                     origin: window.location,
//                     host: 'https://www.youtube.com'
//                 }
//             });
    
//         }else if (i>=1){
//             var player = new YT.Player($(this).attr("id"), {
//                 height: '360',
//                 width: '640',
//                 videoId: $(this).attr("data-videoId"),
//                 events: {
//                     'onReady': onPlayerReady,
//                     'onStateChange': onPlayerStateChange
//                 },
                
//                 playerVars: {
//                     autoplay:0,
//                     rel: 0,
//                     showinfo: 0,
//                     ecver: 0,
//                     mute: 0,
//                     loop: 1,
//                     controls: 1,
//                     caption: 0,
//                     playsinline: 1,
//                     origin: window.location,
//                     host: 'https://www.youtube.com'
//                 }
//             });
    
//         }
//         i++;  
       
//         function onPlayerReady(event) {
//             event.target.setVolume(80);
           
//             //  player.mute();
//         }

//         function onPlayerStateChange(event) {
//             if (event.data == YT.PlayerState.ENDED) {
//                 player.seekTo(0);
//                 player.playVideo();
//                 player.mute();
//             }
//         }


//         YoutubeplayerList.push(player);
//     });
//     return true;
// }

function initYoutubeYoutubevideoPlayers() {
    i = 0;
    YoutubeplayerList = []; //create new array to hold youtube player
    $(".youtube-video-src").each(function () {
        $(this).closest(".videoPanel").attr("data-index", i);
        i++;
        var player = new YT.Player($(this).attr("id"), {
            height: '100%',
            width: '100%',
            videoId: $(this).attr("data-videoId"),
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                rel: 0,
                showinfo: 0,
                ecver: 0,
                mute: 1,
                loop: 1,
                controls: 1,
                caption: 0,
                playsinline: 1,
                playlist:$(this).attr("data-videoId"),
                origin: window.location,
                host: 'https://www.youtube.com'
            }
        });
        YoutubeplayerList.push(player);
    });
    return true;
}


function pauseOthersYoutubes(currentPlayer) {
    if (!currentPlayer) return;
    for (var i = YoutubeplayerList.length; i--;) {
        if (YoutubeplayerList[i] && (YoutubeplayerList[i] != currentPlayer)) {
            YoutubeplayerList[i].pauseVideo();
        }
    }
    for (var i = VimeoplayerList.length; i--;) {
        VimeoplayerList[i].pause();
    }
}

function onPlayerReady(e) {
    YoutubevideoPlayers++;
    if (YoutubevideoPlayers == YoutubeplayerList.length) {
        if (initYoutubeVideo != '' && initYoutubeVideo != null) {
            initYoutubeVideo.trigger("click");
        }
    }
}

function onPlayerStateChange(e) {
    var label = e.target.ulabel;
    if (e["data"] == YT.PlayerState.PLAYING) {
        //if one video is play then pause other
        pauseOthersYoutubes(e.target);
    }
    if (e.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
    if (e["data"] == YT.PlayerState.PAUSED) {

    }
    if (e["data"] == YT.PlayerState.ENDED) {

    }

    //track number of buffering and quality of video
    if (e["data"] == YT.PlayerState.BUFFERING) {
        e.target.uBufferingCount ? ++e.target.uBufferingCount : e.target.uBufferingCount = 1;
        //if one video is play then pause other, this is needed because at start video is in buffered state and start playing without go to playing state
        if (YT.PlayerState.UNSTARTED == e.target.uLastPlayerState) {
            pauseOthersYoutubes(e.target);
        }
    }
    //last action keep stage in uLastPlayerState
    if (e.data != e.target.uLastPlayerState) {
        e.target.uLastPlayerState = e.data;
    }
}

function onYouTubeIframeAPIReady() {
    var init = initYoutubeYoutubevideoPlayers();
    return init;
}


if (iOS) {
    if ($(".video-thumb-image[data-videoSource='youtube']").length > 0) {
        var tag = document.createElement('script');
        //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    initYoutubeVideo = '';
}
// function slidervidoecall(){
// $(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
//     if (initYoutubeVideo != null || initYoutubeVideo == '') {
//         //$(this).addClass("loaded").removeClass("loading");
//         var index = $(this).attr("data-index");
//         if (YoutubeplayerList.length > 0) {
//             // console.log(index);
//             YoutubeplayerList[index].pauseVideo();
//         }
//     } else {
//         $(this).addClass("loading");
//         if ($(".video-thumb-image").length > 0) {
//             var tag = document.createElement('script');
//             //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
//             tag.src = "https://www.youtube.com/iframe_api";
//             var firstScriptTag = document.getElementsByTagName('script')[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//         }
//         initYoutubeVideo = $(this);
//     }
// });
// }
// function initvidoecall(){
//     $(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
//         if (initYoutubeVideo != null || initYoutubeVideo == '') {
//             //$(this).addClass("loaded").removeClass("loading");
//             var index = $(this).attr("data-index");
//             if (YoutubeplayerList.length > 0) {
//                 // console.log(index);
//                 YoutubeplayerList[0].playVideo();
//             }
//         } else {
//             $(this).addClass("loading");
//             if ($(".video-thumb-image").length > 0) {
//                 var tag = document.createElement('script');
//                 //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
//                 tag.src = "https://www.youtube.com/iframe_api";
//                 var firstScriptTag = document.getElementsByTagName('script')[0];
//                 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//             }
//             initYoutubeVideo = $(this);
//         }
//     });
// }

$(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
    if (initYoutubeVideo != null || initYoutubeVideo == '') {
        $(this).addClass("loaded").removeClass("loading");
        var index = $(this).attr("data-index");
        if (YoutubeplayerList.length > 0) {
            //console.log(index);
            YoutubeplayerList[index].playVideo();
        }
    } else {
        $(this).addClass("loading");
        if ($(".video-thumb-image").length > 0) {
            var tag = document.createElement('script');
            //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        initYoutubeVideo = $(this);
    }
});

function initVimoevideoPlayers() {
    i = 0;
    VimeoplayerList = []; //create new array to hold youtube player
    $(".vimeo-video-src").each(function () {
        $(this).closest(".videoPanel").attr("data-index", i);
        i++;
        var options = {
            loop: true,
            id: $(this).attr("data-videoId"),
            muted: true,
            transparent: false,
            controls: false,
            title: false,
            byline: false,
            transparent: false,
            background: true

        };
        var player = new Vimeo.Player($(this).attr("id"), options);

        player.on('play', onPlay);
        player.on('pause', onPause);
        player.ready().then(function () {
            console.log("video Ready");
            VimeovideoPlayers++;
            if (VimeovideoPlayers == VimeoplayerList.length) {
                initVimeoVideo.trigger("click");
            }
        });
        VimeoplayerList.push(player);
    });

    return true;
}

function requireVimeo(url, callback) {
    var e = document.createElement("script");
    e.src = url;
    e.type = "text/javascript";
    e.addEventListener('load', callback);
    document.getElementsByTagName("head")[0].appendChild(e);
}
var onPlay = function (data) {
    for (var i = YoutubeplayerList.length; i--;) {
        YoutubeplayerList[i].pauseVideo();
    }
};
var onPause = function (data) {
    //console.log('paused');
};
$(".video-thumb-image[data-videoSource='vimeo']").not(".loaded").click(function (e) {
    if (initVimeoVideo != null) {
        $(this).addClass("loaded").removeClass("loading");
        var index = $(this).attr("data-index");
        if (VimeoplayerList.length > 0) {
            VimeoplayerList[index].play();
        }
    } else {
        $(this).addClass("loading");
        if ($(".video-thumb-image").length > 0) {
            requireVimeo("https://player.vimeo.com/api/player.js", function () {
                var init = initVimoevideoPlayers();
                return init;
            });
        }
        initVimeoVideo = $(this);
    }
});


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
            } else {
                //$('.animatable').removeClass('animate-in');
            }
        });
    });

});

if (!($(".multiplecheckbox .flexwrap .form-group").length > 4)) {
    $(".multiplecheckbox .flexwrap .form-group").addClass("nomarginright");
    $(".multiplecheckbox .flexwrap").addClass("flexcenter");
}


$('.persoanltabssection .tabHorizontal .nav.nav-tabs li').click(function () {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-' + tabID).addClass('active').siblings().removeClass('active');
    var headerheight = $('header').outerHeight() + $('.tab').outerHeight() + 40;
    if ($(".tab-content").length > 0) {
        $('html, body').animate({
            scrollTop: $(".tab-content").offset().top - headerheight
        }, 1000);
    }
});

$('.tabHorizontal .nav.nav-tabs li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var banking = $(this).data("tab");
    $(".letsConnect").attr("data-bank", banking);
    $(".letsBanking").val(banking);
});




(function ($) {
    "use strict";

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

})(jQuery);


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



$(document).ready(function () {
    $('.generalTemplate table tr td').not('.generalTemplate table.table tr td').wrapInner('<div></div>');
    $(".generalTemplate table tr td div").find("div").unwrap('div');
    var thLength = $('table thead tr th').length;
    var thvalue = [];
    $('table thead tr th').each(function () {
        thvalue.push($(this).text());
    });

    $('table tbody tr').each(function () {
        for (var i = 0; i < thLength; i++) {
            $(this).find('td:nth-child(' + (i + 1) + ')').attr('data-th', thvalue[i]);
        }
    });

    if ($('.comparsioncharttable').length > 0) {
        resize();

        function resize() {
            var i = 1;

            $('body .comparsioncharttable table').each(function () {

                $(this).attr('id', 'tablenormal' + i).addClass(
                    'table responsive_table large-only');
                var j = 1;
                var arr = [];
                var arrBG = [];
                var vInsertAfter = '#tablenormal' + i;
                if ($('#tablenormal' + i + '  tr th').length > 0) {
                    $('#tablenormal' + i + '  tr').each(function () {
                        if (j == 1) {
                            var k = 0;
                            $('#tablenormal' + i + '  tr th').each(
                                function () {
                                    arr[k] = $(this).html();
                                    k++;
                                });

                        } else {
                            var k = 0;
                            var vTr;
                            $('<table />', {
                                'class': 'responsive_table small-only',
                                'id': 'tablemobile' + i + j
                            }).insertAfter(vInsertAfter);
                            $(this).find('td').each(function () {
                                $('<tr/>').append($('<td/>', {
                                    'html': arr[k]
                                })).append($('<td/>', {
                                    'html': $(this)
                                        .html()
                                })).appendTo($('#tablemobile' +
                                    i + j));
                                k++;
                            });
                            vInsertAfter = '#tablemobile' + i + j;
                        }
                        j++;
                    });
                } else {
                    $('#tablenormal' + i + '  tr').each(function () {
                        var j = 0;
                        var k = 0;
                        var vTr;
                        $('<table />', {
                            'class': 'responsive_table small-only noheader_table',
                            'id': 'tablemobile' + i + j
                        }).insertAfter(vInsertAfter);
                        $(this).find('td').each(function () {

                            if ($(this).html().trim() != '&nbsp;') {
                                if (k / 2 == 0)
                                    $('<tr/ class="odd">').append($(
                                        '<td/>', {
                                        'html': $(this)
                                            .html()
                                    })).appendTo($(
                                        '#tablemobile' + i + j));
                                else
                                    $('<tr/ class="even">').append(
                                        $('<td/>', {
                                            'html': $(this)
                                                .html()
                                        })).appendTo($(
                                            '#tablemobile' + i + j));

                                k++;
                            }
                        });
                        vInsertAfter = '#tablemobile' + i + j;
                        j++;
                    });
                }
                i++;
            });
        }
    };

});

$(function () {
    $('.rangecontainer').each(function () {
        var $projectBar = $(this).find('.bar');
        var $projectPercent = $(this).find('.percent');
        var $projectRange = $(this).find('.ui-slider-range');
        $projectBar.slider({
            range: "min",
            animate: true,
            value: 1,
            min: 0,
            max: 100,
            step: 1,
            slide: function (event, ui) {
                $projectPercent.val(ui.value + "%  Match");
            },
            change: function (event, ui) {
                var $projectRange = $(this).find('.ui-slider-range');
                var percent = ui.value;
                if (percent < 30) {
                    $projectPercent.css({

                    });
                    $projectRange.css({

                    });
                } else if (percent > 31 && percent < 70) {
                    $projectPercent.css({

                    });
                    $projectRange.css({

                    });
                } else if (percent > 70) {
                    $projectPercent.css({

                    });
                    $projectRange.css({

                    });
                }
            }
        });
    })
})


$(".submit").on("click", function () {
    return true;
});
$(".quizsteps .quiz-container:nth-of-type(1)").addClass("active");
$(".quiz-container").on("click", ".next", function () {
    $(this).parents(".quiz-container").removeClass("active").next().addClass("active");
});
$(".quiz-container").on("click", ".back", function () {
    $(this).parents(".quiz-container").removeClass("active ").prev().addClass("active");
});


$(function () {
    $('.acc__title').click(function (j) {

        var dropDown = $(this).closest('.acc__card').find('.acc__panel');
        $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.acc').find('.acc__title.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });
});


$(".faq-accordion > a").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
            .siblings(".faq-content")
            .slideUp(200);
        $(this)
            .find("i")
            .removeClass("fa-angle-up")
            .addClass("fa-angle-down");
    } else {
        $(".faq-accordion > a i")
            .removeClass("fa-angle-up")
            .addClass("fa-angle-down");
        $(this)
            .find("i")
            .removeClass("fa-angle-down")
            .addClass("fa-angle-up");
        $(".faq-accordion > a").removeClass("active");
        $(this).addClass("active");
        $(".faq-content").slideUp(250);
        $(this)
            .siblings(".faq-content")
            .slideDown(250);
    }

});
$('.faq-accordion > a').bind('click', function () {
    var self = this;
    setTimeout(function () {
        theOffset = $(self).offset();
        $('body,html').animate({
            scrollTop: theOffset.top - $("header").height()

        });
    }, 500); // ensure the collapse animation is done
});


$('.faq-accordion > a').bind('click', function () {

    var self = this;

    setTimeout(function () {

        theOffset = $(self).offset();

        $('body,html').animate({

            scrollTop: theOffset.top - $("header").height()



        });

    }, 500); // ensure the collapse animation is done

});


// Form validations/
$(document).ready(function () {

    jQuery.validator.addMethod("EmailVal", function (e, t) {
        var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.optional(t) || o.test(e)
    }, "Please enter a valid email address.");
    if (jQuery("#fe297").length > 0) {
        document.getElementById('fe297').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?0-0?)?(\([0-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please specify a valid phone number");

    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");

    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only");

    jQuery.validator.addMethod("zipcode", function (value, element) {
        return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
    }, "Please provide a valid zipcode.");

    $("#zipcode").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            return false;
        }
    });

    // Multiple Form Validation in single js code//
    $("form[data-form-validate='true']").each(function () {
        $(this).validate({
            rules: {
                name: {
                    noSpace: true
                },
                fullname:{
                    noSpace: true
                },
                stayFullname:{
                    noSpace: true
                },
                stayEmail:{
                     noSpace: true,
                     EmailVal: !0
                 },
                 username:{
                    noSpace: true
                 },
                 password:{
                    noSpace: true
                 },
                zipcode: {
                    noSpace: true,
                    zipcode: true
                },
                bbname: {
                    noSpace: true
                },
                email: {
                    EmailVal: !0,
                    noSpace: true
                },
                contactMail: {
                    EmailVal: !0,
                    noSpace: true
                },
                phone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                newsemail: {
                    EmailVal: !0,
                    noSpace: true
                },
                bbemail: {
                    EmailVal: !0,
                    noSpace: true
                },
                cntPhNumber: {
                    minlength: 13,
                    phoneUS: true
                },
                profilebuilderZipcode: {
                    noSpace: true,
                    zipcode: true
                }

            },
            ignore: [],
            highlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).addClass(errorClass);

                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
            },
            unhighlight: function (element, errorClass) {

                var selector = "#" + element.id;
                $(selector).removeClass(errorClass);
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $('input[type="text"]').each(function () {
                    if ($(this).val() == "") {
                        $(this).parent().removeClass("successForm");
                    }
                });
            },
            submitHandler: function (form) {
                var reCaptchaID = $(this).find(".recaptcha-holder").attr("id");

                //grecaptcha.reset(reCaptchaID);
                //grecaptcha.execute(reCaptchaID);
                return false;
            },
            errorPlacement: function (error, element) { }

        });
    });

});



// function create_custom_dropdowns() {
//     $('select.contact').each(function (i, select) {
//         if (!$(this).next().hasClass('dropdown')) {
//             $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
//             var dropdown = $(this).next();
//             var options = $(select).find('option');
//             var selected = $(this).find('option:selected');
//             dropdown.find('.current').html(selected.data('display-text') || selected.text());
//             options.each(function (j, o) {
//                 var display = $(o).data('display-text') || '';
//                 dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
//             });
//         }
//     });
// }

// Event listeners

// Open/close
$(document).on('click', '.dropdown', function (event) {
    $('.dropdown').not($(this)).removeClass('open');
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
        $(this).find('.option').attr('tabindex', 0);
        $(this).find('.selected').focus();
    } else {
        $(this).find('.option').removeAttr('tabindex');
        $(this).focus();
    }
});
// Close when clicking outside
$(document).on('click', function (event) {
    if ($(event.target).closest('.dropdown').length === 0) {
        $('.dropdown').removeClass('open');
        $('.dropdown .option').removeAttr('tabindex');
    }
    event.stopPropagation();
});
// Option click
$(document).on('click', '.dropdown .option', function (event) {
    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown').find('.current').text(text);
    $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown', function (event) {
    var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
    // Space or Enter
    if (event.keyCode == 32 || event.keyCode == 13) {
        if ($(this).hasClass('open')) {
            focused_option.trigger('click');
        } else {
            $(this).trigger('click');
        }
        return false;
        // Down
    } else if (event.keyCode == 40) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            focused_option.next().focus();
        }
        return false;
        // Up
    } else if (event.keyCode == 38) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
            focused_option.prev().focus();
        }
        return false;
        // Esc
    } else if (event.keyCode == 27) {
        if ($(this).hasClass('open')) {
            $(this).trigger('click');
        }
        return false;
    }
});

// $(document).ready(function () {
//     create_custom_dropdowns();
// });




if ($('.historyModule').length > 0) {
    $("#timeline_dropdown").selectmenu()
        .selectmenu("menuWidget")
        .addClass("citybottomBorder");

    function windowSize() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        return x;
    }

    function windowHeight() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        return y;
    }

    function animate_time_line() {
        if (!$('.decade-wrapper').hasClass('scrolling')) {
            $('ul.timeline.active .timeline-panel').each(function () {
                var e = 0;
                if ($(window).scrollTop() + windowHeight() > $(this).offset().top && $(this).hasClass("is-hidden")) {
                    var a = $(this);
                    setTimeout(function () {
                        a.removeClass("is-hidden").addClass("animated swing");
                    }, e);
                }
                e += 300;
            });
        }
    }

    // function auto_video_height() {
    //     if ($('.homeBanner-wrapper video').length > 0) {
    //         if (windowSize() >= 768) {
    //             $('.timelineWrapper .homeBanner-wrapper').attr("style", "");
    //             var h = windowHeight();
    //             $('header,header .homeBanner-wrapper').css({
    //                 'height': h
    //             });
    //         } else {
    //             $('header,header .homeBanner-wrapper').attr("style", "");
    //             var h = windowHeight() - $('header').innerHeight();
    //             $('.timelineWrapper .homeBanner-wrapper').css({
    //                 'height': h
    //             });
    //         }
    //     }
    // }

    function make_sticky_nav() {
        var TopMargin = $('.timelineWrapper').offset().top;
        var scrollHeight = $(document).scrollTop();
        if (windowSize() >= 1280) {
            if (scrollHeight >= TopMargin) {
                var h = $('.decade-wrapper').height();
                $('.sticky-wrapper').removeClass('unsticky');
                $('.decade-wrapper').addClass('sticky');
            } else {
                $('.sticky-wrapper').addClass('unsticky');
                $('.decade-wrapper').removeClass("sticky").fadeIn(1000);
            }
        } else if (windowSize() >= 1024) {
            if (scrollHeight >= TopMargin) {
                var h = $('.decade-wrapper').height();
                $('.sticky-wrapper').removeClass('unsticky');
                $('.decade-wrapper').addClass('sticky');
            } else {
                $('.sticky-wrapper').addClass('unsticky');
                $('.decade-wrapper').removeClass("sticky").fadeIn(1000);
            }
        } else if (windowSize() >= 768) {
            if (scrollHeight >= TopMargin) {
                var h = $('.decade-wrapper').height();
                $('.sticky-wrapper').removeClass('unsticky');
                $('.decade-wrapper').addClass('sticky');
            } else {
                $('.sticky-wrapper').addClass('unsticky');
                $('.decade-wrapper').removeClass("sticky").fadeIn(1000);
            }
        } else {
            if (scrollHeight >= TopMargin) {
                var h = $('.decade-wrapper').height();
                $('.sticky-wrapper').removeClass('unsticky');
                $('.decade-wrapper').addClass('sticky');
                $('.ui-selectmenu-menu').addClass('sticky');
                $('.ui-selectmenu-button').addClass("sticky_select");
            } else {
                $('.sticky-wrapper').removeClass('unsticky');
                $('.decade-wrapper').removeClass("sticky").fadeIn(1000);
                $('.ui-selectmenu-menu').removeClass("sticky");
                $('.ui-selectmenu-button').removeClass("sticky_select");
            }
        }
    }

    function make_position_margin() {
        var w = $('header').width();
        $('.footer-wrapper').css('width', w);
    }

    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
        var max = arr[0];
        var maxIndex = 0;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
        return maxIndex;
    }

    function auto_position_timeline() {
        var leftTopMargin = 0;
        var rightTopMargin = 0;
        var pos = [];
        var key = 0;
        $('.timeline.active li').each(function () {
            if (!$(this).hasClass('clearfix')) {
                $(this).attr('style', '');
            }
        });
        $('.timeline.active li:not(".timeline-inverted")').each(function () {
            var gap = 0;
            if (windowSize() >= 1360) {
                if ($(this).prev().prev().prop('tagName') == "LI" && !$(this).hasClass('clearfix')) {
                    var top = $(this).offset().top;
                    var prevTop = $(this).prev().prev().offset().top + $(this).prev().prev().outerHeight();
                    gap = Math.round(top - prevTop);
                    if (gap > 60) {
                        gap = gap - 60;
                        $(this).css({
                            'margin-top': '-' + gap
                        });
                    }
                    leftTopMargin = $(this).offset().top + $(this).outerHeight();
                    pos[key] = leftTopMargin;
                    key++;
                }
            } else if (windowSize() >= 1024) {
                if ($(this).prev().prev().prop('tagName') == "LI" && !$(this).hasClass('clearfix')) {
                    var top = $(this).offset().top;
                    var prevTop = $(this).prev().prev().offset().top + $(this).prev().prev().outerHeight();
                    gap = Math.round(top - prevTop);
                    if (gap > 30) {
                        gap = gap - 30;
                        $(this).css({
                            'margin-top': '-' + gap
                        });
                    }
                    leftTopMargin = $(this).offset().top + $(this).outerHeight();
                    pos[key] = leftTopMargin;
                    key++;
                }
            } else if (windowSize() <= 1023 && !$(this).hasClass('clearfix')) {
                $(this).attr('style', '');
            }
        });
        $('.timeline.active li.timeline-inverted').each(function () {
            var gap = 0;
            if (windowSize() >= 1360) {
                if ($(this).prev().prev().prop('tagName') == "LI" && !$(this).hasClass('clearfix')) {
                    var top = $(this).offset().top;
                    var prevTop = $(this).prev().prev().offset().top + $(this).prev().prev().outerHeight();
                    gap = Math.round(top - prevTop);
                    if (gap > 60) {
                        gap = gap - 60;
                        $(this).css({
                            'margin-top': '-' + gap
                        });
                    }
                    rightTopMargin = $(this).offset().top + $(this).outerHeight();
                    pos[key] = rightTopMargin;
                    key++;
                }
            } else if (windowSize() >= 1024) {
                if ($(this).prev().prev().prop('tagName') == "LI" && !$(this).hasClass('clearfix')) {
                    var top = $(this).offset().top;
                    var prevTop = $(this).prev().prev().offset().top + $(this).prev().prev().outerHeight();
                    gap = Math.round(top - prevTop);
                    if (gap > 30) {
                        gap = gap - 30;
                        $(this).css({
                            'margin-top': '-' + gap
                        });
                    }
                    rightTopMargin = $(this).offset().top + $(this).outerHeight();
                    pos[key] = rightTopMargin;
                    key++;
                }
            } else if (windowSize() <= 1023 && !$(this).hasClass('clearfix')) {
                $(this).attr('style', '');
            }
        });
    }
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) {
        is_safari = false;
    }
    if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }
    $(document).ready(function () {
        $('.decade-wrapper').each(function () {
            var sticky = $(this);
            var stickyWrapper = $('<div>').addClass('sticky-wrapper').addClass('hidden-xs');
            sticky.prepend(stickyWrapper);
        });
        $('.decade-year-dropdown').selectmenu();
        $('li.audio').click(function () {
            if ($(this).data('mute')) {
                $(this).find('.audio').hide();
                $(this).find('.audioMute').css({
                    "opacity": "0",
                    "display": "block",
                }).show().animate({
                    opacity: 1
                });
                $(this).data('mute', false);
                $("video").prop('muted', false);
            } else {
                $(this).find('.audioMute').hide();
                $(this).find('.audio').css({
                    "opacity": "0",
                    "display": "block",
                }).show().animate({
                    opacity: 1
                });
                $(this).data('mute', true);
                $("video").prop('muted', true)
            }
        });
        $('.arrow-down a').click(function (e) {
            var tab_id = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(tab_id).offset().top
            }, 2000);
            e.preventDefault();
        });
        $('.arrow-up a').click(function (e) {
            var tab_id = $(this).attr('href');
            $('html, body').animate({
                scrollTop: 0
            }, 2000);
            e.preventDefault();
        });
        $("body").on("click", 'ul.tabs li:nth-child(even) a,.ui-widget.ui-widget-content li:nth-child(even)', function (event) {
            $('body').removeClass('odd').addClass('even');
        });
        $("body").on("click", 'ul.tabs li:nth-child(odd) a,.ui-widget.ui-widget-content li:nth-child(odd)', function (event) {
            $('body').removeClass('even').addClass('odd');
        });
        $('ul.tabs li a').click(function (e) {
            if (!$(this).hasClass('active')) {
                var tab_id = $(this).attr('href');
                $('ul.tabs li a').removeClass('active');
                $(this).addClass('active');
                $(".timeline").removeClass('active');
                $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                $(tab_id + '_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                $('.timeline li:not(".clearfix")').attr('style', '');
                var overlapHeight = 0;
                if ($('.decade-wrapper').hasClass('sticky')) {
                    overlapHeight = $('.decade-wrapper').outerHeight() / 2;
                }
                $('.sticky-wrapper').attr('style', '');
                $('.decade-wrapper').removeClass("sticky");
                $('.decade-wrapper').addClass('scrolling');
                $(tab_id).addClass('active');
                $(tab_id + '_flex').addClass('active');
                tab_id = tab_id.replace("#", "");
                $('.decade-year-dropdown').val(tab_id);
                $('.decade-year-dropdown').selectmenu("refresh");
                if (overlapHeight != 0) {
                    $('html, body').stop().animate({
                        scrollTop: $('.decade-wrapper').offset().top - 40 - $(".stickyEmpty").height()
                    }, 1000, function () {
                        $('.decade-wrapper').removeClass('scrolling');
                        make_sticky_nav();
                        auto_position_timeline();
                        animate_time_line();
                    });
                } else {
                    $('html, body').stop().animate({
                        scrollTop: $('.decade-wrapper').offset().top - 40 - $(".stickyEmpty").height()
                    }, 1000, function () {
                        $('.decade-wrapper').removeClass('scrolling');
                        make_sticky_nav();
                        auto_position_timeline();
                        animate_time_line();
                    });
                }
            }
            e.preventDefault();
        });
        $('.decade-year-dropdown').on('selectmenuchange', function () {
            var tab_id = "#" + $(this).val();
            $('ul.tabs li a').removeClass('active');
            $("ul.tabs li a[href='" + tab_id + "']").addClass('active');
            $(".timeline").removeClass('active');
            $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
            $(tab_id + '_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
            $(tab_id).addClass('active');
            $(tab_id + '_flex').addClass('active');
            $('.decade-wrapper').addClass('scrolling');
            var overlapHeight = 0;
            if ($('.decade-wrapper').hasClass('sticky')) {
                overlapHeight = $('.decade-wrapper').outerHeight() / 2;
            }
            $('.sticky-wrapper').attr('style', '');
            $('.decade-wrapper').removeClass("sticky");
            $('.ui-selectmenu-menu').removeClass("sticky");
            $('.ui-selectmenu-button').removeClass("sticky_select");
            if (overlapHeight != 0) {
                $('html, body').stop().animate({
                    scrollTop: $('.decade-wrapper').offset().top - $(".stickyEmpty").height()
                }, 750, function () {
                    $('.decade-wrapper').removeClass('scrolling');
                    make_sticky_nav();
                    auto_position_timeline();
                    animate_time_line();
                });
            } else {
                $('html, body').stop().animate({
                    scrollTop: $('.decade-wrapper').offset().top - $(".stickyEmpty").height()
                }, 750, function () {
                    $('.decade-wrapper').removeClass('scrolling');
                    make_sticky_nav();
                    auto_position_timeline();
                    animate_time_line();
                });
            }
        });
        make_sticky_nav();
        make_position_margin();
        animate_time_line();
        $(window).on("load resize scroll", function (e) {
            make_sticky_nav();
            animate_time_line();
            auto_position_timeline();
        });
        var isMobile = false;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
        if (isMobile && $('video').length > 0) {
            var posterUrl = $('header .homeBanner-wrapper video').attr('poster');
            $('header .homeBanner-wrapper video').remove();
            $('header .homeBanner-wrapper').html('<img src="' + posterUrl + '" alt="banner" />');
        }
        $(window).on("load resize", function (e) {
            make_position_margin();
        });
        $(function () {
            $("#timeline_dropdown-menu").addClass('timeline_dropdown');
            $('#timeline_dropdown-button').addClass('timelineselectNav');
            $('#decade-year-dropdown').selectmenu('menuWidget').addClass('mtimeline');
            $(".ui-selectmenu-menu").addClass('mtimelineLst');
        });
    });
}



// some custom code to illustrate how to use openSegment() and closeSegment()
$(function () {
    $(".openSegmentBtn").on("click", function (e) {
        var index = parseInt($(e.target).data("index"), 10);
        pie.openSegment(index);
    });

    $("#closeSegmentBtn").on("click", function () {
        pie.closeSegment();
    });
});




var isshow = window.localStorage.getItem('isshow');
var isshowalert = window.localStorage.getItem('isshowalert');
var alertsContent = window.localStorage.getItem('alertsContent');
var alertsContentHtml = $("#alertscontent").html();
// console.log(alertsContent);
// console.log(alertsContentHtml);
if (alertsContentHtml != alertsContent) {
    $(".alertsPannel").fadeIn();
}

$(".alertsPannel").length > 0 && ($(this).addClass("active"),
    $("header").addClass("alertadded"));

$(".alertsPannel").length > 0 && ($(this).addClass("active"),
    $("header").addClass("alertadded"));
$("#alertsPannelClose").on("click", function () {
    $(this).closest(".alertsPannel").fadeOut();
    $('header').removeClass('alertadded');
    window.localStorage.setItem('alertsContent', alertsContentHtml);
    window.localStorage.setItem('isshowalert', 1);
    setTimeout(function () {
        //alert($('header').outerHeight());
        $('.SubmenuWrapper').css({ 'top': '' });
    }, 100);
    var headHgts1 = $('.menugridsec').height() + 35;
    var heightSticky = 150;
    if ($(window).width() <= 767) {
        heightSticky = 50;
    }
    if ($(window).width() <= 1023) {
        heightSticky = 98;
    }
    $(".stickyEmpty").css("height", heightSticky);
    $(".mobileMenu").css("top", heightSticky);
    $('.dloginWrapper').css({ 'top': heightSticky });
    $(".menusearchBlock .form-group").css("top", heightSticky);
    $(".menuWrapper.megaMenuList").css("top", heightSticky);
    
    $('.login-wrap, .menu-wrap').css({ 'min-height': 'calc(100% - ' + heightSticky + 'px)' });
    $('.login-wrap, .menu-wrap').css({ 'height': 'calc(100vh - ' + heightSticky + 'px)' });

});


$('.formenable').click(function () {
    var checked = 0;
    $('.formenable').each(function () {
        if (this.checked) {
            checked++;
        }
    });

    if (checked > 0) {
        $(".homeformsection").slideDown();
        $(".btncentersection .ctaborder").removeClass("opacity");
    }
    else {
        $(".homeformsection").slideUp();
        $(".btncentersection .ctaborder").addClass("opacity");
    }
});
 $('.locationWrap .address').click(function() {
    $('.locationWrap .address').removeClass('active');
    $(this).parent().parent().addClass('active');
});
 if ($(".generalTemplate table").hasClass("personalChecking")) {
    $('.generalTemplate').addClass('personalChecking');
}
$('.colblock').each(function(){
        if (!$(this).find('div').hasClass("columnOverlayContent")) {
            $(this).addClass('withoutOverlay');
        };
});

$(".subbannerpanel .btnpanel .orangebtn").on("click", function () {
    var divId = $(this).data("id");
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top - $("header").height() -0
    }, '500');
});

 $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {  
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - $("header").height()
        }, 1000, function() {
          
        });
      }    
  });

  // $(".secondarymenu").mouseenter(function(){            
  //   var menubgHeight = $(".navInner").height() + 60;
  //   var primaryHeight = $(this).find(".listLink").height();
  //   var newHeight = (primaryHeight/2) + 420; 
  //           $('.navInner').animate({
  //               height: newHeight           
  //           });
  //       }).mouseleave(function(){
  //       $('.navInner').animate({
  //               height: 380
  //           });
  //       });
  
  
$(window).on('load', function () {
     setTimeout(function(){ 
    $('.threecolumnModule .offerImages .colblock.videoblock .bcmPlayerBanner').css({'width': "", 'height': ""});
}, 1200);
 });

 
$(".menu-mega-blog-nav li").hover(function () {
    $(this).parent().find('.menuItem.secondarymenu').each(function () {
        $(this).removeClass("show");
        $('.menu-mega-blog-nav li:nth-child(2)').removeClass('show');
    })
    $(this).addClass("show");
    // $('.secondarymenulist').attr("style","");//
    //var headerHgt = $(this).find('.secondarymenulist .grid.grid-lined').outerHeight(true);
    //$(this).parent().parent().parent().find('.secondarymenulist').css({'min-height': headerHgt});
});
$('.menu-mega-blog a.first-level-link').on('click', function (e) {
    $('.menu-mega-blog-nav li').removeClass('show');
    $('.menu-mega-blog-nav li:nth-child(2)').addClass('show');
});


// $(".header-menu ul").find("li.dropdownMenu").each(function(){
//    var i=$(this).index();
//    $(this).find(".menu-mega-blog-nav .menuItem.secondarymenu").each(function(){
//    var currentnav=$(this);
//    // console.log($(this).parent().find(".show"));
//    if($(this).parent().find(".show").length==0){
//        $(this).addClass("show").addClass("active");
//    }else{
//      $(this).find('.secondarymenu ').find("li").each(function(){
//        if($(this).hasClass("show")){
//          currentnav.addClass("show").addClass("active");
//        }
//      });
//    }
//  });
//});

$('.faq-accordion > a').bind('click', function () {
    setTimeout(function () {
        $('.threecolumnModule .offerImages .colblock.videoblock .bcmPlayerBanner').css({'width': "", 'height': ""});

    }, 500);

});

$(window).on("load resize", function (i) {
    var h = $(window).width();
    if (0 < $(".threecolumnModule ").length) {
            $(".threecolumnModule ").find(".offerImages .colblock p.caption").css("height", ""), 767 < h && $(".threecolumnModule ").each(function () {
                var i = 3,
                    o = 0,
                    e = 0,
                    t = 0,
                    n = parseInt($(this).find(".offerImages .colblock").length / i);
                if (767 < h && h <= 1023) i = 2;
                else i = 3;
                0 <= n && (n += 1);
                for (var s = 1, u = i, c = 1; c <= n; c++) $(this).find(".threeColumnWrap").each(function () {
                    $(this).find(".offerImages .colblock p.caption").each(function (i, n) {
                        s <= (i += 1) && i <= u && (e = e > $(this).height() ? e : $(this).height())
                    }), $(this).find(".offerImages .colblock p.caption").each(function (i, n) {
                        s <= (i += 1) && i <= u && $(this).css({
                            height: e
                        })
                    }), o = t = e = "", s = u + 1, u += i
                })
            })
    }
});
$(".dLogin").click(function () {
    $('html, body').animate({ scrollTop: '0px' }, 800);
});

$(document).ready(function () {
    $(".dialicon input[type='textarea']").click(function () {
        $(this).select();
    });
});

$(document).ready(function () {

    console.log($( window ).height());

    if ($(window).height() < 769) {

        $('.menuWrapper').css('overflow', 'auto');

     }

});  

$(document).ready(function () {
     if ($(window).innerWidth() > 767) {
    $(window).on("load resize", function (e) {
$('.colblock span').each(function() {
    var $divs = $(this).add($(this).prev('.reconpanel'));
    var tallestHeight = $divs.map(function(i, el) {
        return $(el).height() + 10;
    }).get();  
     $('.reconpanel').css('min-height', tallestHeight+'px');
});
});
    }

});


$(document).ready(function () {

 setTimeout(function() { 
    $('.homeBanner .videocontent p a span.cta-txt').addClass('visible');
    $('.homeBanner .videocontent p a span.cta-img').addClass('trans');
}, 5000);  

    
if ($('.homeBannervideo').length > 0) {

    var homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
    var swiperHomeBanner = new Swiper('.homeBannervideo', {
        // lazy: true,
        loop: false,
        // loopedSlides: 3,
        // loopPreventsSlide: true,
        // slidesPerView: 'auto',
        speed: 1000,
        preventClicks: true,
        autoplayDisableOnInteraction: false,
        simulateTouch: false,
        autoplay: {
            delay: homesliderDelay,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
       on: {  
            slideChange: function(el) {
                
                $('.pause-bt, .pause-bt-vimeo').css("display", "block");
                $('.play-bt, .play-bt-vimeo').css("display", "none");

                const index_currentSlide = swiperHomeBanner.realIndex;
                console.log(index_currentSlide);
                //var this_dataindex = this.$el.find('.swiper-slide-active').children('.sliderWrapper').find('.videoPanel').data('index');
                //console.log(this_dataindex);
               this.$el.find('.swiper-slide').children('.sliderWrapper').find('.youtubevideopanel').addClass('loaded'); 
               this.$el.find('.swiper-slide').children('.sliderWrapper').find('.vimeovideopanel').addClass('loaded');
               var getyoutubevalue = $('.swiper-slide-active').children('.sliderWrapper').find('figure').hasClass('youtubevideopanel');
               var getvimeovalue = $('.swiper-slide-active').children('.sliderWrapper').find('figure').hasClass('vimeovideopanel');
               var this_dataindex;
               var this_datavimeoindex;
               if (getyoutubevalue) {
                   var pictureyoutubedata = $('.swiper-slide-active').children('.sliderWrapper').find('figure');
                   this_dataindex = $(pictureyoutubedata).attr('data-index');
               }
               if (getvimeovalue) {
                   var picturevimeodata = $('.swiper-slide-active').children('.sliderWrapper').find('figure');
                   this_datavimeoindex = $(picturevimeodata).attr('data-index');
               }

                let previousIndex = this.previousIndex;
                //console.log(previousIndex);

                let currentSlide = this.slides[index_currentSlide]

                var this_dataindex_1 = currentSlide.id;
                //console.log(this_dataindex_1);
                //console.log(this_dataindex_1.split("-").pop());
                var youvideoIndex = $("#"+this_dataindex_1).find('.youtubevideopanel').data('index');
                var vimeovideoIndex = $("#"+this_dataindex_1).find('.vimeovideopanel').data('index');
                //console.log(videoIndex);

                //console.log($("#"+this_dataindex_1).find('.videoPanel'));
                if (youvideoIndex >= 0 ) {
                    YoutubeplayerList[youvideoIndex].playVideo();
                    $(youvideoIndex).find('.youtube-video-src').show();
                }else if (youvideoIndex == "undefined"){
                    YoutubeplayerList[youvideoIndex].pauseVideo();
                    $(".pause-bt").trigger("click");
                }

                if (vimeovideoIndex >= 0 ) {
                    VimeoplayerList[vimeovideoIndex].play();
                    $(vimeovideoIndex).find('.vimeo-video-src').show();
                }else if (vimeovideoIndex == "undefined"){
                    VimeoplayerList[vimeovideoIndex].pause();
                    $(".pause-bt-vimeo").trigger("click");
                }

                if ( previousIndex == 0 ) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if (previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if (!previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
               if (index_currentSlide == 0) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
                else if(index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if(!index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
            },
        },

    });
    
    // $(window).on("load", function(e) {

    //     if ($('.filter-img').hasClass('onloadVideo')) {
    //         $('.filter-img.onloadVideo .video-thumb-image').trigger('click');
    //     }
    // });

    var pgClick = 0;
    $(".swiper-button-play").click(function() {
        if (pgClick == 0) {
            swiperHomeBanner.autoplay.stop();
            $(this).addClass("active");
            pgClick = 1;
        } else {
            swiperHomeBanner.autoplay.start();
            $(this).removeClass("active");
            pgClick = 0;
        }
    });
    function onPlayerReady(event) {
        event.target.setVolume(80);
        event.target.playVideo();
        //player.mute();
    }     
    // $(".play-bt, .play-bt-vimeo").click(function () {
    //     swiperHomeBanner.autoplay.stop();
    //     $(".swiper-button-play").addClass("active");
    // });
    // $(".pause-bt, .pause-bt-vimeo").click(function () {
    //     swiperHomeBanner.autoplay.start();
    //     $(".swiper-button-play").removeClass("active");
    // }); 
 }
 if ($('.newhero .homeBannervideo').length > 0) {
        var bannerid = $(".newhero .temp1.swiper-slide").attr("id");
        $("#" + bannerid).find('.filter-img').addClass('onloadVideo');
        if ($(".newhero .swiper-slide").hasClass('temp1')) {
            if ($(".newhero .swiper-slide .videoPanel").hasClass('youtubevideopanel')) {
                $(".newhero .video-container .filter-img.videoclick .youtubevideopanel").each(function () {
                    setTimeout(function() { 
                        $(".play-bt").trigger("click");
                    }, 3000);
                });
            }
            if ($(".newhero .swiper-slide .videoPanel").hasClass('vimeovideopanel')) {
                $(".newhero .video-container .filter-img.videoclick .vimeovideopanel").each(function () {
                    setTimeout(function() { 
                        $(".play-bt-vimeo").trigger("click");
                    }, 3000);
                });
            }
        }
 }
});

if ($(".videosectionwrap").length > 0) {

    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $(this).closest('.sliderWrapper').find('.youtube-video-src').trigger('click');
        //$(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        $(this).closest('.sliderWrapper').find('.mute-bt').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.expand').removeClass("p-none");
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");
        console.log(dataIndex);
        if (dataIndex >= 0 ) {
             $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
             //YoutubeplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading, hideloading");
        //console.log(dataIndex);
        $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });

    $('.mute-bt').on('click', function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            YoutubeplayerList[dataIndex].mute();
            $(this).removeClass('mute').text('');
        } else {
            YoutubeplayerList[dataIndex].unMute();
            $(this).addClass('mute').text('');
        }
    });
    $(".expand").click(function () {
        //alert("hi");
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($('.filter-img').hasClass('videoclick')) {
            $('.filter-img.videoclick .video-thumb-image').addClass('fullscreen');
        }
        $(".play-bt").hide();
        $(".pause-bt").show();
        var iframe =  $('.youtube-video-src')[dataIndex];
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        YoutubeplayerList[dataIndex].unMute();
        $('.mute-bt').addClass('mute');
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen || iframe.msRequestFullscreen || iframe.webkitEnterFullscreen;
        if (requestFullScreen) {
            requestFullScreen.bind(iframe)();
        }
    });

    $(".play-bt-vimeo").click(function () {
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        $(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        $(this).closest('.sliderWrapper').find('.mute-bt-vimeo').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.expand-vimeo').removeClass("p-none");
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");
        //console.log(dataIndex);
        if (dataIndex >= 0) {
            VimeoplayerList[dataIndex].play();
            //VimeoplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt-vimeo").click(function () {
        $(".play-bt-vimeo").show();
        $(".pause-bt-vimeo").hide();
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading, hideloading");
        //console.log(dataIndex);
        VimeoplayerList[dataIndex].pause();
    });

    $('.mute-bt-vimeo').on('click', function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            VimeoplayerList[dataIndex].setMuted(true);
            $(this).removeClass('mute').text('');
        } else {
            VimeoplayerList[dataIndex].setMuted(false);
            $(this).addClass('mute').text('');
        }
    });
    $(".expand-vimeo").click(function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($('.filter-img').hasClass('videoclick')) {
            $('.filter-img.videoclick .video-thumb-image').addClass('fullscreen');
        }
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        var iframe = $('.vimeo-video-src')[dataIndex];
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");
        VimeoplayerList[dataIndex].play();
        VimeoplayerList[dataIndex].setMuted(false);
        $('.mute-bt-vimeo').addClass('mute');
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen || iframe.msRequestFullscreen || iframe.webkitEnterFullscreen;
        if (requestFullScreen) {
            requestFullScreen.bind(iframe)();
        }
    });
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement && !document.msRequestFullscreen && !document.webkitEnterFullscreen) {
            $('.filter-img .video-thumb-image').removeClass('fullscreen');
        }
    }
}
$(document).ready(function () {
    $(window).on("load resize", function (e) {
    if ($(window).outerWidth() < 768) {      
            var headHgt = $('.hero-landing-form').height();
            $('.ll-icon').css('margin-top', headHgt + 'px');                  
    }
    else {
        $('.ll-icon').css('margin-top', '0' + 'px');
    }
    });
});

$(document).ready(function () {
    if ($(".mySwiper").length > 0) {
        var swiper = new Swiper(".mySwiper", {
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                1023: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                },
                1400: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                },
                1920: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                },
            },
            centeredSlides: false,
            loop: true,
            spaceBetween: 28,
            pagination: {
                el: ".swiper-pagination_builder",
                clickable: true,
            },
            autoplay: {
                delay: 2000, // Set the autoplay delay in milliseconds
                disableOnInteraction: false, // Allow interaction to stop autoplay
            },
            on: {
                init: function () {
                    // Call the function to update dots
                    updateDots.call(this);
                },
                slideChange: function () {
                    // Call the function to update dots
                    updateDots.call(this);
                },
            },
        });

        // Get the toggle button
        var toggleButton = document.querySelector(".swiper-button-toggle");

        // Toggle button click event
        toggleButton.addEventListener("click", function () {
            if (swiper.autoplay.running) {
                swiper.autoplay.stop();
                toggleButton.classList.add("Play");
            } else {
                swiper.autoplay.start();
                toggleButton.classList.remove("Play");
            }
        });
        function updateDots() {
            // Update the active dot based on the active index
            var dots = document.querySelectorAll(".swiper-dot");
            dots.forEach(function (dot, index) {
                dot.classList.toggle("active", index === this.realIndex);
            }, this);
        }
    }


    if ($(".mySwiper_personal").length > 0) {
        var swipernew = new Swiper(".mySwiper_personal", {
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                1023: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                },
                1400: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                },
                1920: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                },
            },
            centeredSlides: false,
            loop: true,
            spaceBetween: 28,
            pagination: {
                el: ".swiper-pagination_personal",
                clickable: true,
            },
            autoplay: {
                delay: 2000, // Set the autoplay delay in milliseconds
                disableOnInteraction: false, // Allow interaction to stop autoplay
            },
            on: {
                init: function () {
                    // Call the function to update dots
                    updateDotssection.call(this);
                },
                slideChange: function () {
                    // Call the function to update dots
                    updateDotssection.call(this);
                },
            },

        });

        // Get the toggle button
        var toggleButtonperson = document.querySelector(".swiper-button-toggle_personal");
        // Toggle button click event
        toggleButtonperson.addEventListener("click", function () {
            if (swipernew.autoplay.running) {
                swipernew.autoplay.stop();
                toggleButtonperson.classList.add("Play");
            } else {
                swipernew.autoplay.start();
                toggleButtonperson.classList.remove("Play");
            }
        });

        function updateDotssection() {
            // Update the active dot based on the active index
            var dots = document.querySelectorAll(".swiper-dot");
            dots.forEach(function (dot, index) {
                dot.classList.toggle("active", index === this.realIndex);
            }, this);
        }
    }
});

/*-----Box SliderPanel------*/
$(document).ready(function () {
    if ($('.BusinesssliderPanel').length > 0) {
        var swiperBusinesssliderDelay = $(".BusinessSliderDelay").val();
        var swiperBusinessPanel = new Swiper('.BusinessCarousel', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        centeredSlides: false,
        spaceBetween: 28,
        loop: true,
        loopedSlides: 10,
        watchSlidesVisibility: true,
        updateOnWindowResize: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: swiperBusinesssliderDelay,
            disableOnInteraction: false,
        },
        breakpoints: {
                768: {
                    slidesPerView: 1,
                    slidesPerGroup: 1, 
                    spaceBetween: 8, 
                },
                1400: {
                    slidesPerView: 1,
                    slidesPerGroup: 1, 
                    spaceBetween: 28,
                }
            },
        });
        var pgClickBusiness = 0;
        $(".BusinesssliderPanel .swiper-button-toggle").click(function() {
            if (pgClickBusiness == 0) {
                swiperBusinessPanel.autoplay.stop();
                $(this).addClass("active");
                pgClickBusiness = 1;
            } else {
                swiperBusinessPanel.autoplay.start();
                $(this).removeClass("active");
                pgClickBusiness = 0;
            }
        }); 
    }
    if ($('.PersonalsliderPanel').length > 0) {
        var swiperPersonalsliderDelay = $(".PersonalSliderDelay").val();
        var swiperPersonalPanel = new Swiper('.PersonalCarousel', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        centeredSlides: false,
        spaceBetween: 28,
        loop: true,
        loopedSlides: 10,
        watchSlidesVisibility: true,
        updateOnWindowResize: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: swiperPersonalsliderDelay,
            disableOnInteraction: false,
        },
        breakpoints: {
                768: {
                    slidesPerView: 1,
                    slidesPerGroup: 1, 
                    spaceBetween: 8, 
                },
                1400: {
                    slidesPerView: 1,
                    slidesPerGroup: 1, 
                    spaceBetween: 28,
                }
            },
        });
        var pgClickPersonal = 0;
        $(".PersonalsliderPanel .swiper-button-toggle").click(function() {
            if (pgClickPersonal == 0) {
                swiperPersonalPanel.autoplay.stop();
                $(this).addClass("active");
                pgClickPersonal = 1;
            } else {
                swiperPersonalPanel.autoplay.start();
                $(this).removeClass("active");
                pgClickPersonal = 0;
            }
        }); 
    }
    $(window).on("resize", function (e) {
        if ($('.BusinesssliderPanel').length > 0) {
            var swiperBusinesssliderDelay = $(".BusinessSliderDelay").val();
            var swiperBusinessPanel = new Swiper('.BusinessCarousel', {
                slidesPerView: 2,
                slidesPerGroup: 2,
                centeredSlides: false,
                spaceBetween: 28,
                loop: true,
                loopedSlides: 10,
                watchSlidesVisibility: true,
                updateOnWindowResize: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                autoplay: {
                    delay: swiperBusinesssliderDelay,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 8,
                    },
                    1400: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 28,
                    }
                },
            });
            
        }
        if ($('.PersonalsliderPanel').length > 0) {
            var swiperPersonalsliderDelay = $(".PersonalSliderDelay").val();
            var swiperPersonalPanel = new Swiper('.PersonalCarousel', {
                slidesPerView: 2,
                slidesPerGroup: 2,
                centeredSlides: false,
                spaceBetween: 28,
                loop: true,
                loopedSlides: 10,
                watchSlidesVisibility: true,
                updateOnWindowResize: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                autoplay: {
                    delay: swiperPersonalsliderDelay,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 8,
                    },
                    1400: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 28,
                    }
                },
            });            
        }
    });
}); 