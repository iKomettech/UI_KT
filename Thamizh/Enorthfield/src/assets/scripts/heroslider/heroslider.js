
$(document).ready(function () {

    if ($('.homeBanner').length > 0) {

    $(window).on("resize", function () {
        if ($(window).width() <= 650) {
            var contentheightsnew = $(".bannerpanel .homeBanner .bannerwrap .contentwrap .content").map(function () {
                return $(this).height();
            }).get();
            contentheightsnew = Math.max.apply(null, contentheightsnew);
            $(".bannerpanel .homeBanner .bannerwrap .contentwrap .content").css('height', contentheightsnew -6);
            $(window).resize(function () {
                $(".bannerpanel .homeBanner .bannerwrap .contentwrap .content").css('height', contentheightsnew -6);
            });
        }
    }).resize();

    videoimageht();
    function videoimageht(){
        var  imgHeight = $(".video-thumb-image img").height();
        $(".video-panel .filter-img").css('max-height', imgHeight);
        $(".video-controller").css('top', imgHeight + 40);
    }
    // $(window).on("resize", function () {
    //     videoimageht();
    // });
    $(window).on("resize", function ()
    {   setTimeout(function() {
            videoimageht();
        }, 100);
    });
    var homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
    var swiperHomeBanner = new Swiper('.homeBannerSlider', {
       // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: {
            loadPrevNext: true
        },
        loop: false,
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
        // effect: 'fade',
        // fadeEffect: {
        //     crossFade: true
        // },
        on: {  
            init: function() {
                var swiper = this;
                const lazy = swiper.slides[swiper.activeIndex || 0].querySelector('[data-background]');
                const lazy_img = swiper.slides[swiper.activeIndex || 0].querySelector('.swiper-lazy-img');
                if (lazy != null) {
                    lazy.style.backgroundImage = `url(${lazy.dataset.background})`;
                }
                if (lazy_img != null) {
                    lazy_img.src = `${lazy_img.dataset.background}`;
                }
              },
              activeIndexChange: function() {
                var swiper = this;
                //console.log(swiper.slides[swiper.activeIndex || 0].querySelector('[data-background]'));
                const lazy = swiper.slides[swiper.activeIndex || 0].querySelector('[data-background]');
                const lazy_img = swiper.slides[swiper.activeIndex || 0].querySelector('.swiper-lazy-img');
                if (lazy != null) {
                    lazy.style.backgroundImage = `url(${lazy.dataset.background})`;
                }
                if (lazy_img != null) {
                    lazy_img.src = `${lazy_img.dataset.background}`;
                }
              },  
            slideChange: function() {
            
                let numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
                //console.log(numOfSlides);
                $('.pause-bt').css("display", "none");
                $('.play-bt').css("display", "block");

                const index_currentSlide = swiperHomeBanner.realIndex;

                //console.log($('.swiper-slide-active').children('.sliderWrapper').find('picture').hasClass('youtubevideopanel'));
                var getyoutubevalue = $('.swiper-slide-active').children('.sliderWrapper').find('picture').hasClass('youtubevideopanel');
                var getvimeovalue = $('.swiper-slide-active').children('.sliderWrapper').find('picture').hasClass('vimeovideopanel');
                var this_dataindex;
                var this_datavimeoindex;
                if(getyoutubevalue){
                    var pictureyoutubedata = $('.swiper-slide-active').children('.sliderWrapper').find('picture');
                    this_dataindex = $(pictureyoutubedata).attr('data-index');
                }
                if(getvimeovalue){
                    var picturevimeodata = $('.swiper-slide-active').children('.sliderWrapper').find('picture');
                    this_datavimeoindex = $(picturevimeodata).attr('data-index');
                }
                //console.log(this_dataindex);
                //console.log(this_datavimeoindex);
                
                let previousIndex = this.previousIndex;
                //console.log(previousIndex);

                let currentSlide = this.slides[index_currentSlide]

                var this_dataindex_1 = currentSlide.id;
                //console.log(this_dataindex_1);
                //console.log(this_dataindex_1.split("-").pop());
                var videoIndex = $("#"+this_dataindex_1).find('.videoPanel').data('index');
                //console.log(videoIndex);
                
                //console.log($("#"+this_dataindex_1).find('.videoPanel'));

                if (this_dataindex >= 0 ) {
                    YoutubeplayerList[this_dataindex].pauseVideo();
                    $(".pause-bt").trigger("click");
                }else if (this_dataindex == "undefined"){
                    YoutubeplayerList[this_dataindex].pauseVideo();
                    $(".pause-bt").trigger("click");
                }

                if (this_datavimeoindex >= 0 ) {
                    VimeoplayerList[this_datavimeoindex].pause();
                    $(".pause-bt-vimeo").trigger("click");
                }else if (this_datavimeoindex == "undefined"){
                    VimeoplayerList[this_datavimeoindex].pause();
                    $(".pause-bt-vimeo").trigger("click");
                }

                if ( previousIndex == 0 ) {
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
                    }
                }else if (previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
                    }
                }else if (!previousIndex){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
                    }
                }
                if(index_currentSlide == 0){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
                    }
                }
                else if(index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
                    }
                }else if(!index_currentSlide){
                    if(this_dataindex != undefined){
                        YoutubeplayerList[this_dataindex].pauseVideo();
                        $(".pause-bt").trigger("click");
                    }
                    if(this_datavimeoindex != undefined){
                        VimeoplayerList[this_datavimeoindex].pause();
                        $(".pause-bt-vimeo").trigger("click");
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
    $(".play-bt, .expand, .play-bt-vimeo, .expand-vimeo").click(function () {
        swiperHomeBanner.autoplay.stop();
        $(".swiper-button-play").addClass("active");
    });
    $(".pause-bt, .pause-bt-vimeo").click(function () {
        swiperHomeBanner.autoplay.start();
        $(".swiper-button-play").removeClass("active");
    }); 
}

});

