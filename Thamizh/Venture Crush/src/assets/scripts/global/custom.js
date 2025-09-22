
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



setTimeout(function () { $('.bannerpanel.banner-animate').removeClass('banner-animate') }, 1000);

$(document).ready(function () {
    var headHgt = $('header').height();
    //console.log(headHgt);
    $('.stickyEmpty').css({ 'height': headHgt });
    $(window).resize(function() {
        setTimeout(function () {
            updateContainer();
        }, 200);
    });
});
function updateContainer() {
    var headHgtresize = $('header').height();
    //console.log(headHgtresize);
    $('.stickyEmpty').css({ 'height': headHgtresize });
}

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
    $(".stickyEmpty").css("height", $('header').height);
    $(this).closest(".alertsPannel").fadeOut();
    $('.bannerpanel').css('margin-top', -heightSticky);
    var emergencyAlertContentHtml = $('#emergencyAlertContent-' + alertId).html();
    console.log(emergencyAlertContentHtml);
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

// $(window).on("resize", function () {
//     if ($(window).width() >= 500) {
//         $('.menu-drawer').removeClass('open');
//         $('.toggle-menu').removeClass('active');
//     }
// }).resize();

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

//Phone Number Format
$(".phone-format").text(function (i, text) {
    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return text;
});

$(document).ready(function () {
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream)
    {
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">');
    }
    $('a').on('click', function() {
        $(this).trigger("blur");
    }); 
});

$(window).on("load resize", function () {
    let windowheight = innerHeight;
    var footerheight = $("footer").height();
    var headerheight = $("header").height();
    var window_height= footerheight + headerheight;
    main_height = windowheight - window_height;
    $('.main').css({ 'min-height': main_height });
});