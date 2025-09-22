
$(document).ready(function () {

    if ($('.homeBanner').length > 0) {
       
        bannerimageht();
        function bannerimageht(){
            var  imgHeight = $(".bannerwrap .imgWrap").height();
            $(".bannerpanel .homeBanner .grid-container-fullwidth .imagebg-shadow").css('height', imgHeight + 2);
            // $(".bannerwrap .imgWrap .filter-img").css('height', imgHeight + 187);
            // if ($(window).width() <= 1023) {
            //     $(".bannerwrap .imgWrap .filter-img").css('height', imgHeight + 100);
            //     $(".bannerwrap .imgWrap").css('min-height', imgHeight);
            //     $(".bannerpanel").css('min-height', imgHeight);
            // }
        }
        $(window).on("resize", function ()
        {   setTimeout(function() {
                bannerimageht();
            }, 100);
        });    
    var homesliderDelay = $(".hdnHomeBannerSliderDelay").val();
    var swiperHomeBanner = new Swiper('.homeBannerSlider', {
        preloadImages: false,
        lazy: true,
        loop: false,
        speed: 1000,
        preventClicks: true,
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
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // effect: 'fade',
        // fadeEffect: {
        //     crossFade: true
        // },
        
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

});
