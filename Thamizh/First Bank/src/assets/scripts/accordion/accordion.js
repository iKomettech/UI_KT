// team section
$(document).ready(function () {
    $('.team-cta').each( function(i, e){
        $(this).attr("id", "team-" + i);
    });

    $('.accord-cta-block').each( function(j, e){
        $(this).attr("id", "accord-block-" + j);
    });

    $('.team-cta-block').each( function(k, e){
        $(this).attr("id", "team-cta-block-" + k);
    });

    $(document).find("a[id^='accord-block-']").click(function (){
        if ($(this).hasClass("active")) {
            $(this).addClass('active').removeClass('active');
            $(this).find('i').addClass('active').removeClass('active');
            $(this).parent().find('.accordion-content').slideUp(200);
            $(this).find('i').removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        else{
            $(this).parent().parent().find(".accordion-content").slideUp(200);
            $(this).parent().parent().find("a").removeClass('active');
            $(this).parent().parent().find("i").removeClass('active');
            $(this).parent().parent().find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $(this).removeClass("active").addClass('active');
            $(this).find('i').removeClass("active").addClass('active');
            $(this).find('i').removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).parent().find('.accordion-content').slideDown(250);
        }
        var self = this;
        var teamheight= $("header").height();
        setTimeout(function () {
                theOffset = $(self).offset();
                $('body,html').animate({
                    scrollTop: theOffset.top - teamheight
                });
        }, 600);
    });
    $(document).find("a[id^='team-']").click(function (){
        //console.log($(this));
        if ($(this).hasClass("active")) {
            $(this).addClass('active').removeClass('active');
            $(this).find('i').addClass('active').removeClass('active');
            $(this).parent().find('.team-content').slideUp(200);
            $(this).find('i').removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        else{
            $(this).parent().parent().find(".team-content").slideUp(200);
            $(this).parent().parent().find("a").removeClass('active');
            $(this).parent().parent().find("i").removeClass('active');
            $(this).parent().parent().find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $(this).removeClass("active").addClass('active');
            $(this).find('i').removeClass("active").addClass('active');
            $(this).find('i').removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).parent().find('.team-content').slideDown(250);
        }
        var self = this;
        var teamheight= $("header").height();
        setTimeout(function () {
                theOffset = $(self).offset();
                $('body,html').animate({
                    scrollTop: theOffset.top - teamheight
                });
        }, 600);
    });
});