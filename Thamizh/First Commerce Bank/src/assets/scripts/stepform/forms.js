$(document).ready(function () {

    var current = 0, current_step, next_step, steps, form_steps;
    steps = $(".multistepcontact").length;

    var data_id = "form_1";

    //setTimeout(function () {
    //    var cookies = getCookie("cookie_form_id");

    //    $(".multistepclik").each(function (index) {
    //        var id = $(this).attr('data-form-id');
    //        if (cookies == id) {
    //            $(this).click();
    //        }
    //    });   
       
    //}, 100);


    $(".multistepclik").click(function (e) {

        data_id = $(this).attr("data-form-id");
        $("#" + data_id).show();

        $('.rightwrap').addClass('panelbg');
        $('.imgsection').hide();
        current_step = $(this).closest(".multistepcontact");
        current_step.hide();

        //Set Progression bar
        setTimeout(function () {
            setProgressBar(++current, $("#" + data_id + " .multistepcontact").length);

        }, 800);

        /*setCookie("cookie_form_id", data_id, 30);*/
    });

    
     $(".multistepcontact").each(function (index) {
     	var id = $(this).attr("id");
      
         $("#" + id).find(".next").click(function (e) {
             if ($("#activeTile").val() == "Other Inquiry") {
                 if (iNextTrigger == true) {
                     e.preventDefault();
                     if (current < 1) {
                         current = 2;
                     }
                     var formId = $("#" + id).find('form');
                     if (formId.valid() == true) {
                         console.log(true);
                         current_step = $(this).closest(".multistepcontact");
                         next_step = $(this).closest(".multistepcontact").next('.multistepcontact').next();
                         next_step.show();
                         current_step.hide();
                         //++current;
                         setProgressBar(++current, $("#" + id + " .multistepcontact").length);
                     }
                     iNextTrigger = false;
                 }
                 else {
                     e.preventDefault();
                     if (current < 1) {
                         current = 1;
                     }
                     var formId = $("#" + id).find('form');
                     if (formId.valid() == true) {
                         current_step = $(this).closest(".multistepcontact");
                         next_step = $(this).closest(".multistepcontact").next();
                         next_step.show();
                         current_step.hide();
                         setProgressBar(++current, $("#" + id + " .multistepcontact").length);
                     }
                 }
                 return false;
             }
             else {
                 e.preventDefault();
                 if (current < 1) {
                     current = 1;
                 }
                 var formId = $("#" + id).find('form');
                 if (formId.valid() == true) {
                     current_step = $(this).closest(".multistepcontact");
                     next_step = $(this).closest(".multistepcontact").next();
                     next_step.show();
                     current_step.hide();
                     setProgressBar(++current, $("#" + id + " .multistepcontact").length);
                 }
                 return false;
             }
         });

         $("#" + id).find(".prev").click(function (e) {
             if ($("#activeTile").val() == "Other Inquiry") {
                 if (iPrevTrigger == false) {
                     e.preventDefault();
                     if (current < 1) {
                         current = 1;
                     }
                     var formId = $("#" + id).find('form');
                     var checkStep = $(this).closest(".multistepcontact").hasClass("thirdStep");
                     current_step = $(this).closest(".multistepcontact");
                     if (checkStep) {
                         next_step = $(this).closest(".multistepcontact").prev().prev();
                     }
                     else {
                         next_step = $(this).closest(".multistepcontact").prev();

                     }
                     next_step.show();
                     current_step.hide();
                     setProgressBar(--current, $("#" + id + " .multistepcontact").length);
                     formId.validate().resetForm();
                     iPrevTrigger = true;
                 }
                 else {
                     e.preventDefault();
                     if (current < 1) {
                         current = 1;
                     }
                     var formId = $("#" + id).find('form');
                     current_step = $(this).closest(".multistepcontact");
                     next_step = $(next_step).closest(".multistepcontact").prev('.multistepcontact').prev();
                     next_step.show();
                     current_step.hide();
                     //--current;
                     setProgressBar(--current, $("#" + id + " .multistepcontact").length);
                     formId.validate().resetForm();
                 }

                 return false;
             }
             else {
                 e.preventDefault();
                 if (current < 1) {
                     current = 1;
                 }
                 var formId = $("#" + id).find('form');
                 current_step = $(this).closest(".multistepcontact");
                 next_step = $(this).closest(".multistepcontact").prev();
                 next_step.show();
                 current_step.hide();
                 setProgressBar(--current, $("#" + id + " .multistepcontact").length);
                 formId.validate().resetForm();
                 return false;
             }

         });
     
     });



    if ($(".topics").find("span.field-validation-error").length !== 0) {
        var formId = $("span.field-validation-error").parents(".multistepcontact.lastStep").attr('id');

        console.log(formId);
        $("#" + formId).show();
        $('.rightwrap').addClass('panelbg');
        $('.imgsection').hide();
        $(".multistepcontact.firstStep").hide();
        //++current;
        setProgressBar(++current, $("#" + data_id).attr("data-form-steps"));
    }

    if ($(".topics").find("span.umbraco-forms-submitmessage").length !== 0) {

        var formName = $("span.umbraco-forms-submitmessage").parents(".multistepcontact.lastStep").data('form-name');
        window.dataLayer.push({
            'event': "form_submission",
            'form_name': formName,
            'page_url': window.location.href
        });

        $('.contactpanel .flexwrap .rightwrap').addClass("panelbg");
        $("#thank-you-message").css("display", "block");
        $("#stepform").hide();


        if ($(".successsection").is(":visible")) {
            deleteCookie("cookie_form_id");
        }
    }
    $(".backcta").click(function (e) {
        e.preventDefault();
        deleteCookie("cookie_form_id");
        location.reload();
    });
});


