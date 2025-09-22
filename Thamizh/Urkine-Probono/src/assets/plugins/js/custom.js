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
            height: '1080',
            width: '1920',
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
                controls: 0,
                caption: 0,
                playsinline: 1,
                autohide: 2,
                modestbranding: 1,
                fs: 0,
                origin: window.location, host: "https://www.youtube.com"
            }
        });

        function onPlayerReady(event) {
            event.target.setVolume(80);
            event.target.playVideo();
            //  player.mute();
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



$(document).ready(function () {
    $(".bannerpanel .video-container .filter-img.onloadVideo .video-thumb-image").each(function () {
        $(this).trigger('click');
        $('.video-controller .play-bt').css("display", "none");
        setTimeout(function () {
            $('.video-controller .play-bt').trigger('click');
        }, 800);
    });
});

$(window).on("load", function (e) {
    if ($('.filter-img').hasClass('onloadVideo')) {
        setTimeout(function () {
            $('.filter-img.onloadVideo .video-thumb-image').trigger('click');
        }, 800);
    }
});






if ($(".bannerpanel").length > 0) {

    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $("iframe").show();
        var youtubePlayer = $('.onloadVideo').find('iframe').get(0);
        if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }

    });

    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
        $("iframe").hide();
        $(".pause-bt").addClass("active");
        $(".stop-bt").removeClass("active");
        var youtubePlayer = $('.onloadVideo').find('iframe').get(0);
        if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }


    });

    $('.mute-bt').on('click', function () {
        if ($(this).hasClass('mute')) {
            YoutubeplayerList[0].unMute();
            $(this).removeClass('mute').text('');
            $(this).addClass('stop').text('');
        } else {

            YoutubeplayerList[0].mute();
            $(this).addClass('mute').text('');
            $(this).removeClass('stop').text('');
        }
    });

}


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
        var TopMargin = $('.timelineWrapper').offset().top + 140;
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
                $('ul.tabs li a').parent('li').removeClass('active');
                $(this).parent('li').addClass('active');
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



$(window).resize(function () {
    $('[role="combobox"][aria-expanded="true"]').each(function () {
        $(this).prev().selectmenu("close").selectmenu("open");
    });
});

$(window).scroll(function () {
    $('[role="combobox"][aria-expanded="true"]').each(function () {
        $(this).prev().selectmenu("close").selectmenu("open");

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

    $('.hamburger a').click(function (f) {
        f.preventDefault();
        $(this).toggleClass('is-active')
        $('body').toggleClass('menuOpened');
    });

    $(window).resize(function () {
        $('.nav-wrapper').removeClass('show-menu');
        $('.hamburger a').removeClass('is-active');
    });


    $('.menu-section .singleMenuWrap').hide();
    $(".menu-section").find('.singlemenu a').addClass('singlemenu-a');
    $(".singlemenu").find('.singleMenuWrap a').removeClass('singlemenu-a');


    $('.menu-section .singlemenu .singlemenu-a').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        $(this).parent().parent().find('.singlemenu').not($(this).parent()).removeClass('mainActive');
        $(this).parent().parent().find('.singlemenu').each(function () {
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


$(document).ready(function () {

    $('li a[href*="#"]').not('li [href="#"]').not('li [href="#0"]').click(function (event) {
        $('.nav-wrapper').removeClass('show-menu');
        $('.hamburger a').removeClass('is-active');
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 120
                }, 1000, 'swing');
            }
        }
    });
    if (window.location.hash) {
        $('html,body').animate({
            scrollTop: $(window.location.hash).offset().top - 120
        }, 1000, 'swing');
    }

});
