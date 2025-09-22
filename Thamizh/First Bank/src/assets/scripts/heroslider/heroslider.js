
$(document).ready(function () {
    function setupObserver() {
        var target = document.querySelector('.swiper-slide-active');
        if (!target) {
            //console.log('Target element not found.');
            return;
        }
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "class") {
                    //console.log('Class changed:', mutation.target.className);
                    if ($(".swiper-slide-active").hasClass("temp1")) {
                        $(".chatbot").removeClass("without-before").addClass("with-before");
                    } else {
                        $(".chatbot").removeClass("with-before").addClass("without-before");
                    }
                }
            });
        });
        var config = {
            attributes: true,
            attributeFilter: ["class"]
        };
        observer.observe(target, config);
    }
    if ($('.homeBanner').length > 0) {
    var homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
    var swiperHomeBanner = new Swiper('.homeBannerSlider', {
        loop: false,
        speed: 1000,
        preventClicks: true,
        autoplayDisableOnInteraction: false,
        simulateTouch: false,
        autoplay: {
            delay: homesliderDelay,
            disableOnInteraction: false,
            reverseDirection: false,     
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        on: {  
            slideChange: function(el) {
                setTimeout(setupObserver, 1000);
                $('.pause-bt, .pause-bt-vimeo').css("display", "block");
                $('.play-bt, .play-bt-vimeo').css("display", "none");

                const index_currentSlide = swiperHomeBanner.realIndex;
                var activeSlide = $(swiperHomeBanner.slides[swiperHomeBanner.activeIndex]);
                activeSlide.find('.sliderWrapper .youtubevideopanel').addClass('loaded');
                activeSlide.find('.sliderWrapper .vimeovideopanel').addClass('loaded');
               if ($(".homeBanner .swiper-slide-active .videoPanel").hasClass('loaded')) {
                //console.log($(".homeBanner .swiper-slide-active .videoPanel").parent().parent().parent().parent().parent());
                $(".homeBanner .swiper-slide-active .videoPanel").parent().parent().parent().parent().parent().find('.contentwrap').hide();
               }
               var getyoutubevalue = $('.swiper-slide-active').children('.sliderWrapper').find('figure').hasClass('youtubevideopanel');
               var getvimeovalue = $('.swiper-slide-active').children('.sliderWrapper').find('figure').hasClass('vimeovideopanel');
               var this_dataindex;
               var this_datavimeoindex;
               if (getyoutubevalue) {
                   var pictureyoutubedata = $('.swiper-slide-active').children('.sliderWrapper').find('figure');
                   this_dataindex = $(pictureyoutubedata).attr('data-index');
               }
               if (getvimeovalue) {
                   var picturevimeodata = $('.swiper-slide-active').children('.sliderWrapper').find('figure');
                   this_datavimeoindex = $(picturevimeodata).attr('data-index');
               }

                let previousIndex = this.previousIndex;
                //console.log(previousIndex);

                let currentSlide = this.slides[index_currentSlide]

                var this_dataindex_1 = currentSlide.id;
                var youvideoIndex = $("#"+this_dataindex_1).find('.youtubevideopanel').data('index');
                var vimeovideoIndex = $("#"+this_dataindex_1).find('.vimeovideopanel').data('index');
                //console.log($("#"+this_dataindex_1).find('.videoPanel'));

                if (youvideoIndex >= 0 ) {
                    YoutubeplayerList[youvideoIndex].playVideo();
                    $(youvideoIndex).find('.youtube-video-src').show();
                }else if (youvideoIndex == "undefined"){
                    YoutubeplayerList[youvideoIndex].pauseVideo();
                    $(".pause-bt").trigger("click");
                }

                if (vimeovideoIndex >= 0 ) {
                    VimeoplayerList[vimeovideoIndex].play();
                    $(vimeovideoIndex).find('.vimeo-video-src').show();
                }else if (vimeovideoIndex == "undefined"){
                    VimeoplayerList[vimeovideoIndex].pause();
                    $(".pause-bt-vimeo").trigger("click");
                }

                if (vimeovideoIndex >= 0 && vimeovideoIndex < VimeoplayerList.length) {
                    $(".swiper-button-play").trigger("click");
                }

                // if (youvideoIndex >= 0 && youvideoIndex < YoutubeplayerList.length) {
                //     $(".swiper-button-play").trigger("click");
                // }

                if ( previousIndex == 0 ) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if (previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if (!previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
               if (index_currentSlide == 0) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
                else if(index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }else if(!index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        YoutubeplayerList[this_dataindex].mute();
                        $('.mute-bt').removeClass("mute");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        VimeoplayerList[this_datavimeoindex].setMuted(true);
                        $('.mute-bt-vimeo').removeClass("mute");
                    }
                }
            },
        },
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
}
if ($('.bannerpanel .homeBanner').length > 0) {
    var bannerid = $(".homeBannerSlider .swiper-slide").attr("id");
    $("#" + bannerid).find('.filter-img').addClass('onloadVideo');
    if ($(".homeBannerSlider .swiper-slide .videoPanel").hasClass('youtubevideopanel')) {
        $(".homeBannerSlider .fullimgWrap .youtubevideopanel").each(function () {
            setTimeout(function() { 
                $(".play-bt").trigger("click");
            }, 3000);
        });
    }
    if ($(".homeBannerSlider .swiper-slide .videoPanel").hasClass('vimeovideopanel')) {
        $(".homeBannerSlider .fullimgWrap .vimeovideopanel").each(function () {
            setTimeout(function() { 
                $(".play-bt-vimeo").trigger("click");
            }, 3000);
        });
    }
    if($("#homeBanner-1").find('.filter-img').hasClass('onloadVideo')){
        if ($("#homeBanner-1 .videoPanel").hasClass('vimeovideopanel')) {
            setTimeout(function() { 
                $(".swiper-button-play").trigger("click");
            }, 3000);
        }
    }
    if($("#homeBanner-1").find('.filter-img').hasClass('onloadVideo')){
        if ($("#homeBanner-1 .videoPanel").hasClass('youtubevideopanel')) {
            setTimeout(function() { 
                $(".swiper-button-play").trigger("click");
            }, 3000);
        }
    }
    setTimeout(function() { 
    var iframes = document.querySelectorAll('.homeBannerSlider .swiper-slide .vimeo-video-src iframe');
            //console.log(iframes);
            iframes.forEach(function (iframe) {
                var player = new Vimeo.Player(iframe);
                player.on('ended', function () {
                    if (swiperHomeBanner.activeIndex === swiperHomeBanner.slides.length - 1) {
                        swiperHomeBanner.slideTo(0);
                        $(".swiper-button-play").trigger('click');
                    } else {
                        swiperHomeBanner.slideNext();
                        $(".swiper-button-play").trigger('click');
                    }
                });
    });

    var iframesyoutube = document.querySelectorAll('.homeBannerSlider .swiper-slide .youtube-video-src');

    // iframesyoutube.forEach(function (yiframe, yindex) {
    //     if (YoutubeplayerList[yindex] && typeof YoutubeplayerList[yindex].addEventListener === 'function') {
    //         YoutubeplayerList[yindex].pauseVideo();
    //         YoutubeplayerList[yindex].addEventListener('onStateChange', function (event) {
    //             if (event.data === YT.PlayerState.ENDED) {
    //                 if (swiperHomeBanner.activeIndex === swiperHomeBanner.slides.length - 1) {
    //                     swiperHomeBanner.slideTo(0);
    //                     $(".swiper-button-play").trigger('click');
    //                     YoutubeplayerList[yindex].playVideo();
    //                 } else {
    //                     swiperHomeBanner.slideNext();
    //                     $(".swiper-button-play").trigger('click');
    //                     YoutubeplayerList[yindex].playVideo();
    //                 }
    //             }
    //         });
    //     }
    // });
    }, 5000);
}
});
$(document).ready(function () {  

    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $(this).closest('.sliderWrapper').find('.content').hide();
        $(this).closest('.sliderWrapper').find('.mute-bt').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.youtube-video-src').trigger('click');
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");
             //console.log(dataIndex);
        if (dataIndex >= 0 ) {
             $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
             //YoutubeplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
        $(this).closest('.sliderWrapper').find('.content').show();
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading, hideloading");
        //console.log(dataIndex);
        $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });

    $('.mute-bt').on('click', function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            YoutubeplayerList[dataIndex].mute();
            $(this).removeClass('mute').text('');
        } else {
            YoutubeplayerList[dataIndex].unMute();
            $(this).addClass('mute').text('');
        }
    });

});

$(document).ready(function () {

    $(".play-bt-vimeo").click(function () {
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        $(this).closest('.sliderWrapper').find('.content').hide();
        $(this).closest('.sliderWrapper').find('.mute-bt-vimeo').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");      
        //console.log(dataIndex);
        if (dataIndex >= 0 ) {
              VimeoplayerList[dataIndex].play();
             //VimeoplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt-vimeo").click(function () {
        $(".play-bt-vimeo").show();
        $(".pause-bt-vimeo").hide();
        $(this).closest('.sliderWrapper').find('.content').show();
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading, hideloading");    
        //console.log(dataIndex);
        VimeoplayerList[dataIndex].pause();
    });

    $('.mute-bt-vimeo').on('click', function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            VimeoplayerList[dataIndex].setMuted(true);
            $(this).removeClass('mute').text('');
        } else {
            VimeoplayerList[dataIndex].setMuted(false);
            $(this).addClass('mute').text('');
        }
    });
});

