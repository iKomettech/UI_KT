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