var iNextTrigger;
var iPrevTrigger;
$(document).ready(function () {

    if (jQuery("#cphone").length > 0) {
        document.getElementById('cphone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    if (jQuery("#pphone").length > 0) {
        document.getElementById('pphone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    if (jQuery("#bphone").length > 0) {
        document.getElementById('bphone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    if (jQuery("#dphone").length > 0) {
        document.getElementById('dphone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    if (jQuery("#psphone").length > 0) {
        document.getElementById('psphone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    if (jQuery("#ophone").length > 0) {
        document.getElementById('ophone').addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
    jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?0-0?)?(\([0-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please specify a valid phone number");

    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");

    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "No message defined for this field");

    var current = 1, current_step, next_step, steps, next_step1;
    steps = $(".multistepcontact").length;

    // Change progress bar action

    if ($(".business-banking").length > 0) {
        $(".business-banking").validate({
            errorClass: "errorContact",
            errorElement: "span",
            rules: {
                bemail: {
                    email: true,
                    noSpace: true
                },
                bphone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                bname: {
                    required: true,
                    noSpace: true
                },

                bcomment: {
                    required: true,
                    noSpace: true
                },
                bcategory: {
                    required: true
                }
                //bdataConsent: {
                //    required: true
                //}
            },
            highlight: function (element, errorClass) {
                //console.log(element);
                var selector = "#" + element.id;
                /*console.log(selector);*/
                $(selector).addClass("errorPlacement");
                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
                $(selector).parent().find(".ui-selectmenu-button").addClass('errorPlacement');
                //$("#bdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("This field is required");
            },
            unhighlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).removeClass("errorPlacement");
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $(selector).parent().find(".ui-selectmenu-button").removeClass('errorPlacement');
                //$("#bdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("");
            },
            submitHandler: function (form) {
                submitBusinessForm();
                return false;
            }
        });
    }
    
    if ($(".personal-banking").length > 0) {
        $(".personal-banking").validate({
            errorClass: "errorContact",
            errorElement: "span",
            rules: {
                pemail: {
                    email: true,
                    noSpace: true
                },
                pphone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                pname: {
                    required: true,
                    noSpace: true
                },

                pcomment: {
                    required: true,
                    noSpace: true
                },
                pcategory: {
                    required: true
                }
                //pdataConsent: {
                //    required: true
                //}
            },
            highlight: function (element, errorClass) {
                //console.log(element);
                var selector = "#" + element.id;
                /*console.log(selector);*/
                $(selector).addClass("errorPlacement");
                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
                $(selector).parent().find(".ui-selectmenu-button").addClass('errorPlacement');
                //$("#pdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("This field is required");

            },
            unhighlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).removeClass("errorPlacement");
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $(selector).parent().find(".ui-selectmenu-button").removeClass('errorPlacement');
                //$("#pdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("");
            },
            submitHandler: function (form) {
                submitPersonalForm();
                return false;
            }
        });
    }
    if ($(".digital-banking").length > 0) {
        $(".digital-banking").validate({
            errorClass: "errorContact",
            errorElement: "span",
            rules: {
                demail: {
                    email: true,
                    noSpace: true
                },
                dphone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                dname: {
                    required: true,
                    noSpace: true
                },

                dcomment: {
                    required: true,
                    noSpace: true
                },
                dcategory: {
                    required: true
                }
                //ddataConsent: {
                //    required: true
                //}
            },
            highlight: function (element, errorClass) {
                //console.log(element);
                var selector = "#" + element.id;
                /*console.log(selector);*/
                $(selector).addClass("errorPlacement");
                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
                $(selector).parent().find(".ui-selectmenu-button").addClass('errorPlacement');
                //$("#ddataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("This field is required");

            },
            unhighlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).removeClass("errorPlacement");
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $(selector).parent().find(".ui-selectmenu-button").removeClass('errorPlacement');
                //$("#ddataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("");
            },
            submitHandler: function (form) {
                submitDigitalForm();
                return false;
            }
        });
    }
    if ($(".privacy").length > 0) {
        $(".privacy").validate({
            errorClass: "errorContact",
            errorElement: "span",
            rules: {
                psemail: {
                    email: true,
                    noSpace: true
                },
                psphone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                psname: {
                    required: true,
                    noSpace: true
                },
                pscomment: {
                    required: true,
                    noSpace: true
                }
                //psdataConsent: {
                //    required: true
                //}
            },
            highlight: function (element, errorClass) {
                //console.log(element);
                var selector = "#" + element.id;
                /*console.log(selector);*/
                $(selector).addClass("errorPlacement");
                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
                $(selector).parent().find(".ui-selectmenu-button").addClass('errorPlacement');
                //$("#psdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("This field is required");

            },
            unhighlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).removeClass("errorPlacement");
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $(selector).parent().find(".ui-selectmenu-button").removeClass('errorPlacement');
                //$("#psdataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("");
            },
            submitHandler: function (form) {
                submitPrivacyForm();
                return false;
            }
        });
    }
    if ($(".other").length > 0) {
        $(".other").validate({
            errorClass: "errorContact",
            errorElement: "span",
            rules: {
                oemail: {
                    email: true,
                    noSpace: true
                },
                ophone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                oname: {
                    required: true,
                    noSpace: true
                },
               ocomment: {
                    required: true,
                    noSpace: true
                }
            },
            highlight: function (element, errorClass) {
                //console.log(element);
                var selector = "#" + element.id;
                /*console.log(selector);*/
                $(selector).addClass("errorPlacement");
                $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
                $(selector).parent().removeClass("successForm");
                $(selector).parent().addClass("errorForm");
                $(selector).parent().find(".ui-selectmenu-button").addClass('errorPlacement');
                //$("#odataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("This field is required");

            },
            unhighlight: function (element, errorClass) {
                var selector = "#" + element.id;
                $(selector).removeClass("errorPlacement");
                $(selector).parent().removeClass("errorForm");
                $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
                $(selector).parent().addClass("successForm");
                $(selector).parent().find(".ui-selectmenu-button").removeClass('errorPlacement');
                //$("#odataConsent-error").remove();
                //$(selector).parent().parent().find(".alertmsg").html("");
            },
            submitHandler: function (form) {
                submitOtherForm();
                return false;
            }
        });
    }
    //tabindex block
    var i = 1;
    $("html").find("a,input,select,button").each(function () {
        $(this).attr("tabIndex", i);
        i++;
    });
    
});

