$(document).ready(function() {
    if ($('.historyModule').length > 0) {
        $("#timeline_dropdown").selectmenu({
        open: function(event, ui) {
            $(this).parent().addClass("zIndex");
            let additionalTop = 40;
            let menu = $('.ui-selectmenu-menu');
            menu.css('top', '-=' + additionalTop + 'px');
        },
        close: function(event, ui) {
            $(this).parent().removeClass("zIndex");
        },
        });    

        function windowSize() {
            let w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth;
            return x;
        }

        function windowHeight() {
            let w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                y = w.innerHeight || e.clientHeight || g.clientHeight;
            return y;
        }

        function animate_time_line() {

            if (!$('.decade-wrapper').hasClass('scrolling')) {
                $('ul.timeline.active .timeline-panel').each(function() {
                    let e = 0;
                    if ($(window).scrollTop() + windowHeight() > $(this).offset().top && $(this).hasClass("is-hidden")) {
                        let a = $(this);
                        setTimeout(function() {
                            a.removeClass("is-hidden").addClass("animated swing");
                        }, e);
                    }
                });
            }
        }

        function make_sticky_nav() {
            let TopMargin = $('.timeline-wrapper').offset().top;
            let scrollHeight = $(document).scrollTop();
            let windowWidth = windowSize();
            
            let isSticky = scrollHeight >= TopMargin;
            
            $('.sticky-wrapper').toggleClass('unsticky', !isSticky);
            $('.decade-wrapper').toggleClass('sticky', isSticky);
            
            if (!isSticky) {
                $('.decade-wrapper').fadeIn(1000);
            }
            
            if (windowWidth < 768) {
                $('.ui-selectmenu-menu').toggleClass('sticky', isSticky);
                $('.ui-selectmenu-button').toggleClass('sticky_select', isSticky);
            }
        }

        function make_position_margin() {
            let w = $('header').width();
            $('.footer-wrapper').css('width', w);
        }

        function auto_position_timeline() {
            let topMargin = { left: 0, right: 0 };
        
            function adjustMargin($element, isInverted) {
                if (windowSize() >= 1360 || windowSize() >= 1024) {
                    let prevElem = $element.prev().prev();
                    if (prevElem.prop('tagName') === "LI" && !$element.hasClass('clearfix')) {
                        let top = $element.offset().top;
                        let prevTop = prevElem.offset().top + prevElem.outerHeight();
                        let gap = Math.round(top - prevTop);
                        let gapThreshold = windowSize() >= 1360 ? 60 : 30;
        
                        if (gap > gapThreshold) {
                            gap -= gapThreshold;
                            $element.css({ 'margin-top': `-${gap}px` });
                        }
        
                        let marginType = isInverted ? "right" : "left";
                        topMargin[marginType] = $element.offset().top + $element.outerHeight();
                    }
                } else if (windowSize() <= 1023 && !$element.hasClass('clearfix')) {
                    $element.attr('style', '');
                }
            }
        
            $('.timeline.active li').each(function() {
                if (!$(this).hasClass('clearfix')) {
                    $(this).attr('style', '');
                }
            });
        
            $('.timeline.active li:not(".timeline-inverted")').each(function() {
                adjustMargin($(this), false);
            });
        
            $('.timeline.active li.timeline-inverted').each(function() {
                adjustMargin($(this), true);
            });
        }
        
        
        $(document).ready(function() {
            $('.decade-wrapper').each(function() {
                let sticky = $(this);
                let stickyWrapper = $('<div>').addClass('sticky-wrapper').addClass('hidden-xs');
                sticky.prepend(stickyWrapper);
            });
            $('.decade-year-dropdown').selectmenu();
            $('li.audio').click(function() {
                if ($(this).data('mute')) {
                    $(this).find('.audio').hide();
                    $(this).find('.audioMute').css({
                        "opacity": "0",
                        "display": "block",
                    }).show().animate({
                        opacity: 1
                    });
                    $(this).data('mute', false);
                    $("video").prop('muted', false);
                } else {
                    $(this).find('.audioMute').hide();
                    $(this).find('.audio').css({
                        "opacity": "0",
                        "display": "block",
                    }).show().animate({
                        opacity: 1
                    });
                    $(this).data('mute', true);
                    $("video").prop('muted', true)
                }
            });
            $('.arrow-down a').click(function(e) {
                let tab_id = $(this).attr('href');
                $('html, body').animate({
                    scrollTop: $(tab_id).offset().top
                }, 2000);
                e.preventDefault();
            });
            $('.arrow-up a').click(function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 2000);
                e.preventDefault();
            });
            $("body").on("click", 'ul.tabs li:nth-child(even) a,.ui-widget.ui-widget-content li:nth-child(even)', function(event) {
                $('body').removeClass('odd').addClass('even');
            });
            $("body").on("click", 'ul.tabs li:nth-child(odd) a,.ui-widget.ui-widget-content li:nth-child(odd)', function(event) {
                $('body').removeClass('even').addClass('odd');
            });
            $('ul.tabs li a').click(function(e) {
                if (!$(this).hasClass('active')) {
                    let tab_id = $(this).attr('href');
                    $('ul.tabs li a').parent('li').removeClass('active');
                    $(this).parent('li').addClass('active');
                    $(".timeline").removeClass('active');
                    $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                    $(tab_id + '_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                    $('.timeline li:not(".clearfix")').attr('style', '');
                    $('.sticky-wrapper').attr('style', '');
                    $('.decade-wrapper').removeClass("sticky");
                    $('.decade-wrapper').addClass('scrolling');
                    $(tab_id).addClass('active');
                    $(tab_id + '_flex').addClass('active');
                    tab_id = tab_id.replace("#", "");
                    $('.decade-year-dropdown').val(tab_id);
                    $('.decade-year-dropdown').selectmenu("refresh");
                    $('html, body').stop().animate({
                        scrollTop: $('.decade-wrapper').offset().top - 40 - $(".stickyEmpty").height()
                    }, 1000, function() {
                        $('.decade-wrapper').removeClass('scrolling');
                        make_sticky_nav();
                        auto_position_timeline();
                        animate_time_line();
                    });
                    
                }
                e.preventDefault();
            });
            $('.decade-year-dropdown').on('selectmenuchange', function() {
                let tab_id = "#" + $(this).val();
                $('ul.tabs li a').removeClass('active');
                $("ul.tabs li a[href='" + tab_id + "']").addClass('active');
                $(".timeline").removeClass('active');
                $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                $(tab_id + '_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
                $(tab_id).addClass('active');
                $(tab_id + '_flex').addClass('active');
                $('.decade-wrapper').addClass('scrolling');
                $('.sticky-wrapper').attr('style', '');
                $('.decade-wrapper').removeClass("sticky");
                $('.ui-selectmenu-menu').removeClass("sticky");
                $('.ui-selectmenu-button').removeClass("sticky_select");
                $('html, body').stop().animate({
                    scrollTop: $('.decade-wrapper').offset().top - $(".stickyEmpty").height()
                }, 1000, function() {
                    $('.decade-wrapper').removeClass('scrolling');
                    make_sticky_nav();
                    auto_position_timeline();
                    animate_time_line();
                });
            });
            make_sticky_nav();
            make_position_margin();
            animate_time_line();
            $(window).on("load resize scroll", function(e) {
                make_sticky_nav();
                animate_time_line();
                auto_position_timeline();
            });

            let isMobile = /(android|iphone|ipod|ipad|blackberry|windows phone|opera mini|iemobile|kindle|silk|palm|symbian|mobile)/i.test(navigator.userAgent);

            if (isMobile && $('video').length > 0) {
                let $video = $('header .homeBanner-wrapper video');
                let posterUrl = $video.attr('poster');
            
                if (posterUrl) {
                    $video.replaceWith(`<img src="${posterUrl}" alt="banner" />`);
                }
            }            
            $(window).on("load resize", function(e) {
                make_position_margin();
            });
            $(function() {
                $("#timeline_dropdown-menu").addClass('timeline_dropdown');
                $('#timeline_dropdown-button').addClass('timelineselectNav');
                $('#decade-year-dropdown').selectmenu('menuWidget').addClass('mtimeline');
                $(".ui-selectmenu-menu").addClass('mtimelineLst');
            });
        });
    }
});

$(document).ready(function() {
    let imgPopup = $('.img-popup');
    let imgCont = $('.imgsec');
    let popupImage = $('.img-popup img');
    let closeBtn = $('.close-btn');

    imgCont.on('touchstart click', function() {
        let img_src = $(this).children('img').attr('src');
        imgPopup.find('.image-content').children('img').attr('src', img_src);
        imgPopup.addClass('opened');
    });

    $(imgPopup, closeBtn).on('click', function() {
        imgPopup.removeClass('opened');
        imgPopup.children('img').attr('src', '');
    });

    popupImage.on('click', function(e) {
        e.stopPropagation();
    });
});