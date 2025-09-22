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
        if (i == 0){
            var player = new YT.Player($(this).attr("id"), {
                height: '360',
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
                    autoplay:1,
                    origin: window.location,
                    host: 'https://www.youtube.com'
                }
            });
    
        }else if (i>=1){
            var player = new YT.Player($(this).attr("id"), {
                height: '360',
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
                    origin: window.location,
                    host: 'https://www.youtube.com'
                }
            });
    
        }
        i++;  
       
        function onPlayerReady(event) {
            event.target.setVolume(80);
           
            //  player.mute();
        }

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                player.seekTo(0);
                player.playVideo();
                player.mute();
            }
        }

        YoutubeplayerList.push(player);
    });
    j = 0;
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
                ecver: 2,
                mute: true          
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
    if ($(".video-thumb-image[data-videoSource='youtube']").length > 0) {
        var tag = document.createElement('script');
        //use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    initYoutubeVideo = '';
}

function slidervidoecall(){
    $(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
        if (initYoutubeVideo != null || initYoutubeVideo == '') {
            $(this).addClass("loaded").removeClass("loading");
            var index = $(this).attr("data-index");
            if (YoutubeplayerList.length > 0) {
                // console.log(index);
                YoutubeplayerList[index].pauseVideo();
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
}
function initvidoecall(){
        $(".video-thumb-image[data-videoSource='youtube']").not(".loaded").click(function (e) {
            if (initYoutubeVideo != null || initYoutubeVideo == '') {
                $(this).addClass("loaded").removeClass("loading");
                var index = $(this).attr("data-index");
                if (YoutubeplayerList.length > 0) {
                    // console.log(index);
                    YoutubeplayerList[0].playVideo();
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
            //console.log(index);
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

if ($('.homeBanner').length > 0) {

    $(document).ready(function () {

        var bannerid= $(".temp1.swiper-slide").attr("id");
            //console.log(bannerid);
            $("#"+bannerid).find('.filter-img').addClass('onloadVideo');
            if($("#homeBanner-1").hasClass('temp1')){
                setTimeout(function () { 
                    initvidoecall();
                }, 200);
            }else{
                slidervidoecall();
            }
            
        $(".bannerpanel .video-container .filter-img.onloadVideo .video-thumb-image").each(function () {
            $(this).trigger('click');
            $('.video-controller .play-bt').css("display", "none");
        });

        getheight();

        function getheight(){
            // alert("hi");
            var caroselheight = $('.contentwrapper .content').position();
            $('.bannerpanel .homeBanner .flexBox').css('top', caroselheight.top - 85);
            var topheight = $('.stickyEmpty').height();
            //console.log(topheight);
            $('.video-controller').css('top', topheight + 30);
        }
         
        $(window).resize(function(){
            getheight();
        });

        $(".alertsPannelClose").on("click", function () {
            getheight();
        }); 
        var bulletwidth = $(".bannerpanel .homeBanner .swiper-pagination").width();
        $(".bannerpanel .homeBanner .flexBox").css('max-width', bulletwidth + 100);
    });
    
    $(window).on("load", function (e) {
        $(".bannerpanel .video-container .filter-img.onloadVideo .video-thumb-image").each(function () {
            $(this).trigger('click');
            $('.video-controller .play-bt').css("display", "none");
        });
    });
    
   
    var homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
    var swiperHomeBanner = new Swiper('.homeBanner', {
        // lazy: true,
        loop: false,
        // loopedSlides: 3,
        // loopPreventsSlide: true,
        // slidesPerView: 'auto',
        speed: 1000,
        preventClicks: true,
        autoplayDisableOnInteraction: false,
        simulateTouch: false,
        autoplay: {
            delay: homesliderDelay,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {  
            slideChange: function(el) {
            
                let numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
                //console.log(numOfSlides);

                $('.pause-bt').css("display", "block");
                $('.play-bt').css("display", "none");

                const index_currentSlide = swiperHomeBanner.realIndex;
                console.log(this.$el)
                this.$el.find('.swiper-slide').children('.sliderWrapper').find('.videoPanel').addClass('loaded')
                var this_dataindex = this.$el.find('.swiper-slide-active').children('.sliderWrapper').find('.videoPanel').data('index');
                //console.log(this_dataindex);

                let previousIndex = this.previousIndex;
                //console.log(previousIndex);

                let currentSlide = this.slides[index_currentSlide]

                var this_dataindex_1 = currentSlide.id;
                //console.log(this_dataindex_1);
                //console.log(this_dataindex_1.split("-").pop());
                var videoIndex = $("#"+this_dataindex_1).find('.videoPanel').data('index');
                //console.log(videoIndex);


                if (videoIndex >= 0 ) {
                    YoutubeplayerList[videoIndex].playVideo();
                    $("#"+this_dataindex_1).find('.youtube-video-src').show();
                }else if (videoIndex == "undefined"){
                    YoutubeplayerList[videoIndex].pauseVideo();
                    //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                }

                if ( previousIndex == 0 ) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].mute();
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                }else if (previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].mute();
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                }else if (!previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].mute();
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                }
                if(index_currentSlide == 0){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].mute();
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                }
                else if(index_currentSlide){
                    if(this_dataindex != undefined){
                       YoutubeplayerList[this_dataindex].mute();
                       YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                }else if(!index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].mute();
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $('.mute-bt').removeClass("stop");
                        //$("#"+this_dataindex_1).find('.youtube-video-src').hide();
                    }
                } 
            },
        },


    });

    $(window).on("load", function(e) {

        if ($('.filter-img').hasClass('onloadVideo')) {
            $('.filter-img.onloadVideo .video-thumb-image').trigger('click');
        }
    });

    
      

    var pgClick = 0;
    $(".swiper-button-play").click(function() {
        if (pgClick == 0) {
            swiperHomeBanner.autoplay.stop();
            $(this).addClass("active");
            pgClick = 1;
        } else {
            swiperHomeBanner.autoplay.start();
            $(this).removeClass("active");
            pgClick = 0;
        }
    });
    function onPlayerReady(event) {
        event.target.setVolume(80);
        event.target.playVideo();
        //player.mute();
    }
}



$(document).ready(function () {

    $('.mute-bt').on('click', function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
       // console.log(dataIndex);
        if ($(this).hasClass('stop')) {
            YoutubeplayerList[dataIndex].mute();
            $(this).removeClass('stop').text('');
        } else {
            YoutubeplayerList[dataIndex].unMute();
            $(this).addClass('stop').text('');
        }
    });
    
    
    $('.pause-bt').click(function () {      
        $(".pause-bt").css({ "display": "none" });
        $(".play-bt").css({ "display": "block" });
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.youtube-video-src').hide();
        $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });

    $(".play-bt").click(function () {      
        $(".pause-bt").css({ "display": "block" });
        $(".play-bt").css({ "display": "none" });  
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.youtube-video-src').show();      
        $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    });
    

});