function setProgressBar(curStep,steps) {
    //var steps = $(".multistepcontact").length;
    var steps = steps;
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
}

function multiclick(el) {
    $("#activeTile").val("Other Inquiry");
    iNextTrigger = true;
    iPrevTrigger = false;
    $("#firstStep").trigger("click");
}

$(document).ready(function () {   
    $("#bcategory").selectmenu({
        placeholder: 'bcategory',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#bcategory-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
          
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#bcategory-button").find('.ui-selectmenu-text').css('color', '#000000');

            }

            if ($(this).val() == "Business Deposits") {
                $('#business-deposits').show();
                $('#business-lending').hide();

                $('#business-deposits-category').rules("add",
                    {
                        required: true
                    });
                $('#business-lending-category').rules("remove", "required");
            }
            else if ($(this).val() == "Business Lending") {
                $('#business-lending').show();
                $('#business-deposits').hide();

                $('#business-lending-category').rules("add",
                    {
                        required: true
                    });
                $('#business-deposits-category').rules("remove", "required");
            }          

        }
    })
    $("#pcategory").selectmenu({
        placeholder: 'pcategory',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        open: function (event, ui) {
            let menu = $("#" + $(this).attr("id") + "-menu");
            console.log(menu.parent());
            $(this).parent().parent().addClass("zIndex");
            menu.parent().addClass("curvermenu");
            menu.parent().css("top", "-=40px");
            $(".siteInner").css('z-index', 'unset');
        },
        close: function (event, ui) {
            $(this).parent().parent().removeClass("zIndex");
            $(".siteInner").css('z-index', '999');
        },
        create: function (event, ui) {  
            if ($(this).val() != "") {
                $(this).next("#pcategory-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#pcategory-button").find('.ui-selectmenu-text').css('color', '#000000');

            }
            if ($(this).val() == "Personal Deposits") {
                $('#personal-deposits').show();
                $('#personal-lending').hide();
                $('#personal-residential').hide();

                $('#personal-deposits-category').rules("add",
                    {
                        required: true
                    });
                $('#personal-lending-category').rules("remove", "required");
                $('#personal-residential-category').rules("remove", "required");
            }
            else if ($(this).val() == "Personal Lending") {
                $('#personal-lending').show();
                $('#personal-deposits').hide();
                $('#personal-residential').hide();

                $('#personal-lending-category').rules("add",
                    {
                        required: true
                    });
                $('#personal-deposits-category').rules("remove", "required");
                $('#personal-residential-category').rules("remove", "required");
            }
            else if ($(this).val() == "Residential Mortgages") {
                $('#personal-residential').show();
                $('#personal-deposits').hide();
                $('#personal-lending').hide();

                $('#personal-residential-category').rules("add",
                    {
                        required: true
                    });
                $('#personal-deposits-category').rules("remove", "required");
                $('#personal-lending-category').rules("remove", "required");
            }
        }
    })
    $("#personal-deposits-category").selectmenu({
        placeholder: 'personal-deposits-category',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#personal-deposits-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#personal-deposits-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })
    $("#personal-lending-category").selectmenu({
        placeholder: 'personal-lending-category',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#personal-lending-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#personal-lending-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })
    $("#personal-residential-category").selectmenu({
        placeholder: 'personal-residential-category',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#personal-residential-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#personal-residential-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })
    $("#business-deposits-category").selectmenu({
        placeholder: 'business-deposits-category',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#business-deposits-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#business-deposits-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })
    $("#business-lending-category").selectmenu({
        placeholder: 'business-lending-category',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#business-lending-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#personal-lending-category-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })
    $("#dcategory").selectmenu({
        placeholder: 'dcategory',
        width: jQuery(this).attr("width"),
        style: 'dropdown',
        transferClasses: true,
        create: function (event, ui) {
            if ($(this).val() != "") {
                $(this).next("#dcategory-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        },
        change: function (event, ui) {
            $(this).closest("form").validate().element(this);
            if ($(this).val() != "") {
                $(this).next("#dcategory-button").find('.ui-selectmenu-text').css('color', '#000000');
            }
        }
    })

    $("#business-deposits-category, #business-lending-category, #personal-deposits-category, #personal-lending-category, #personal-residential-category, #dcategory").selectmenu()    .selectmenu("menuWidget")
        .addClass("overflow");

});


function submitBusinessForm() {
    $formsel = $(".business-banking");
    $formsel.find("[type='submit']").html('<span> Submitting...</span>').css({ 'pointer-events': 'auto', 'width': 'auto' });
    $formsel.find(".submitbtn").addClass("business-banking");
    var formData = $formsel.serializeArray();
    console.log(formData);
    $.ajax({
        url: '/umbraco/Surface/StepFormSurface/SubmitBusinessBanking',
        type: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("RequestVerificationToken",
                $('.business-banking input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (result) {
            console.log(result);
            if (result) {
                showSuccessMessage();
            }
            else {
                showFailureMessage();
            }

        },
        error: function (xhr, status, error) {

        }
    });
    return false;
}
function submitPersonalForm() {
    $formsel = $(".personal-banking");
    $formsel.find("[type='submit']").html('<span> Submitting...</span>').css({ 'pointer-events': 'auto', 'width': 'auto' });
    $formsel.find(".submitbtn").addClass("personal-banking");
    var formData = $formsel.serializeArray();
    console.log(formData);
    $.ajax({
        url: '/umbraco/Surface/StepFormSurface/SubmitPersonalBanking',
        type: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("RequestVerificationToken",
                $('.personal-banking input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (result) {
            console.log(result);
            if (result) {
                showSuccessMessage();
            }
            else {

                showFailureMessage();
            }

        },
        error: function (xhr, status, error) {

        }
    });
    return false;
}
function submitDigitalForm() {
    $formsel = $(".digital-banking");
    $formsel.find("[type='submit']").html('<span> Submitting...</span>').css({ 'pointer-events': 'auto', 'width': 'auto' });
    $formsel.find(".submitbtn").addClass("digital-banking");
    var formData = $formsel.serializeArray();
    console.log(formData);
    $.ajax({
        url: '/umbraco/Surface/StepFormSurface/SubmitDigitalBanking',
        type: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("RequestVerificationToken",
                $('.digital-banking input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (result) {
            console.log(result);
            if (result) {
                showSuccessMessage();
            }
            else {

                showFailureMessage();
            }

        },
        error: function (xhr, status, error) {

        }
    });
    return false;
}
function submitPrivacyForm() {
    $formsel = $(".privacy");
    $formsel.find("[type='submit']").html('<span> Submitting...</span>').css({ 'pointer-events': 'auto', 'width': 'auto' });
    $formsel.find(".submitbtn").addClass("privacy");
    var formData = $formsel.serializeArray();
    console.log(formData);
    $.ajax({
        url: '/umbraco/Surface/StepFormSurface/SubmitPrivacy',
        type: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("RequestVerificationToken",
                $('.privacy input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (result) {
            console.log(result);
            if (result) {
                showSuccessMessage();
            }
            else {

                showFailureMessage();
            }

        },
        error: function (xhr, status, error) {

        }
    });
    return false;
}
function submitOtherForm() {
    $formsel = $(".other");
    $formsel.find("[type='submit']").html('<span> Submitting...</span>').css({ 'pointer-events': 'auto', 'width': 'auto' });
    $formsel.find(".submitbtn").addClass("other");
    var formData = $formsel.serializeArray();
    console.log(formData);
    $.ajax({
        url: '/umbraco/Surface/StepFormSurface/SubmitOther',
        type: "POST",
        data: formData,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("RequestVerificationToken",
                $('.other input:hidden[name="__RequestVerificationToken"]').val());
        },
        success: function (result) {
            console.log(result);
            if (result) {
                showSuccessMessage();
            }
            else {

                showFailureMessage();
            }

        },
        error: function (xhr, status, error) {

        }
    });
    return false;
}
function contact_recaptcha_submit(token) {
    //console.log(token);
    var $form = $('form#contactFormId');
    $form.find('#contact_recaptcha_response').val(token);
    $form.submit();
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cookiname) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var expires = ";expires=" + d;
    var value = "";
    document.cookie = cookiname + "=" + value + expires + "; path=/";
}

function setProgressBar(curStep, totalsteps) {
    //var steps = $(".multistepcontact").length
    var steps = totalsteps;
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
}
function showFailureMessage() {
    window.dataLayer = window.dataLayer || [];
    //if ($(".contactuspanel").find("span.umbraco-forms-submitmessage").length !== 0) {

    //}
    var formName = "contactuspanel";
    window.dataLayer.push({
        'event': "form_submission",
        'form_name': formName,
        'page_url': window.location.href
    });
    $("#stepform").hide();
    $("#failed-message").css("display", "block");

    setTimeout(function () {
        if ($(".successsection").is(":visible")) {
            deleteCookie("cookie_form_id");
            $('html, body').animate({ scrollTop: $('#failed-message').offset().top - $('.stickyEmpty').height() - 78 }, 'slow');
        }
        else {
            var form_cookies = getCookie("cookie_form_id");
            if (form_cookies != "" && form_cookies != null) {
                $('html, body').animate({ scrollTop: $('#' + form_cookies).offset().top - 0 }, 'slow');
            }
        }


        // $(".multistepcontact").each(function (index) {

        // 	if ($(this).attr('data-form-id') != undefined) {
        // 		var formGuid = $(this).attr('data-form-id');
        // 		var id = $(this).attr('id');
        // 		$("#" + id + " input[name=FormId]").val(formGuid);
        // 	}
        // });

    }, 400);
}

function showSuccessMessage() {
    window.dataLayer = window.dataLayer || [];
    //if ($(".contactuspanel").find("span.umbraco-forms-submitmessage").length !== 0) {

    //}
    var formName = "contactuspanel";
    window.dataLayer.push({
        'event': "form_submission",
        'form_name': formName,
        'page_url': window.location.href
    });
    $(".maintitle, .contactwrapsec").hide();
    $("#thank-you-message").css("display", "block");

    setTimeout(function () {
        if ($(".successsection").is(":visible")) {
            deleteCookie("cookie_form_id");
            $('html, body').animate({ scrollTop: $('#thank-you-message').offset().top - $('.stickyEmpty').height() - 78 }, 'slow');
        }
        else {
            var form_cookies = getCookie("cookie_form_id");
            if (form_cookies != "" && form_cookies != null) {
                $('html, body').animate({ scrollTop: $('#' + form_cookies).offset().top - 0 }, 'slow');
            }
        }


        // $(".multistepcontact").each(function (index) {

        // 	if ($(this).attr('data-form-id') != undefined) {
        // 		var formGuid = $(this).attr('data-form-id');
        // 		var id = $(this).attr('id');
        // 		$("#" + id + " input[name=FormId]").val(formGuid);
        // 	}
        // });

    }, 400);
}
