$(document).ready(function () {

    var current = 1, current_step, next_step, steps;
    steps = $(".multistepcontact").length;

    setProgressBar(current);
        
    $(".multistepclik").click(function (e) {
        $('.rightwrap').addClass('panelbg');
        $('.imgsection').hide();
        $('.lastStep').addClass('current');
        current_step = $(this).closest(".multistepcontact");
        next_step = $(this).closest(".multistepcontact").next();
        next_step.show();
        current_step.hide();
        ++current;
        setProgressBar(++current);
    });    

    $(".prev").click(function (e) {
        e.preventDefault();
            if (current < 1) {
                current = 1;
            }
            current_step = $(this).closest(".multistepcontact");
            next_step = $(this).closest(".multistepcontact").prev();
            next_step.show();
            current_step.hide();
            --current;
            setProgressBar(--current);
            $('.rightwrap').removeClass('panelbg');
            $('.imgsection').show();
            $('.lastStep').removeClass('current');
            $('html, body').animate({
                scrollTop: $("#stepform").offset().top - $("header.sticky").height() - 50
            }, 800);
            return false;
    });
});

function setProgressBar(curStep) {
    var steps = $(".multistepcontact").length;
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
}

