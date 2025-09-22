$(document).ready(function () {
    let swiperHomeBanner;
    function setupObserver() {
        let target = document.querySelector('.swiper-slide-active');
        if (!target) {
            return;
        }
        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "class") {
                    if ($(".swiper-slide-active").hasClass("temp1")) {
                        $(".chatbot").removeClass("without-before").addClass("with-before");
                    } else {
                        $(".chatbot").removeClass("with-before").addClass("without-before");
                    }
                }
            });
        });
        let config = {
            attributes: true,
            attributeFilter: ["class"]
        };
        observer.observe(target, config);
    }


    if ($('.homeBanner').length > 0) {
        let homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
        swiperHomeBanner = new Swiper('.homeBannerSlider', {
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
                el: '.homeBannerSlider .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.homeBannerSlider .swiper-button-next',
                prevEl: '.homeBannerSlider .swiper-button-prev',
            },
            on: {
                slideChangeTransitionEnd: function () {
                    handleSlideChange(this);
                },
            },
        });

        // Play/Pause Button
        $(".swiper-button-play").click(function (e) {
            e.preventDefault();
            if (swiperHomeBanner.autoplay.running) {
                swiperHomeBanner.autoplay.stop();
                $(this).addClass("active");
            } else {
                swiperHomeBanner.autoplay.start();
                $(this).removeClass("active");
            }
        });

        $(".swiper-button-next, .swiper-pagination-bullet").click(function (e) {
            e.preventDefault();
            swiperHomeBanner.autoplay.start();
            $('.swiper-button-play').removeClass("active");
        });
    function handleSlideChange(swiperHomeBanner) {
        setTimeout(setupObserver, 1000); // Ensure observer is initialized
    
        let activeSlide = $(swiperHomeBanner.slides[swiperHomeBanner.activeIndex]);
        let activeIndex = swiperHomeBanner.activeIndex;
        let realIndex = swiperHomeBanner.realIndex;
    
        console.log("Active Slide:", activeIndex, "Real Index:", realIndex);
    
        // Pause all YouTube & Vimeo videos first
        $(".homeBannerSlider .fullimgWrap .youtubevideopanel").each(function () {
            let index = $(this).data('index');
            if (index !== undefined && YoutubeplayerList[index]) {
                YoutubeplayerList[index].stopVideo();
            }
        });
        
        $(".homeBannerSlider .fullimgWrap .vimeovideopanel").each(function () {
            let index = $(this).data('index');
            if (index !== undefined && VimeoplayerList[index]) {
                VimeoplayerList[index].pause()
                    .then(function() {
                        // Reset to the beginning after pausing
                        return VimeoplayerList[index].setCurrentTime(0);
                    })
                    .catch(function(error) {
                        console.error('Error pausing and resetting Vimeo video:', error);
                    });
            }
        });
        
        // Detect YouTube & Vimeo in active slide
        let youtubePanel = activeSlide.find('.youtubevideopanel');
        let vimeoPanel = activeSlide.find('.vimeovideopanel');

        let youtubeIndex = youtubePanel.data('index');
        let vimeoIndex = vimeoPanel.data('index');

        console.log("YouTube Index:", youtubeIndex, "Vimeo Index:", vimeoIndex);

        // Play the correct video if found
        if (youtubeIndex !== undefined && YoutubeplayerList[youtubeIndex]) {
            YoutubeplayerList[youtubeIndex].mute(); 
            YoutubeplayerList[youtubeIndex].playVideo();
            youtubePanel.find('.youtube-video-src').show();
            youtubePanel.parent().parent().find('.mute-bt').removeClass('mute');
            swiperHomeBanner.autoplay.stop();
            $('.swiper-button-play').addClass('active');
        } 
        if (vimeoIndex !== undefined && VimeoplayerList[vimeoIndex]) {
            VimeoplayerList[vimeoIndex].setMuted(true);
            VimeoplayerList[vimeoIndex].play();
            vimeoPanel.find('.vimeo-video-src').show();
            vimeoPanel.parent().parent().find('.mute-bt-vimeo').removeClass('mute');
            swiperHomeBanner.autoplay.stop(); 
            $('.swiper-button-play').addClass('active');
        }
    }
    }

    if ($('.bannerpanel .homeBanner').length > 0) {
        let bannerid = $(".homeBannerSlider .swiper-slide").attr("id");
        $("#" + bannerid).find('.filter-img').addClass('onloadVideo');
        if ($(".homeBannerSlider .swiper-slide .videoPanel").hasClass('vimeovideopanel')) {
            $(".homeBannerSlider .fullimgWrap .vimeovideopanel").each(function () {
                setTimeout(function () {
                    $(".play-bt-vimeo").trigger("click");
                }, 3000);
            });
        }
        if ($(".homeBannerSlider .swiper-slide .videoPanel").hasClass('youtubevideopanel')) {
            $(".homeBannerSlider .fullimgWrap .youtubevideopanel").each(function () {
                setTimeout(function () {
                    $(".play-bt").trigger("click");
                }, 3000);
            });
        }
        if ($("#homeBanner-1").find('.filter-img').hasClass('onloadVideo')) {
            if ($("#homeBanner-1 .videoPanel").hasClass('vimeovideopanel') || $("#homeBanner-1 .videoPanel").hasClass('youtubevideopanel')) {
                setTimeout(function () {
                    $(".swiper-button-play").trigger("click");
                }, 3000);
            }
        }
        let firstSlidePaused = false;
        setTimeout(function () {
            if (typeof Vimeo !== "undefined") {
                document.querySelectorAll('.homeBannerSlider .swiper-slide .vimeo-video-src iframe').forEach(iframe => {
                    let player = new Vimeo.Player(iframe);
                    player.on('ended', function () {
                        swiperHomeBanner.autoplay.start(); // Resume Swiper autoplay
                        $('.swiper-button-play').removeClass('active');
                        if (swiperHomeBanner.activeIndex === swiperHomeBanner.slides.length - 1) {
                            swiperHomeBanner.slideTo(0);
                        } else {
                            swiperHomeBanner.slideNext();
                        }
                    });
                });
            }
        
            document.querySelectorAll('.homeBannerSlider .swiper-slide .youtube-video-src').forEach(iframeElement => {
                let playerInstance = new YT.Player(iframeElement, {
                    events: {
                        'onStateChange': function (event) {
                            // Check if the video is paused and hasn't been processed yet
                            if (event.data === YT.PlayerState.PAUSED && !firstSlidePaused) {
                                let firstSlide = $("#homeBanner-1");
                                if (firstSlide.find(".youtubevideopanel").length > 0) {
                                    firstSlide.find(".play-bt").trigger("click");
                                    firstSlidePaused = true; // Store a timestamp instead of a boolean
                                }
                            }
                            // When the video ends, resume autoplay and move to the next slide.
                            if (event.data === YT.PlayerState.ENDED) {
                                if (swiperHomeBanner && swiperHomeBanner.autoplay) {
                                    swiperHomeBanner.autoplay.start();
                                    $('.swiper-button-play').removeClass('active');
                                }
                                // If it's the last slide, go back to the first; otherwise, go to the next.
                                if (swiperHomeBanner.activeIndex === swiperHomeBanner.slides.length - 1) {
                                    swiperHomeBanner.slideTo(0);
                                } else {
                                    swiperHomeBanner.slideNext();
                                }
                            }
                        }
                    }
                });
        
                // Store the player instance globally to access it later.
                if (!window._YTPlayers) {
                    window._YTPlayers = [];
                }
                window._YTPlayers.push(playerInstance);
        
                // Optionally, store it in a dedicated array if you use one (e.g., YoutubeplayerList)
                if (!window.YoutubeplayerList) {
                    window.YoutubeplayerList = [];
                }
                // Assume each iframe has a data-index attribute already assigned.
                let dataIndex = $(iframeElement).closest('.youtubevideopanel').data('index');
                window.YoutubeplayerList[dataIndex] = playerInstance;
            });
        
        }, 5000);
        
        
    }
});

