var YoutubeplayerList = [];
var VimeoplayerList = [];
var initYoutubeVideo = null;
var initVimeoVideo = null;
var YoutubevideoPlayers = 0;
var VimeovideoPlayers = 0;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
function initYoutubeYoutubevideoPlayers() {
    j = 0;
    YoutubeplayerList = []; //create new array to hold youtube player
    $(".youtube-video-inline-src").each(function () {
        $(this).closest(".insight-img").attr("data-index", j);
        j++;
        var player1 = new YT.Player($(this).attr("id"), {
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
                mute: 1,
                loop: 1,
                controls: 1,
                caption: 0,
                playsinline: 1,
                autoplay:0,
                origin: window.location,
                host: 'https://www.youtube.com'            
            }
        });
        YoutubeplayerList.push(player1);
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
    if ($(".insight-img[data-videoSource='youtube-inline']").length > 0) {
        var tag = document.createElement('script');
        //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    initYoutubeVideo = '';
}

$(".insight-img[data-videoSource='youtube-inline']").not(".loaded").click(function (e) {
    if (initYoutubeVideo != null || initYoutubeVideo == '') {
        $(this).addClass("loaded").removeClass("loading");
        var index = $(this).attr("data-index");
        if (YoutubeplayerList.length > 0) {
            console.log(index);
            YoutubeplayerList[index].playVideo();
            //YoutubeplayerList[index].unMute();
        }
    } else {
        $(this).addClass("loading");
        if ($(".insight-img").length > 0) {
            var tag = document.createElement('script');
            //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        initYoutubeVideo = $(this);
    }
});


