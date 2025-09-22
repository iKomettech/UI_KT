

if ($(".videosectionwrap").length > 0) {

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
                loop: true,
                showinfo: 0,
                ecver: 2,
                mute: false,
                playsinline: 0
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
         $(".play-bt").hide();
             $(".pause-bt").show();
    }
    if (e["data"] == YT.PlayerState.PAUSED) {
         $(".play-bt").show();
             $(".pause-bt").hide();
    }
    if (e["data"] == YT.PlayerState.ENDED) {
                   
         if ($('.filter-img').hasClass('videoclick')) {
            $('.filter-img.videoclick .video-thumb-image').trigger('click');
        }
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
            muted: false
        };
        var player = new Vimeo.Player($(this).attr("id"), options);
        player.on('play', onPlay);
        player.on('pause', onPause);
        player.ready().then(function () {
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