$(document).ready(function () {  
    
    const YOUTUBE_ORIGIN = "https://www.youtube.com";
    $(".play-bt").click(function () {
        $(".play-bt").hide();
        $(".pause-bt").show();
        $(this).closest('.sliderWrapper').find('.content').hide();
        $(this).closest('.sliderWrapper').find('.mute-bt').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.youtube-video-src').trigger('click');
        let dataIndexYoutube = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");
        if (dataIndexYoutube > 0) {
            $('.youtube-video-src')[dataIndexYoutube].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', YOUTUBE_ORIGIN);
        }
    });
    $(".pause-bt").click(function () {
        $(".play-bt").show();
        $(".pause-bt").hide();
        $(this).closest('.sliderWrapper').find('.content').show();
        let dataIndexYoutube = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading");
        $('.youtube-video-src')[dataIndexYoutube].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', YOUTUBE_ORIGIN);
    });

    $('.mute-bt').on('click', function () {
        let dataIndexYoutube = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            YoutubeplayerList[dataIndexYoutube].mute();
            $(this).removeClass('mute').text('');
        } else {
            YoutubeplayerList[dataIndexYoutube].unMute();
            $(this).addClass('mute').text('');
        }
    });

    $(".play-bt-vimeo").click(function () {
        $(".play-bt-vimeo").hide();
        $(".pause-bt-vimeo").show();
        $(this).closest('.sliderWrapper').find('.content').hide();
        $(this).closest('.sliderWrapper').find('.mute-bt-vimeo').removeClass("p-none");
        $(this).closest('.sliderWrapper').find('.vimeo-video-src').trigger('click');
        let dataIndexVimeo = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').addClass("loaded").removeClass("loading");      
        if (dataIndexVimeo > 0 ) {
              VimeoplayerList[dataIndexVimeo].play();
        }
    });
    $(".pause-bt-vimeo").click(function () {
        $(".play-bt-vimeo").show();
        $(".pause-bt-vimeo").hide();
        $(this).closest('.sliderWrapper').find('.content').show();
        let dataIndexVimeo = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        $(this).closest('.sliderWrapper').find('.videoPanel').removeClass("loaded").addClass("loading");    
        VimeoplayerList[dataIndexVimeo].pause();
    });

    $('.mute-bt-vimeo').on('click', function () {
        let dataIndexVimeo = $(this).closest('.sliderWrapper').find('.videoPanel').data('index');
        if ($(this).hasClass('mute')) {
            VimeoplayerList[dataIndexVimeo].setMuted(true);
            $(this).removeClass('mute').text('');
        } else {
            VimeoplayerList[dataIndexVimeo].setMuted(false);
            $(this).addClass('mute').text('');
        }
    });

});
