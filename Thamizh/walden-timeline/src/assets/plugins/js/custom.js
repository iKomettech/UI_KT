
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
        $('.dlogin').removeClass('button-removed');
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
        $('.mSearchWrapper').removeClass('search-active');
        $('.fixedSideNave ul li.contactUs').removeClass('nav-open');
        $('.dloginWrapper').css({ 'top': headHgt });
        $('.dLogin').toggleClass('is-active');
        $('.dloginWrapper').toggleClass('is-active');
        $('.hamburger, .mhamburger, .mobileMenu').removeClass('act');
        $('.menusearchBlock ').removeClass('is-active');
        setTimeout(function () {
            console.log('test23')
            var headHgt2 = $('header').height();
            $('.dloginWrapper').css({ 'top': headHgt2 });
        }, 50);
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
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    if (windowwi <= 1023) {
        $(".fixedSideNav").css('top', alertpanelhgt);
    }


});

$(window).on("load resize", function () {
    var windowwi = window.innerWidth;
    var alertpanelhgt = $(".stickyEmpty").height() - 0;
    $(".mobileMenu, .mobile-login, .menuWrapper.megaMenuList").css('top', alertpanelhgt);
    if (windowwi <= 1023) {
        $(".fixedSideNav").css('top', alertpanelhgt);
    }

});
$(document).ready(function () {
    $(document).ready(function () {
        $('.mainManu li .first-level-link').click(function () {
            $('.mainManu li.menu-open').removeClass('menu-open');
            $(this).parent().addClass('menu-open');
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
        $('.menusearchBlock').removeClass('act');
        $('.dLogin').removeClass('button-removed');
        //  $('.dropdownMenu.menu-mega-blog').removeClass('menu-open');
        // $('.dropdownMenu.menu-mega-blog').removeClass('active');
        $('body').removeClass('menuOpened');
        $('.login-menu').css({ 'display': 'none' });
    }
}).resize();



$(document).ready(function () {
    var target = window.location.hash;
    var headerheight = $('header').outerHeight();
    // var offset = 85; // You can change this value as per your need.
    if ($(target).length > 0) {
        $('html, body').animate({
            scrollTop: $(target).offset().top - headerheight
        }, 1000);
    } else {
        console.warn('Element ' + target + ' does not exist');
    }
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


$(document).ready(function () {
    var sOffset = $(".floatingnews").offset();
    var shareheight = $(".floatingnews").height() + 40;
    $(window).scroll(function () {
        var scrollYpos = $(document).scrollTop();
        if ($(window).height() < 700) {
            if (scrollYpos > 50) {
                $(".floatingnews").css({
                    'bottom': '150px',
                    'position': 'fixed',
                    'top': 'auto'
                });
            } else {
                $(".floatingnews").css({
                    'top': '320px',
                    'bottom': 'auto',
                    'position': 'fixed'
                });
                if ($(window).width() < 1280) {
                    $(".floatingnews").css({
                        'top': '320px',
                        'bottom': 'auto',
                        'position': 'fixed'
                    });
                }
                if ($(window).width() < 1024) {
                    $(".floatingnews").css({
                        'top': '320px',
                        'bottom': 'auto',
                        'position': 'fixed'
                    });
                }
            }
        }
    });
});
$(document).ready(function () {
    if ($(window).height() < 700) {
        var sOffset = $(".floatingnews").offset();
        var shareheight = $(".floatingnews").height() + 40;
        $(window).scroll(function () {
            var scrollYpos = $(document).scrollTop();
            if (scrollYpos > 50) {
                $(".floatingnews").css({
                    'bottom': '150px',
                    'position': 'fixed',
                    'top': 'auto'
                });
            } else {
                $(".floatingnews").css({
                    'top': '320px',
                    'bottom': 'auto',
                    'position': 'fixed'
                });
                if ($(window).width() < 1280) {
                    $(".floatingnews").css({
                        'top': '320px',
                        'bottom': 'auto',
                        'position': 'fixed'
                    });
                }
                if ($(window).width() < 1024) {
                    $(".floatingnews").css({
                        'top': '320px',
                        'bottom': 'auto',
                        'position': 'fixed'
                    });
                }
            }
        });
    }
});

$(function () {
    $(".newsQuickLnk").click(function () {
        $(".floatingnews").toggleClass("active");
        var opAct = $(".floatingnews .floatingnewsec").height();
        $(".floatingnews").css("width", opAct);
    });

});

$(window).scroll(function () {
    if ($(".floatingnews.active").length > 0) {
        if (!$(".floatingnews").hasClass("scrolled")) {
            if ($(this).scrollTop() >= 50) {
                $(".floatingnews").addClass("scrolled").removeClass("active");
            }
        }
    }
})


//banner slider panel//

//banner slider panel//
var YoutubeplayerList = [];
var VimeoplayerList = [];
var initYoutubeVideo = null;
var initVimeoVideo = null;
var YoutubevideoPlayers = 0;
var VimeovideoPlayers = 0;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function initYoutubeYoutubevideoPlayers() {
    i = 0;
    YoutubeplayerList = []; //create new array to hold youtube player
    $(".youtube-video-src").each(function () {
        $(this).closest(".videoPanel").attr("data-index", i);
        i++;
        var player = new YT.Player($(this).attr("id"), {
            height: '390',
            width: '640',
            videoId: $(this).attr("data-videoId"),
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                rel: 0,
                showinfo: 0,
                ecver: 0,
                mute: true,
                loop: true,
                controls: 0,
                caption: 0
            }
        });

        function onPlayerReady(event) {
            event.target.setVolume(80);
            event.target.playVideo();
            player.mute();
        }

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                player.seekTo(0);
                player.playVideo();
            }
        }


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

$(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
    if (initYoutubeVideo != null || initYoutubeVideo == '') {
        $(this).addClass("loaded").removeClass("loading");
        var index = $(this).attr("data-index");
        if (YoutubeplayerList.length > 0) {
            console.log(index);
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

if (!($(".iconpanel .icondetail").length <= 6)) {
    $(".iconpanel .icondetail").addClass("nomarginright");
    $(".iconpanel .grid-x").addClass("flexcenter");
}


$('.tabHorizontal .nav.nav-tabs li').click(function () {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-' + tabID).addClass('active').siblings().removeClass('active');
    var headerheight = $('header').outerHeight() + $('.tab').outerHeight() + 40;
    $('html, body').animate({
        scrollTop: $(".tab-content").offset().top - headerheight
    }, 1000);
});


$(document).ready(function () {
    if ($(".dialpadsection").length > 0) {

        $('#knob1').jqxKnob({
            value: 30,
            min: 0,
            max: 100,
            startAngle: 90,
            endAngle: 450,
            snapToStep: true,
            rotation: 'clockwise',

            marks: {
                colorRemaining: { color: '#E1E1E1', border: '#E1E1E1' },
                colorProgress: { color: '#01295B', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 3
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#01295B', stroke: '#E7E7EA' },
                size: '7%',
                offset: '60%',
                background: { fill: '#E7E7EA', stroke: '#E7E7EA' }
            },
            pointer: { type: 'circle', style: { fill: '#EA0031', stroke: '#ffffff' }, size: '5%', offset: '51%', thickness: 3 }
        });

        $('#knob2').jqxKnob({
            value: 40,
            min: 0,
            max: 100,
            startAngle: 90,
            endAngle: 450,
            snapToStep: true,
            rotation: 'clockwise',

            marks: {
                colorRemaining: { color: '#E1E1E1', border: '#E1E1E1' },
                colorProgress: { color: '#01295B', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 3
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#01295B', stroke: '#E7E7EA' },
                size: '7%',
                offset: '60%',
                background: { fill: '#E7E7EA', stroke: '#E7E7EA' }
            },
            pointer: { type: 'circle', style: { fill: '#EA0031', stroke: '#ffffff' }, size: '5%', offset: '51%', thickness: 3 }
        });

        $('#knob3').jqxKnob({
            value: 25,
            min: 0,
            max: 100,
            startAngle: 90,
            endAngle: 450,
            snapToStep: true,
            rotation: 'clockwise',
            marks: {
                colorRemaining: { color: '#E1E1E1', border: '#E1E1E1' },
                colorProgress: { color: '#01295B', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 3
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#01295B', stroke: '#E7E7EA' },
                size: '7%',
                offset: '60%',
                background: { fill: '#E7E7EA', stroke: '#E7E7EA' }
            },
            pointer: { type: 'circle', style: { fill: '#EA0031', stroke: '#ffffff' }, size: '5%', offset: '51%', thickness: 3 }
        });

        $('#knob4').jqxKnob({
            value: 50,
            min: 0,
            max: 100,
            startAngle: 90,
            endAngle: 450,
            snapToStep: true,
            rotation: 'clockwise',
            marks: {
                colorRemaining: { color: '#E1E1E1', border: '#E1E1E1' },
                colorProgress: { color: '#01295B', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 3
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#01295B', stroke: '#E7E7EA' },
                size: '7%',
                offset: '60%',
                background: { fill: '#E7E7EA', stroke: '#E7E7EA' }
            },
            pointer: { type: 'circle', style: { fill: '#EA0031', stroke: '#ffffff' }, size: '5%', offset: '51%', thickness: 3 }
        });

        $('#knob5').jqxKnob({
            value: 20,
            min: 0,
            max: 100,
            startAngle: 90,
            endAngle: 450,
            snapToStep: true,
            rotation: 'clockwise',
            marks: {
                colorRemaining: { color: '#E1E1E1', border: '#E1E1E1' },
                colorProgress: { color: '#01295B', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 3
            },
            labels: {
                offset: '88%',
                step: 10,
                visible: true
            },
            progressBar: {
                style: { fill: '#01295B', stroke: '#E7E7EA' },
                size: '7%',
                offset: '60%',
                background: { fill: '#E7E7EA', stroke: '#E7E7EA' }
            },
            pointer: { type: 'circle', style: { fill: '#EA0031', stroke: '#ffffff' }, size: '5%', offset: '51%', thickness: 3 }
        });

        var input1 = $('<div class="inputField1 inputField">');
        var input2 = $('<div class="inputField2 inputField">');
        var input3 = $('<div class="inputField3 inputField">');
        var input4 = $('<div class="inputField4 inputField">');
        var input5 = $('<div class="inputField5 inputField">');

        $('#knob1').append(input1);
        $('#knob2').append(input2);
        $('#knob3').append(input3);
        $('#knob4').append(input4);
        $('#knob5').append(input5);

        var inputOptions1 = {
            width: 80,
            height: '40px',
            decimal: 30, // starting value same as widget
            min: 0,  // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 0,
            inputMode: 'simple'
        };

        var inputOptions2 = {
            width: 80,
            height: '40px',
            decimal: 40, // starting value same as widget
            min: 0,  // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 0,
            inputMode: 'simple'
        };

        var inputOptions3 = {
            width: 80,
            height: '40px',
            decimal: 25, // starting value same as widget
            min: 0,  // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 0,
            inputMode: 'simple'
        };

        var inputOptions4 = {
            width: 80,
            height: '40px',
            decimal: 50, // starting value same as widget
            min: 0,  // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 0,
            inputMode: 'simple'
        };

        var inputOptions5 = {
            width: 80,
            height: '40px',
            decimal: 20, // starting value same as widget
            min: 0,  // same as widget
            max: 100, // same as widget
            textAlign: 'center',
            decimalDigits: 0,
            inputMode: 'simple'
        };



        $(input1).jqxNumberInput(inputOptions1);
        $(input2).jqxNumberInput(inputOptions2);
        $(input3).jqxNumberInput(inputOptions3);
        $(input4).jqxNumberInput(inputOptions4);
        $(input5).jqxNumberInput(inputOptions5);


        $(input1).on('mousedown', function (event) {
            event.stopPropagation();
        });
        $(input2).on('mousedown', function (event) {
            event.stopPropagation();
        });
        $(input3).on('mousedown', function (event) {
            event.stopPropagation();
        });
        $(input4).on('mousedown', function (event) {
            event.stopPropagation();
        });
        $(input5).on('mousedown', function (event) {
            event.stopPropagation();
        });

        $(input1).on('keyup', function () {
            var val = $(this).val();
            $('#knob1').val(val);
        });
        $(input1).on('change', function () {
            var val = $(this).val();
            $('#knob1').val(val);
        });

        $(input2).on('keyup', function () {
            var val = $(this).val();
            $('#knob2').val(val);
        });
        $(input2).on('change', function () {
            var val = $(this).val();
            $('#knob2').val(val);
        });

        $(input3).on('keyup', function () {
            var val = $(this).val();
            $('#knob3').val(val);
        });
        $(input3).on('change', function () {
            var val = $(this).val();
            $('#knob3').val(val);
        });

        $(input4).on('keyup', function () {
            var val = $(this).val();
            $('#knob4').val(val);
        });
        $(input4).on('change', function () {
            var val = $(this).val();
            $('#knob4').val(val);
        });

        $(input5).on('keyup', function () {
            var val = $(this).val();
            $('#knob5').val(val);
        });
        $(input5).on('change', function () {
            var val = $(this).val();
            $('#knob5').val(val);
        });

        $('#knob1').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
            $(input1).val(event.args.value);
        });
        $('#knob2').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
            $(input2).val(event.args.value);
        })
        $('#knob3').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
            $(input3).val(event.args.value);
        })
        $('#knob4').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
            $(input4).val(event.args.value);
        })
        $('#knob5').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
            $(input5).val(event.args.value);
        })
    }
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
$(".play-bt").click(function () {
    $(".play-bt").hide();
    $(".pause-bt").show();
    var youtubePlayer = $('.videoclick').find('iframe').get(0);
    if (youtubePlayer) {
        youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    if ($('.filter-img').hasClass('videoclick')) {
        $('.filter-img.videoclick .video-thumb-image').trigger('click');
        $('.filter-img.videoclick .video-thumb-image').addClass('loaded');
    }
});
$(".pause-bt").click(function () {
    $(".play-bt").show();
    $(".pause-bt").hide();
    $(".pause-bt").addClass("active");
    var youtubePlayer = $('.videoclick').find('iframe').get(0);
    if (youtubePlayer) {
        youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

});
$('.mute-bt').on('click', function () {
    if ($(this).hasClass('mute')) {
        YoutubeplayerList[0].mute();
        $(this).removeClass('mute').text('');
    } else {
        YoutubeplayerList[0].unMute();
        $(this).addClass('mute').text('');
    }
});
$(".expand").click(function () {
    if ($('.filter-img').hasClass('videoclick')) {
        $('.filter-img.videoclick .video-thumb-image').addClass('fullscreen');
    }
    var iframe = $("#ytplayer1")[0];
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
    }
});
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        $('.filter-img .video-thumb-image').removeClass('fullscreen');
    }
}

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
                defaults.initElem.children('ul').css({
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
        });
    });


});