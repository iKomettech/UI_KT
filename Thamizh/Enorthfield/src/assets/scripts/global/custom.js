
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
var shrinkHeader = 70;
var sticyhead;
$(window).scroll(function () {
    var scroll = getCurrentScroll();
    sticyhead = $('.sticky').height();
    //console.log(sticyhead);
    if (scroll >= shrinkHeader) {
        $('.sticky').addClass('active');
        $('.stickyEmpty').css('height', sticyhead);
    }
    else {
        $('.sticky').removeClass('active');
        $('.stickyEmpty').css('height', sticyhead);
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
    $('a[href*=\\#]:not([href=\\#])').on('click', function () {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - $("header").height()
            }, 1000);
            return false;
        }
    });
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
        $('.mobileMenu, .hamburger, .mhamburger').removeClass('active');
        $('.mnavWrapper').removeClass('active');
        $(".hamburger, .mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger ").removeClass('active');
        $('.nav-wrapper').removeClass('show-menu');
        $('body').removeClass('menuOpened');
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
    $('.hamburger .mhamburger').click(function (e) {
        e.preventDefault();
        $(this).trigger("blur");
        $('header').addClass('menuOpenState');
        $(this).toggleClass('active');
        $('html').toggleClass('menuOpened');
        $('.mnavWrapper').toggleClass('active');
        $('.innerloginWrapper').removeClass('active');
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

    $('.hamburger .mhamburger').click(function (f) {
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
    $('.hamburger .mhamburger').click(function (e) {
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
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login").css('top', alertpanelhgt);
    if (windowwi <= 1023) {
        $(".fixedSideNav").css('top', alertpanelhgt);
    }


});

$(window).on("load resize", function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login").css('top', alertpanelhgt);
    if (windowwi <= 1023) {
        $(".fixedSideNav").css('top', alertpanelhgt);
    }

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


$(function () {
    $('.login').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('selected');
        $(".innerloginWrapper").toggleClass('active');
        $(".menusearchBlock").removeClass("act");
        $(".hamburger, .mhamburger, .mobileMenu ").removeClass('is-active');
        $(".mhamburger").removeClass('active');
    });
    $('.Loginbtn').on('click', function (event) {
        $('.login').trigger('click');
        $('.nav-wrapper').removeClass('show-menu');
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
$('.tabList').click(function () {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-' + tabID).addClass('active').siblings().removeClass('active');
    var headerheight = $('header').outerHeight() + $('.tab').outerHeight() + 40;
    $('html, body').animate({
        scrollTop: $(".tab-content").offset().top - headerheight
    }, 1000);
});

$(window).on("load resize", function () {
    if (window.innerWidth <= 1023) {
        $(".tabHorizontal ul").addClass("mobileList");
        $(".mobileList li a").click(function () {
            $(".tabHorizontal h4").html($(this).html()).removeClass('active');
            $(".mobileList").slideUp('fast');
        });
    } else {
        $(".tabHorizontal ul").removeClass("mobileList");
        $(".tab .tabHorizontal ul").show();
    }
    $(document).click(function (e) {
        if (window.innerWidth < 1023) {
            if (!$(e.target).is('.tab, .tab *')) {
                $(".tabHorizontal ul").slideUp('fast');
                $(".tabHorizontal h4").removeClass('active');
            }
        }
    });
});


$(document).ready(function () {
    $(".tabHorizontal h4").click(function (e) {
        $(this).toggleClass('active');
        $(".tabHorizontal ul").slideToggle('fast');
        e.stopPropagation();

    });
});

$(function () {
    $(".horizontalTabStyle #tab-1 .biopeople").slice(0, 8).show();
    $(".horizontalTabStyle #loadmore").on('click', function (e) {
        e.preventDefault();
        $(".horizontalTabStyle #tab-1 .biopeople:hidden").slice(0, 4).slideDown(500);
        if ($(".horizontalTabStyle #tab-1 .biopeople:hidden").length == 0) {
            $(".horizontalTabStyle #loadmore").fadeOut();
        }
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
    var heightSticky = 97;
    if ($(window).width() <= 767) {
        heightSticky = 87;
    }
    if ($(window).width() >= 767) {
        heightSticky = 87;
    }
    if ($(window).width() >= 1024) {
        heightSticky = 97;
    }
    $(".stickyEmpty").css("height", heightSticky);
    $(this).closest(".alertsPannel").fadeOut();
    $('.bannerpanel').css('margin-top', -heightSticky);
    var emergencyAlertContentHtml = $('#emergencyAlertContent-' + alertId).html();
    window.localStorage.setItem('emergencyAlertContent', emergencyAlertContentHtml);
});

$(".popup-close").on("click", function () {
    var alertId = $(this).attr('data-alert-id');
    $(this).closest("#alertBox-" + alertId).fadeOut();
    var popupAlertContentHtml = $('#popupAlertContent-' + alertId).html();
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
        //$('.innerloginWrapper').removeClass('active');
        $('body').removeClass('menuOpened');
        $('.nav-wrapper').removeClass('show-menu');
        $('.formSearch').removeClass('searchOpen');
        $('#search-toggle').removeClass('searchclose');
    }
}).resize();

$(document).ready(function () {
    $('.mainMenu li .first-level-link').click(function () {
        $('.mainMenu li.menu-open').removeClass('menu-open');
        $(this).parent().addClass('menu-open');
        $('.formSearch').removeClass('searchOpen');
        $('#search-toggle').removeClass('searchclose');
        $('#search-toggle').removeClass('searchclose');
        $('.innerloginWrapper').removeClass('active');
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
                $('.nav-title .nav-heading-title').text(title);
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
        $('.hamburger .mhamburger').on('click', function (e) {
            e.preventDefault();
            $('.nav-wrapper').toggleClass('show-menu');
            $('.back-visible').trigger('click');
        });

        $('.nav-toggle').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'scroll');
        });

        $('.primarymeu li.has-dropdown a').on('click', function (e) {
            $('.nav-wrapper').removeClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
        });

        $('.topmeu li.has-dropdown a').on('click', function (e) {
            $('.nav-wrapper').toggleClass('menubg');
            $('.nav-wrapper nav .menu-section').css('overflow', 'initial');
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
$('select#desk-account').on('selectmenuchange', function () {
    //console.log("PB");
    //deskvalidator.element($(this));
    var selectedVal = $(this).val();
    $(".accountSelect").find("li").each(function () {
        if ($(this).text() == selectedVal) {
            $(this).addClass("hidden");
        }
        else if ($(this).text() == 'Choose Account Type' && selectedVal == '') {
            $(this).addClass("hidden");
        }
        else {
            $(this).removeClass("hidden");
        }

    });
    $(this).addClass("hideAccountType");
    if ($(this).val() == "Business Online Banking") {
        $("#ebc-form").show();
        $("#pbi-form").hide();
        $('select#desk-account-v2').val("Business Online Banking").selectmenu('refresh');
    }
    else {
        $("#pbi-form").show();
        $("#ebc-form").hide();
    }

    if ($(this).val() != "") {
        $("select#desk-account").removeClass("error");
    } else {
        $("select#desk-account").addClass("error");
    }
});
$(document).ready(function () {
    setTimeout(function () {
        $('select#desk-account').selectmenu('refresh');
        $('select#desk-account-v2').selectmenu('refresh');
        if ($("select#desk-account").val() == "Business Online Banking") {
            $("#ebc-form").show();
            $("#pbi-form").hide();
        }
        else {
            $("#pbi-form").show();
            $("#ebc-form").hide();
        }

        $('select#mob-account').selectmenu('refresh');
        $('select#mob-account-v2').selectmenu('refresh');
        if ($("select#mob-account").val() == "Business Online Banking") {
            $("#ebc-form-mob").show();
            $("#mob-form").hide();
        }
        else {
            $("#mob-form").show();
            $("#ebc-form-mob").hide();
        }
    }, 1000);
});
$('select#desk-account-v2').on('selectmenuchange', function () {
    //console.log("BB");
    //deskvalidatorv2.element($(this));
    var selectedVal = $(this).val();
    $(".accountSelect").find("li").each(function () {
        //console.log($(this).text()+  " "+selectedVal);
        if ($(this).text() == selectedVal) {
            $(this).addClass("hidden");
        }
        else if ($(this).text() == 'Choose Account Type' && selectedVal == '') {
            $(this).addClass("hidden");
        }
        else {
            $(this).removeClass("hidden");
        }

    });
    $(this).addClass("hideAccountType");
    if ($(this).val() == "Business Online Banking") {
        $("#ebc-form").show();
        $("#pbi-form").hide();
    }
    else {
        $("#pbi-form").show();
        $("#ebc-form").hide();
        $('select#desk-account').val("Online Banking").selectmenu('refresh');
    }

    if ($(this).val() != "") {
        $("select#ebc-form").removeClass("error");
    } else {
        $("select#ebc-form").addClass("error");
    }
});
$(document).ready(function () {
    $(".tabpanel .resp-tabs-list li").find("p").parent().find('img').addClass("image_top");
    $(".tabpanel .resp-accordion").find("p").parent().find('img').addClass("image_top");
    $(".iconpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".counterpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".twocolumngridnpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".fourcolumnpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".twocolumnpanel").find(".h2title").parent().parent().parent().parent().addClass("padding_adjust");
    $(".threecolumnpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".imageslicepanel").find(".content-title").parent().parent().addClass("padding_adjust");
    $(".tabsection").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".generalcontent").find(".h2title").parent().parent().parent().parent().addClass("padding_adjust");
    $(".getstartedpanel").find(".h2title").parent().parent().addClass("padding_adjust");
    $(".accordion").find(".h2title").parent().parent().parent().parent().addClass("padding_adjust");
    $(".iconpanel .contentlist .contentitem").find(".ctablock").parent().addClass("cta_adjust");
    $(".alternativepanel").find(".h2title").parent().parent().parent().parent().parent().addClass("padding_adjust");
    $(".comparetablepanel").find(".h2title").parent().parent().parent().addClass("padding_adjust");
});

$(document).ready(function () {
    var heightsnew = $(".iconpanel .contentlist .icontitle").map(function () {
        return $(this).height();
    }).get();
    maxHeightnew = Math.max.apply(null, heightsnew);
    $(".iconpanel .contentlist .icontitle").css('height', maxHeightnew + 35);
    $(window).resize(function () {
        $(".iconpanel .contentlist .icontitle").css('height', maxHeightnew + 35);
    });

    var counterheights = $(".counter-col .countersec").map(function () {
        return $(this).height();
    }).get();
    countermaxHeight = Math.max.apply(null, counterheights);
    $(".counter-col .countersec").css('height', countermaxHeight);
    $(window).resize(function () {
        $(".counter-col .countersec").css('height', countermaxHeight);
    });
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
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream)
    {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
    }
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

$(document).ready(function(){
    if ($(".videopanel .colblock").length >= 4) {
        $(".videopanel .colblock").hide();
        $(".videopanel .colblock").slice(0, 4).show();
        if ($(".colblock").length >= 4) {
            $('.viewallcta').show();
            $(".videopanel #loadmore").on("click", function(e){
                e.preventDefault();
                var target = $(this).attr("href");
                //console.log(target.length);
                $('html, body').animate({
                    scrollTop: $(target).offset().top - $('header').height() - 60
                }, 1000);
                //$('.loader-div').show();
                setTimeout(function () {
                    $(".videopanel .colblock:hidden").slice(0, 4).slideDown(); 
                    if($(".videopanel .colblock").length == $('.videopanel .colblock:visible').length){
                        $('.videopanel .viewallcta').hide();
                    } 
                }, 1000);  
            });
        }
    }
});