$(document).ready(function () {  

    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $(this).closest('.sliderWrapper').find('.youtube-video-src').trigger('click');
        //$(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        $(this).closest('.sliderWrapper').find('.mute-bt').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.expand').removeClass("p-none");
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");
        //console.log(dataIndex);
        if (dataIndex > 0 ) {
             $('.youtube-video-src')[dataIndex].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
             //YoutubeplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
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
    $(".expand").click(function () {
        //alert("hi");
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($('.filter-img').hasClass('videoclick')) {
            $('.filter-img.videoclick .video-thumb-image').addClass('fullscreen');
        }
        $(".play-bt").hide();
        $(".pause-bt").show();
        var iframe =  $('.youtube-video-src')[dataIndex];
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        YoutubeplayerList[dataIndex].unMute();
        $('.mute-bt').addClass('mute');
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

});

$(document).ready(function () {

    $(".play-bt-vimeo").click(function () {
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        $(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        $(this).closest('.sliderWrapper').find('.mute-bt-vimeo').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.expand-vimeo').removeClass("p-none");
        //var youtubePlayer = $('.videoclick').find('iframe').get(0);
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading, hideloading");
        //console.log(dataIndex);
        if (dataIndex > 0 ) {
              VimeoplayerList[dataIndex].play();
             //VimeoplayerList[dataIndex].unMute();
        }
    });
    $(".pause-bt-vimeo").click(function () {
        $(".play-bt-vimeo").show();
        $(".pause-bt-vimeo").hide();
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
    $(".expand-vimeo").click(function () {
        var dataIndex = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($('.filter-img').hasClass('videoclick')) {
            $('.filter-img.videoclick .video-thumb-image').addClass('fullscreen');
        }
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        var iframe =  $('.vimeo-video-src')[dataIndex];
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");
        VimeoplayerList[dataIndex].play();
        VimeoplayerList[dataIndex].setMuted(false);
        $('.mute-bt-vimeo').addClass('mute');
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

});