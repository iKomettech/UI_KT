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
        $(".play-bt, .play-bt-vimeo").click(function (e) {
            e.preventDefault();
            swiperHomeBanner.autoplay.stop();
            $(".swiper-button-play").addClass("active");
        });
        $(".pause-bt, .pause-bt-vimeo").click(function (e) {
            e.preventDefault();
            swiperHomeBanner.autoplay.start();
            $(".swiper-button-play").removeClass("active");
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
                $(".pause-bt").trigger('click');
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
                    $(".pause-bt-vimeo").trigger('click');
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
            YoutubeplayerList[youtubeIndex].pauseVideo();
            youtubePanel.parent().parent().find('.mute-bt').removeClass('mute');
        } 
        if (vimeoIndex !== undefined && VimeoplayerList[vimeoIndex]) {
            VimeoplayerList[vimeoIndex].setMuted(true);
            VimeoplayerList[vimeoIndex].pause();
            vimeoPanel.parent().parent().find('.mute-bt-vimeo').removeClass('mute');
        }
    }


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
        slideyotubeplay();
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
        slideplay();
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


   // Handle the end of a Vimeo video
    function handleVimeoVideoEnd(swiperInstance) {
        swiperInstance.autoplay.start(); // Resume Swiper autoplay
        document.querySelector('.swiper-button-play')?.classList.remove('active');

        if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
            swiperInstance.slideTo(0); // Loop back to the first slide
        } else {
            swiperInstance.slideNext(); // Move to the next slide
        }
    }

    // Initialize a Vimeo player for the given iframe
    function initializeVimeoPlayer(iframe, swiperInstance) {
        const player = new Vimeo.Player(iframe);
        player.on('ended', () => handleVimeoVideoEnd(swiperInstance));
    }

    // Initialize all Vimeo players in the slider
    function initializeVimeoPlayers(swiperInstance) {
        if (typeof Vimeo === "undefined") {
            console.warn('Vimeo library is not loaded.');
            return;
        }

        document.querySelectorAll('.homeBannerSlider .swiper-slide .vimeo-video-src iframe').forEach(iframe => {
            initializeVimeoPlayer(iframe, swiperInstance);
        });
    }

    // Main function to initialize Vimeo players after a delay
    function slideplay() {
        setTimeout(() => {
            initializeVimeoPlayers(swiperHomeBanner);
        }, 5000); // Wait 5 seconds before initializing players
    }
        
        // Initialize a YouTube player for the given iframe element
    function initializeYouTubePlayer(iframeElement) {
        if (!iframeElement.src.includes('youtube.com/embed')) {
            console.warn('Skipping non-YouTube iframe:', iframeElement);
            return null;
        }

        return new YT.Player(iframeElement, {
            events: {
                'onReady': handlePlayerReady,
                'onStateChange': handlePlayerStateChange
            }
        });
    }

    // Handle the 'onReady' event for the YouTube player
    function handlePlayerReady(event) {
        console.log('YouTube player is ready:', event.target);
    }

    // Handle the 'onStateChange' event for the YouTube player
    function handlePlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            handleVideoEnd();
        }
    }

    // Handle the end of a video
    function handleVideoEnd() {
        if (swiperHomeBanner && swiperHomeBanner.autoplay) {
            swiperHomeBanner.autoplay.start();
            $('.swiper-button-play').removeClass('active');
        }
        moveToNextSlide();
    }

    // Move to the next slide or loop back to the first slide
    function moveToNextSlide() {
        if (swiperHomeBanner.activeIndex === swiperHomeBanner.slides.length - 1) {
            swiperHomeBanner.slideTo(0);
        } else {
            swiperHomeBanner.slideNext();
        }
    }

    // Store the player instance globally for later access
    function storePlayerInstance(playerInstance, iframeElement) {
        if (!window._YTPlayers) {
            window._YTPlayers = [];
        }
        window._YTPlayers.push(playerInstance);

        if (!window.YoutubeplayerList) {
            window.YoutubeplayerList = [];
        }

        const dataIndex = iframeElement.closest('.youtubevideopanel')?.dataset?.index;
        if (dataIndex !== undefined) {
            window.YoutubeplayerList[dataIndex] = playerInstance;
        } else {
            console.warn('No data-index attribute found for iframe:', iframeElement);
        }
    }

    // Main function to initialize YouTube players for all iframes
    function slideyotubeplay() {
        setTimeout(() => {
            document.querySelectorAll('.homeBannerSlider .swiper-slide .youtube-video-src').forEach(iframeElement => {
                const playerInstance = initializeYouTubePlayer(iframeElement);
                if (playerInstance) {
                    storePlayerInstance(playerInstance, iframeElement);
                }
            });
        }, 5000); // Wait 5 seconds before initializing players
    }

    }
});
