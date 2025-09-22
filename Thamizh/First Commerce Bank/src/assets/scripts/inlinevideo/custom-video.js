let YoutubeplayerList = [];
let VimeoplayerList = [];
let initYoutubeVideo = null;
let initVimeoVideo = null;
let YoutubevideoPlayers = 0;
let VimeovideoPlayers = 0;
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let player;

function initYoutubeYoutubevideoPlayers() {
    let i = 0;
    YoutubeplayerList = []; //create new array to hold youtube player
    $(".youtube-video-src").each(function () {
        $(this).closest(".videoPanel").attr("data-index", i);
        i++;
        let isHomeBannerYoutubeVideo = $(this).closest('.homeBanner .swiper-slide')
            .children('.sliderWrapper')
            .find('figure')
            .hasClass('youtubevideopanel');
          player = new YT.Player($(this).attr("id"), {
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
                loop: isHomeBannerYoutubeVideo ? 0 : 1,
                controls: isHomeBannerYoutubeVideo ? 0 : 1,
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
    for (let i = YoutubeplayerList.length; i--;) {
        if (YoutubeplayerList[i] && (YoutubeplayerList[i] != currentPlayer)) {
            YoutubeplayerList[i].pauseVideo();
        }
    }
    for (let i = VimeoplayerList.length; i--;) {
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
    if (e["data"] == YT.PlayerState.PLAYING) {
        //if one video is play then pause other
        pauseOthersYoutubes(e.target);
    }
    //track number of buffering and quality of video
    if (e["data"] == YT.PlayerState.BUFFERING) {
        if (!e.target.uBufferingCount) {
            e.target.uBufferingCount = 1;
        } else {
            e.target.uBufferingCount++;
        }
        //if one video is play then pause other, this is needed because at start video is in buffered state and start playing without go to playing state
        if (YT.PlayerState.UNSTARTED == e.target.uLastPlayerState) {
            pauseOthersYoutubes(e.target);
        }
    }
    //last action keep stage in uLastPlayerState
    if (e.data != e.target.uLastPlayerState) {
        e.target.uLastPlayerState = e.data;
    }

    let action = '';
    switch (e.data) {
        case YT.PlayerState.PLAYING:
            action = 'play';
            break;
        case YT.PlayerState.PAUSED:
            action = 'pause';
            break;
        case YT.PlayerState.ENDED:
            action = 'end';
            break;
    }

    if (action) {
        let videoData = player.getVideoData();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'gtm.video',
            action: action,
            videoTitle: videoData.title,
            videoUrl: player.getVideoUrl(),
            percentage: Math.floor((player.getCurrentTime() / player.getDuration()) * 100)
        });
    }
}

function onYouTubeIframeAPIReady() {
    let init = initYoutubeYoutubevideoPlayers();
    return init;
}

if (iOS) {
    if ($(".video-thumb-image[data-videoSource='youtube']").length > 0) {
        let tag = document.createElement('script');
        //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    initYoutubeVideo = '';
}

$(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
    if (initYoutubeVideo != null || initYoutubeVideo == '') {
        $(this).addClass("loaded").removeClass("loading");
        let index = $(this).attr("data-index");
        if (YoutubeplayerList.length > 0) {
            YoutubeplayerList[index].playVideo();
        }
    } else {
        $(this).addClass("loading");
        if ($(".video-thumb-image").length > 0) {
            let tag = document.createElement('script');
            //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        initYoutubeVideo = $(this);
    }
});

function initVimoevideoPlayers() {
    let i = 0;
    VimeoplayerList = []; // Create new array to hold Vimeo players

    $(".vimeo-video-src").each(function () {
        $(this).closest(".videoPanel").attr("data-index", i);
        i++;

        // Check if THIS video belongs to the home banner
        let isHomeBannerVideo = $(this).closest('.homeBanner .swiper-slide')
            .children('.sliderWrapper')
            .find('figure')
            .hasClass('vimeovideopanel');
        let options = {
            loop: isHomeBannerVideo ? 0 : 1,  // loop only if not in homeBanner
            id: $(this).attr("data-videoId"),
            muted: true,
            controls: isHomeBannerVideo ? 0 : 1, // Show controls only for non-homeBanner videos
        };

        let player = new Vimeo.Player($(this).attr("id"), options);

        player.on('play', onPlay);
        player.on('pause', onPause);

        player.ready().then(function () {
            console.log("video Ready");
            VimeovideoPlayers++;
            if (VimeovideoPlayers === VimeoplayerList.length) {
                initVimeoVideo.trigger("click");
            }
        });

        VimeoplayerList.push(player);
    });

    return true;
}

function requireVimeo(url, callback) {
    let e = document.createElement("script");
    e.src = url;
    e.type = "text/javascript";
    e.addEventListener('load', callback);
    document.getElementsByTagName("head")[0].appendChild(e);
}
let onPlay = function (data) {
    for (let i = YoutubeplayerList.length; i--;) {
        YoutubeplayerList[i].pauseVideo();
    }
};
let onPause = function (data) {
};
$(".video-thumb-image[data-videoSource='vimeo']").not(".loaded").click(function (e) {
    if (initVimeoVideo != null) {
        $(this).addClass("loaded").removeClass("loading");
        let index = $(this).attr("data-index");
        if (VimeoplayerList.length > 0) {
            VimeoplayerList[index].play();
        }
    } else {
        $(this).addClass("loading");
        if ($(".video-thumb-image").length > 0) {
            requireVimeo("https://player.vimeo.com/api/player.js", function () {
                let init = initVimoevideoPlayers();
                return init;
            });
        }
        initVimeoVideo = $(this);
    }
});
