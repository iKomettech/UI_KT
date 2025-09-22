
$(document).ready(function () {
    (function ($) {
        $.fn.visible = function (partial) {

            var $t = $(this),
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;
            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };

    })(jQuery);
    var win = $(window);
    var allMods = $(".module");
    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });
    win.scroll(function (event) {
        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in");
            }
        });
    });
});
$('.tabList').click( function() {
    var tabID = $(this).attr('data-tab');
    $(this).addClass('active').siblings().removeClass('active');
    $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
     var headerheight = $('header').outerHeight() + $('.tab').outerHeight() + 40;
    $('html, body').animate({
    scrollTop: $(".tab-content").offset().top - headerheight}, 1000);
});

$(window).on("load resize", function () {
    if (window.innerWidth <= 1023) {
        $(".tabHorizontal ul").addClass("mobileList");
        $(".mobileList li a").click(function () {
            $(".tabHorizontal h4").html($(this).html()).removeClass('active');
            $(".mobileList").slideUp('fast');
        });
    } else {
        $(".tabHorizontal ul").removeClass("mobileList");
        $(".tab .tabHorizontal ul").show();
    }
    $(document).click(function (e) {
        if (window.innerWidth < 1023) {
            if (!$(e.target).is('.tab, .tab *')) {
                $(".tabHorizontal ul").slideUp('fast');
                $(".tabHorizontal h4").removeClass('active');
            }
        }
    });
});


$(document).ready(function () {
    $(".tabHorizontal h4").click(function (e) {
        $(this).toggleClass('active');
        $(".tabHorizontal ul").slideToggle('fast');
        // $(this).toggleClass('active');
        e.stopPropagation();
         
    });
});

$(function () {
    $(".horizontalTabStyle #tab-1 .biopeople").slice(0, 8).show();
    $(".horizontalTabStyle #loadmore").on('click', function (e) {
        e.preventDefault();
        $(".horizontalTabStyle #tab-1 .biopeople:hidden").slice(0, 4).slideDown(500);
        if ($(".horizontalTabStyle #tab-1 .biopeople:hidden").length == 0) {
            $(".horizontalTabStyle #loadmore").fadeOut();
        }
    });
});