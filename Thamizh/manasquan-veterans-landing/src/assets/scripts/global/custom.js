
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
$(window).on("load resize", function () {
    let windowheight = innerHeight;
    var footerheight = $("footer").height();
    var headerheight = $("header").height();
    var window_height= footerheight + headerheight;
    main_height = windowheight - window_height;
    $('.main').css({ 'min-height': main_height });
});
$(document).ready(function () {
    $('.header-menu a[href*=\\#]:not([href=\\#])').on('click', function () {
        $(".first-level-link").removeClass("active");
        $(this).addClass("active");
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - $("header").height()
            }, 500);
            return false;
        }
    });
    $('.applycta a[href*=\\#]:not([href=\\#])').on('click', function () {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - $("header").height()
            }, 500);
            return false;
        }
    });
    $('.topmeu li a[href*=\\#]:not([href=\\#])').on('click', function () {
        $(".topmeu li a").removeClass("active");
        $(this).addClass("active");
        $('.mhamburger').trigger("click");
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - $("header").height()
            }, 500);
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
    $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
    //console.log($('header').outerHeight());
});

$(window).on("load resize", function () {
    setTimeout(function() {
        $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
        if ($("header").hasClass("sticky")) {
            $('.stickyEmpty').css({ 'height': $('header').outerHeight() });
        }
    }, 500);
});

$('.mhamburger').click(function (f) {
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

$(window).on("resize", function () {
    if ($(window).width() >= 500) {
        $('.mhamburger').removeClass('is-active');
        $('body').removeClass('menuOpened');
        $('.nav-wrapper').removeClass('show-menu');
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
            jQuery('header.sticky').addClass('active-sticky');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
            jQuery('header.sticky').removeClass('active-sticky');
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
                }else{
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
});

//youtube and vimeo intergrate

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
                height: '100%',
                width: '100%',
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
    $(".bannerpanelsingle .video-container .filter-img.onloadVideo .video-thumb-image").each(function () {
        $(this).trigger('click');
        setTimeout(function() { 
            $(".play-bt").trigger("click");
        }, 2000);
        $('.video-controller .play-bt').css("display", "none");
        setTimeout(function () {
            $('.video-controller .play-bt').trigger('click');
        }, 800);
    });

    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $(".bannerpanelsingle").find('iframe').show();
        var youtubePlayer = $('.onloadVideo').find('iframe').get(0);
        if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    });
    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
        $(".bannerpanelsingle").find('iframe').hide();
        var youtubePlayer = $('.onloadVideo').find('iframe').get(0);
        if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });

    $('.mute-bt').on('click', function () {
        var dataIndex = $(".bannerpanelsingle").find('.youtubevideopanel').data('index');
        if (dataIndex >= 0 ) {
            if ($(this).hasClass('mute')) {
                YoutubeplayerList[dataIndex].mute();
                $(this).removeClass('mute').text('');
            } else {
                YoutubeplayerList[dataIndex].unMute();
                $(this).addClass('mute').text('');
            }
        }
    });

    $(".play-bt-vimeo").click(function () {
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        $(".bannerpanelsingle").find('iframe').show();
        $(".bannerpanelsingle").find('.content').hide();
        $(this).closest('.bannerpanelsingle').find('.vimeo-video-src').trigger('click');        
        var dataIndex = $(".bannerpanelsingle").find('.vimeovidoepanel').data('index'); 
        if (dataIndex >= 0 ) {
              VimeoplayerList[dataIndex].play();                         
        }
    });
    $(".pause-bt-vimeo").click(function () {
        $(".play-bt-vimeo").show();
        $(".pause-bt-vimeo").hide();
        $(".bannerpanelsingle").find('iframe').hide();
        $(".bannerpanelsingle").find('.content').show();
        var dataIndex = $(".bannerpanelsingle").find('.vimeovidoepanel').data('index');          
        VimeoplayerList[dataIndex].pause();
    });

    $('.mute-bt-vimeo').on('click', function () {
        var dataIndex = $(".bannerpanelsingle").find('.vimeovidoepanel').data('index');
        if (dataIndex >= 0 ) {
            if ($(this).hasClass('mute')) {
                VimeoplayerList[dataIndex].setMuted(true);
                $(this).removeClass('mute').text('');
            } else {
                VimeoplayerList[dataIndex].setMuted(false);
                $(this).addClass('mute').text('');
            }
        }
    });

});

$(document).ready(function () {
    var swiper = new Swiper(".testmonialSwiper", {
        spaceBetween: 30,
        loop:false,
        pagination: false,
    });
});

$(document).ready(function () {
    $(".carouselSlider").owlCarousel({
        center: false,
        items: 2.5,
        loop: true,
        margin: 10,
        dots: false,
        responsive: {
            375: {
                margin: 0,
                items: 1,
            },
            1024: {
                items: 1.5,
                margin: 50,
            },
            1360: {
                items: 2.5,
                margin: 90,
            },
            1700: {
                items: 2.5,
                margin: 150,
            },
        },
    });
});

// faq section
$(document).ready(function () {
 
    $('.faq-cta').each( function(i, e){
        $(this).attr("id", "faq-" + i);
    });
 
    $(document).find("a[id^='faq-']").click(function (){
        console.log($(this));
        if ($(this).hasClass("active")) {
            $(this).addClass('active').removeClass('active');
            $(this).find('i').addClass('active').removeClass('active');
            $(this).parent().find('.faq-content').slideUp(200);
            $(this).find('i').removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        else{
            $(this).parent().parent().find(".faq-content").slideUp(200);
            $(this).parent().parent().find("a").removeClass('active');
            $(this).parent().parent().find("i").removeClass('active');
            $(this).parent().parent().find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $(this).removeClass("active").addClass('active');
            $(this).find('i').removeClass("active").addClass('active');
            $(this).find('i').removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).parent().find('.faq-content').slideDown(250);
        }
        var self = this;
        var faqheight= $("header").height() + 36;
        setTimeout(function () {
                theOffset = $(self).offset();
                $('body,html').animate({
                    scrollTop: theOffset.top - faqheight
                });
        }, 600);
    });
});