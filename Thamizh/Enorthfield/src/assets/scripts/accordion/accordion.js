// team section
$(document).ready(function () {
    $('.team-cta').each( function(i, e){
        $(this).attr("id", "team-" + i);
    });

    $(document).find("a[id^='team-']").click(function (){
        console.log($(this));
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
    $('.toggle').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        // // $($this).parent().removeClass('mainActive').addClass('mainActive');
        $(this).parent().parent().parent().find('.hov').not($(this).parent().parent()).removeClass('mainActive');
        $(this).parent().parent().parent().find('.hov').each(function() {
        $(this).find(".accordion-content").not($this.parent().next()).slideUp();
        });
        if ($(this).parent().parent().hasClass("mainActive")) {
          $(this).parent().parent().toggleClass('mainActive');
          $this.parent().next().slideUp();
        } else {
          $(this).parent().parent().toggleClass('mainActive');
          $this.parent().next().slideDown();
        }
      });
});