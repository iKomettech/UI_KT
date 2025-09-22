
$(document).ready(function() {

    // Mobile Menu Toggle
    $('.hamburger a').click(function(e) {
        e.preventDefault();
        $(this).trigger("blur");
        $('header').addClass('menuOpenState');
        $(this).toggleClass('active');
        $('html').toggleClass('menuOpened');
        $('.mnavwrapper ').toggleClass('active');
    });


	$(".expand-content a").click(function() {
		$this = $(this);
        parentPanel = $this.parent().parent();
        if ($this.parent().parent().hasClass("active")) {
            $this.parent().parent().find(".collapsePanel").slideUp(400, function() {
                $this.parent().parent().removeClass("active");
            });
            $this.html("<span>Read More</span>");
            $('html, body').animate({
                scrollTop: parentPanel.offset().top
            }, "slow");
        } else {
            $this.parent().parent().find(".collapsePanel").slideDown(400);
            $this.parent().parent().addClass("active");
            $this.html("<span>Read Less</span>");
        }
    });

    if ($('.probonopannel').length > 0) {
        $(window).scroll(function() {
            if ($(".counter").length > 0) {
                var hT = $('.counter').first().offset().top,
                    hH = $('.probonopannel').first().innerHeight(),
                    wH = $(window).height(),
                    wS = $(window).scrollTop();
                //console.log((wS + hH) + " " + (hT));
                if ((wS + hH) > hT) {
                    $('.counter').each(function() {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function(now) {
                                $(this).text(Math.ceil(now).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                            }
                        });
                    }); {
                        $('.counter').removeClass('counter').addClass('counted');
                    };
                }
            }
        });
    }

});

$(window).on("load", function(e) {

    //alert('767');
    $('.msubmenu').on('click', function(e) {
        if ($(window).width() <= 767) {
            //alert($(window).width());
            e.preventDefault();
            $this = $(this);
            $this.parent().parent().each(function() {
                $(this).find('.inner').not($this).removeClass('mainActive');
                $(this).find('a.msubmenu').not($this).removeClass('menuOpen');
                $(this).find('a.msubmenu').next().slideUp();
            });
            if (!$this.hasClass("menuOpen")) {
                $this.addClass('menuOpen');
                $this.next().addClass('mainActive');
                $this.next().slideToggle();
            } else {
                $this.parent().parent().find('li .inner').removeClass('mainActive');
                $this.removeClass('menuOpen');
                $this.next().removeClass('mainActive');
                $this.next().slideUp();
            }
        }
    });
    if ($(window).width() >= 767) {
        $('.mnavwrapper  ul li a.msubmenu').removeClass('menuOpen');
        $('.mnavwrapper  ul li .inner').removeClass('mainActive');
    }
});

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

$(document).ready(function() {
    $(".SubmenuWrapper").each(function() {
        var className = "col-" + $(this).find(".cols").length;
        $(this).addClass(className);
        $(this).parent().find("a").each(function(i) {
            if (i == 0) {
                $(this).addClass("hasSubmenu");
            }
        });

    });

    $("a.hasSubmenu").click(function(e) {
        if (is_touch_device()) {
            e.preventDefault();
        }
    });

    $(window).on("load resize", function() {
        $('.SubmenuWrapper').css({
            'top': ''
        });
        if ($("header").hasClass("stickyActive")) {
            if ($("body").width() >= 768) {
                $('.stickyActive .SubmenuWrapper').css({
                    'top': $('header').height() - 23
                });
            }
            if ($("body").width() >= 1280) {
                $('.stickyActive .SubmenuWrapper').css({
                    'top': $('header').height() - 34
                });
            }
        } else {
            $('.SubmenuWrapper').css({
                'top': $('header').height()
            });
        }
    });
});
