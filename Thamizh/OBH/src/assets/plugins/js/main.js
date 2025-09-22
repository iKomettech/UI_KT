


$(document).ready(function(){
    if($(".videopopup").length <= 1 ){
        $('.overviewdetail .more-btn').hide();
        $('.sliderpanel').css("padding-bottom", "0px")
    }if($(".videopopup").length >= 2 ){
        $('.overviewdetail .more-btn').show();
        $('.sliderpanel').css("padding-bottom", "76px")
    }if($(".videopopup").length == 1 ){
        $('.sliderpanel').css("padding-bottom", "76px")
    }  
    console.log($(".videopopup").length);
    $(".videopopup").slice(0, 1).show();
    $(".overviewdetail #loadMore").on("click", function(e){
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(target).offset().top + 20
    }, 2000);
    $('.loader-div').show();
    $('.more-btn, .back-home-btn').hide();
    setTimeout(function () {
        $('.loader-div').hide();
        $('.more-btn, .back-home-btn').show();
        $(".videopopup:hidden").slice(0, 1).slideDown();
        if($(".videopopup").length == $('.videopopup:visible').length){
            $('.load-more-btn, .load-icon').hide();
        }
     }, 1000);   
    });
    if ($(".videoPlayer").length > 0) {
      jQuery("a.videoPlayer").YouTubePopUp();
  }   
});

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
                ecver: 2,
                mute: true
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
            muted: true
        };
        var player = new Vimeo.Player($(this).attr("id"), options);
        player.on('play', onPlay);
        player.on('pause', onPause);
        player.ready().then(function () {
            //console.log("video Ready");
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

if ($('.sliderpanel').length > 0) {
    var swiper = new Swiper(".gallery-thumbs", {
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
		 breakpoints: {
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
          
          
              767: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }
      });
      var swiper2 = new Swiper(".gallery-top", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        thumbs: {
          swiper: swiper
        }
      });
  }

  var sliders = document.querySelectorAll('.gallery-top .swiper-slide figure');
for (var i = 0; i < sliders.length; ++i) {
   sliders[i].addEventListener('click', function(event) {
      //event.target.parentNode.parentNode.parentNode.parentNode.classList.add('fullscreen');
      $(this).parent().closest('.gallery-top').addClass('fullscreen');
      console.log($(this));
      setTimeout(function() {
         galleryTop.update();
         // $(".show").fadeIn();
         // galleryThumbs.update();
      }, 1000);
   }, false);
}

var sliders = document.querySelectorAll('.gallery-top .swiper-slide .captions');
for (var i = 0; i < sliders.length; ++i) {
   sliders[i].addEventListener('click', function(event) {
      //event.target.parentNode.parentNode.parentNode.parentNode.classList.add('fullscreen');
      $(this).parent().closest('.gallery-top').addClass('fullscreen');
      setTimeout(function() {
         galleryTop.update();
         // $(".show").fadeIn();
         // galleryThumbs.update();
      }, 1000);
   }, false);
}

var closeButtons = document.querySelectorAll('.close-button');
for (var y = 0; y < closeButtons.length; ++y) {
   closeButtons[y].addEventListener('click', function(event) {
      //console.log(event);
      var fullScreenElements = document.querySelectorAll('.fullscreen');
      //console.log(fullScreenElements);
      for (var x = 0; x < fullScreenElements.length; ++x) {
         fullScreenElements[x].classList.remove('fullscreen');
         setTimeout(function() {
            galleryTop.update();
            // galleryThumbs.update();
         }, 1000);
      }
   });
}

    if ($('.videopopup').length > 0) {

    var videoThumbs = new Swiper('.videothumb', {
      spaceBetween: 35,
      slidesPerGroup: 1,
      watchSlidesVisibility:true,
      allowTouchMove: false,
      observer: true,
      observeParents: true,
      slidesPerView: 5,
      speed:700,
      touchRatio: 0.2,
      preloadImages: true,
      slideToClickedSlide: false,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup:3,
              },
              767: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
          }
    });

  }

  