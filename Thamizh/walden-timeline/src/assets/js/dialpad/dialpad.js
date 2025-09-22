
var animating = false;
var anonymousSaveInterval = null;
if (mode == 'dials') {
    var animationStages = [10, 20, 30, 40, 50, 60, 70];
    
    $(profileObject.bDials).each(function (key, val) {
        $('#knobbus' + val.dialId).jqxKnob({
            value: 0,
            min: 0,
            max: 100,
            startAngle: 270,
            endAngle: 630,
            dragStartAngle: 270,
            snapToStep: true,
            rotation: 'clockwise',
            allowValueChangeOnMouseWheel: false,
            
            marks: {
                colorRemaining: { color: '#B8B9B9', border: '#B8B9B9' },
                colorProgress: { color: '#EEB944', border: '#01295B' },
                type: 'line',
                offset: '80%',
                thickness: 1,
                size: '5%',
                majorSize: '9%',
                majorInterval: 1,
                minorInterval: 2
            },
            step: 10,
            labels: {
                offset: '88%',
                step: 10,
                visible: true,
                formatFunction: function (label) {
                    if (label == 0)
                        return "Min";
                    if (label == 100)
                        return "Max";
                    return label;
                }
            },
            dial: {
                 innerRadius: '0%', // specifies the inner Radius of the dial
                outerRadius: '100%', // specifies the outer Radius of the dial
                style: {
                    stroke: '#E9EAF2', strokeWidth: 1, fill: { color: '#E9EAF2', gradientType: 'radial', gradientStops: [[1, 9], [70, 0.9999], [60, 1]] }
                }
            },
            spinner: {
                style: { fill: { color: '#E9EAF2', gradientType: "radial", gradientStops: [[0, 1], [0, 0.9], [100, 1]] }, stroke: '#E9EAF2' },
                innerRadius: '0%', // specifies the inner Radius of the dial
                outerRadius: '0%', // specifies the outer Radius of the dial
                marks: {
                    colorRemaining: '#EEB944',
                    colorProgress: '#EEB944',
                    type: 'line',
                    offset: '72%',
                    thickness: 0,
                    size: '16%',
                    majorSize: '30%',
                    majorInterval: 200,

                },

            },
            changing: function (oldValue, newValue) {
                var actualDiffValue = oldValue - newValue;
                var diffValue = oldValue - newValue;
                if (diffValue < 0) {
                    diffValue = -diffValue;
                }
                if (diffValue > 10) {
                    return false;
                }
                var valu = 0;
                if (actualDiffValue < 0) {
                    if (actualDiffValue > 5) {
                        valu = Math.round(oldValue / 10) * 10;
                    }
                    else {
                        valu = Math.round(newValue / 10) * 10;
                    }
                }
                else {
                    if (actualDiffValue > 5) {
                        valu = Math.round(newValue / 10) * 10;
                    }
                    else {
                        valu = Math.round(oldValue / 10) * 10;
                    }
                }
                $('#knobbus' + val.dialId + " input").val(valu + "%");
                $('#knobbus' + val.dialId).val(valu);
                if (!$('#knobbus' + val.dialId).jqxKnob('disabled')) {
                    updateCol($('#knobbus' + val.dialId), valu);
                }
                /* For Mouse Scrolling Event - Now Discarded
               if (oldValue > newValue) {
                   stepDN(newValue, $('#knobbus' + val.dialId));
               }
               else {
                   stepUP(newValue, $('#knobbus' + val.dialId));
               } */
            },

            progressBar: {
                style: { fill: { color: '#EEB944', gradientType: 'radial', gradientStops: [[1, 0.9], [100, 0.9]] } },
                size: '8%',
                offset: '70%',
                background: { fill: '#01295B', stroke: '#EEB944' }
            },
            pointer: {
                  type: 'circle', style: { fill: '#EEB944', stroke: '#01295B' }, size: '8%', offset: '72%', thickness: 1}
        });
        appendInput($('#knobbus' + val.dialId), 0, false);
    });

}
$(document).ready(function () {
    
    // $("#resetPriritiesDashboard").on("click", function () {
    //     $.ajax({
    //         url: '/umbraco/Surface/ProfileFormSurface/DiscardForm',
    //         type: "POST",
    //         data: {},
    //         dataType: "json",
    //         success: function (result) {
    //             if (result.message == "session-cleard") {
    //                 profileObject.Status = "Partial Completed";
    //                 localStorage.setItem('profileObject', JSON.stringify(profileObject));
    //                 location.reload();
    //             }
    //         }, error: function (xhr, status, error) {
    //             var errorMessage = xhr.status + ': ' + xhr.statusText;
    //             console.log(errorMessage);
    //         }
    //     });
    // });
    
    if (mode == 'dials') {
        setTimeout(loadProfile, 2500);
        
        $('#tabHeader-2').parent().click(function (event) {
            $('.dialpadsection').removeClass("dialopen");
            var TotalValue = profileObject.pDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
            profileObject.BankingType = "Business Banking";
            if (TotalValue != 0) {
                $("#toggleServiceType").find("h5 span").html("Business");
                $("#toggleServiceType").addClass('show');
                event.preventDefault();
            }
            else {
                loadedProfile = false;
                hasAnimated = false;
                enableBusiness(true);
            }
        });
        $('#tabHeader-1').parent().click(function (event) {
            $('.dialpadsection').removeClass("dialopen");
            var TotalValue = profileObject.bDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
            profileObject.BankingType = "Personal Banking";
            if (TotalValue != 0) {
                $("#toggleServiceType").find("h5 span").html("Personal");
                $("#toggleServiceType").addClass('show');
                event.preventDefault();
            }
            else {
                loadedProfile = false;
                hasAnimated = false;
                enablePersonal(true);
            }
        });
        $("#switchServiceTypeAlertBack").click(function () {
            var s = $("#toggleServiceType h5 span").html();
            if ($("#toggleServiceType h5 span").html() == "Business") {
                enablePersonal(false);
                $('.dialpadsection').removeClass("dialopen");
                $('.dialpopupwrapper .personaltab').fadeOut(250);
            }
            else if ($("#toggleServiceType h5 span").html() == "Personal") {
                enableBusiness(false);
                $('.dialpadsection').removeClass("dialopen");
                $('.dialpopupwrapper .businesstab').fadeOut(250);
            }
            $("#toggleServiceType").removeClass('show');
        });

        $("#switchServiceTypeAlertContinue").click(function () {
            $('.dialpadsection').removeClass("dialopen");
            var s = $("#toggleServiceType h5 span").html();
            if ($("#toggleServiceType h5 span").html() == "Business") {
                $(profileObject.pDials).each(function (key, val) {
                    val.selectedValue = 0;
                    $("#knob" + val.dialId).find("input").val(val.selectedValue + "%");
                    $("#knob" + val.dialId).val(val.selectedValue);
                    $(val.needsList).each(function (key1, val1) {
                        val1.selected = false;
                    });
                });
                hasAnimated = false
                loadedProfile = false;
                enableBusiness(true);
                
            }
            else if ($("#toggleServiceType h5 span").html() == "Personal") {
                $(profileObject.bDials).each(function (key, val) {
                    val.selectedValue = 0;
                    $("#knobbus" + val.dialId).find("input").val(val.selectedValue + "%");
                    $("#knobbus" + val.dialId).val(val.selectedValue);
                    $(val.needsList).each(function (key1, val1) {
                        val1.selected = false;
                    });

                });
                hasAnimated = false
                loadedProfile = false;
                enablePersonal(true);
            }
            $('.persoanltabssection').show();
            $('.profilebuildeinfo ').css("padding-bottom", "0px");
            $('div[id ^= "knob"]').parent().show();
            $('.prioPanel, .prioPanelContent').show();
            $('.dialpadsection').removeClass("dialopen");
            $('.dialpopupwrapper .personaltab').fadeOut(300);
            $('.financialneedssection').addClass('disablestate');
            $("#btnViewProfile").prop("disabled", false);
            $('.dialpopupwrapper .businesstab').fadeOut(300);
        });
        $('#btnBusSetProperties').click(function () {
            currentNeedsIndex = 0;
            $('.financialneedssection').addClass('disablestate');
            $('.alert-popup-container').removeClass('show');

            activeDialIds = profileObject.bDials.filter(dial => dial.selectedValue != 0).sort(GetSortOrder("selectedValue")).reverse();
            TotalValue = profileObject.bDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
            if (TotalValue == 100) {
                loadNeedsPanel(".bNeedsList", ".bNeedsHead", "knobbus", "chkBNeed", "businessNext", activeDialIds, "businesstab");
            }
            else if (TotalValue > 100) {
                $('#' + $(this).data('modal')).addClass('show');
            }
            else if (TotalValue < 100) {
                $('#' + $(this).data('modal')).addClass('show');
            }
        });

        $('span.close').on('click', function () {
            $('.alert-popup-container').removeClass('show');
        });

        $('#btnBusResetProperties').click(function () {
            activeDialIds = [];
            activeDialId = null;
            $('.dialpadsection').removeClass("dialopen");
            $('.dialpopupwrapper .businesstab').fadeOut(300);
            $('div[id ^= "knobbus"]').parent().show();
            $(profileObject.pDials).each(function (key, val) {
                if ($("#knob" + val.dialId).jqxKnob('disabled')) {
                    $("#knob" + val.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knob' + val.dialId), val.selectedValue, false);
                }
            });
            $(profileObject.bDials).each(function (key, val) {
                if ($("#knobbus" + val.dialId).jqxKnob('disabled')) {
                    $("#knobbus" + val.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knobbus' + val.dialId), val.selectedValue, false);
                }
            });
            $('.financialneedssection').addClass('disablestate');

        });
        $('.bNeedsList').on("click", ".businessNext", function () {
            if (currentNeedsIndex < (activeDialIds.length - 1)) {
                currentNeedsIndex++;
                loadNeedsPanel(".bNeedsList", ".bNeedsHead", "knobbus", "chkBNeed", "businessNext", activeDialIds, "businesstab");
            }
            else {
                $('div[id ^= "knobbus"]').parent().hide();
                $('.prioPanel, .prioPanelContent').hide();
                $('.dialpadsection').removeClass("dialopen");
                $('.dialpopupwrapper .businesstab').fadeOut(300);
                $('.persoanltabssection').hide();
                $('.dialpopupwrapper .businesstab').fadeOut(300);
                $('.lidestageneeds').hide();
                $(".financialneedssection > h4").hide();
                $('.financialneedssection').removeClass('disablestate');
                $(".homeformsection").slideDown();
                $("#btnViewProfile").prop("disabled", false);
                $("html, body").animate({ scrollTop: $(".homeformsection").offset().top - 300 }, "slow");
                removeHash();
            }
        });

        $('#tab-2 .knobs').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') {
                return;
            }
            if (!$(this).find(".jqx-knob").jqxKnob('disabled')) {
                $(this).find("input").val(event.args.value + "%");
                updateCol($(this).find(".jqx-knob"), event.args.value);
            }
            else {
                $(this).find(".jqx-knob").find("input").val(event.args.value + "%");
                $(this).find(".jqx-knob").val(getColValue($(this).find(".jqx-knob")));
            }
        });
        $(profileObject.pDials).each(function (key, val) {
            $('#knob' + val.dialId).jqxKnob({
                value: 0,
                min: 0,
                max: 100,
                startAngle: 270,
                endAngle: 630,
                dragStartAngle: 90,
                snapToStep: true,
                rotation: 'clockwise',
                disabled: false,
                allowValueChangeOnMouseWheel: false,
                marks: {
                    colorRemaining: { color: '#B8B9B9', border: '#B8B9B9' },
                    colorProgress: { color: '#EEB944', border: '#01295B' },
                    type: 'line',
                    offset: '80%',
                    thickness: 1,
                    size: '5%',
                    majorSize: '9%',
                    majorInterval: 1,
                    minorInterval: 2
                },
                step: 10,
                labels: {
                    offset: '88%',
                    step: 10,
                    visible: true,
                    formatFunction: function (label) {
                        if (label == 0)
                            return "Min";
                        if (label == 100)
                            return "Max";
                        return label;
                    }
                },
                dial: {
                     innerRadius: '0%', // specifies the inner Radius of the dial
                outerRadius: '100%', // specifies the outer Radius of the dial
                    style: {
                        stroke: '#E9EAF2', strokeWidth: 1, fill: { color: '#E9EAF2', gradientType: 'radial', gradientStops: [[1, 9], [70, 0.9999], [60, 1]] }
                    }
                },
                spinner: {
                    style: { fill: { color: '#E9EAF2', gradientType: "radial", gradientStops: [[0, 1], [0, 0.9], [100, 1]] }, stroke: '#E9EAF2' },
                    innerRadius: '0%', // specifies the inner Radius of the dial
                    outerRadius: '0%', // specifies the outer Radius of the dial
                    marks: {
                        colorRemaining: '#EEB944',
                        colorProgress: '#EEB944',
                        type: 'line',
                        offset: '72%',
                        thickness: 0,
                        size: '16%',
                        majorSize: '30%',
                        majorInterval: 200,

                    },

                },
                changing: function (oldValue, newValue) {
                    var actualDiffValue = oldValue - newValue;
                    var diffValue = oldValue - newValue;
                    if (diffValue < 0) {
                        diffValue = -diffValue;
                    }
                    if (diffValue > 100) {
                        return false;
                    }
                    var valu = 0;
                    if (actualDiffValue < 0) {
                        if (actualDiffValue > 5) {
                            valu = Math.round(oldValue / 10) * 10;
                        }
                        else {
                            valu = Math.round(newValue / 10) * 10;
                        }
                    }
                    else {
                        if (actualDiffValue > 5) {
                            valu = Math.round(newValue / 10) * 10;
                        }
                        else {
                            valu = Math.round(oldValue / 10) * 10;
                        }
                    }
                    $('#knob' + val.dialId + " input").val(valu + "%");
                    $('#knob' + val.dialId).val(valu);
                    if (!$('#knob' + val.dialId).jqxKnob('disabled')) {
                        updateCol($('#knob' + val.dialId), valu);
                    }
                    /* For Mouse Scrolling Event
                     if (oldValue > newValue) {
                         stepDN(newValue, $('#knob' + val.dialId));
                     }
                     else {
                         stepUP(newValue, $('#knob' + val.dialId));
                     } */
                },

                progressBar: {
                    style: { fill: { color: '#EEB944', gradientType: 'radial', gradientStops: [[1, 0.9], [100, 0.9]] } },
                size: '8%',
                offset: '70%',
                background: { fill: '#01295B', stroke: '#EEB944' }
                },
                pointer: {
                      type: 'circle', style: { fill: '#EEB944', stroke: '#01295B' }, size: '8%', offset: '72%', thickness: 1}
            });

            appendInput($('#knob' + val.dialId), 0, false);
        });

        $(".chklifestage").click(function () {
            var title = $(this).attr("data-title");
            profileObject.LifeStage = title;

            var stageID = $(this).attr("data-id");
            profileObject.LifeStageID = stageID;
            $("#btnViewProfile").prop("disabled", false);
        });
        $(".pNeedsList, .bNeedsList").on("click", ".chkPNeed, .chkBNeed", function (event) {
            var dialId = $(this).attr("data-dialId");
            var needId = $(this).attr("data-needId");
            var dialItem = getDial(dialId, profileObject.pDials);
            if ($(this).hasClass("chkBNeed")) {
                dialItem = getDial(dialId, profileObject.bDials);
            }
            if ($(this).prop('checked') == true) {
                dialItem.needsList.filter(needs => needs.ID == needId)[0].selected = true;
            }
            else {
                dialItem.needsList.filter(needs => needs.ID == needId)[0].selected = false;
            }
        });
        
        $("#btnViewProfile").click(function () {
            if (checkFormValidation()) {
                profileObject.Name = $("#profileName").val().trim();
                profileObject.Email = $("#profileEmail").val().trim();
                profileObject.Pincode = $("#profilezipcode").val().trim();
                //saveProfile();
                window.location.href = "dashboard.html";
            }
        });

        $('#btnSetProperties').click(function () {
            currentNeedsIndex = 0;
            $('.financialneedssection').addClass('disablestate');
            $('.alert-popup-container').removeClass('show');

            activeDialIds = profileObject.pDials.filter(dial => dial.selectedValue != 0).sort(GetSortOrder("selectedValue")).reverse();
            TotalValue = profileObject.pDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
            if (TotalValue == 100) {
                loadNeedsPanel(".pNeedsList", ".pNeedsHead", "knob", "chkPNeed", "personalNext", activeDialIds, "personaltab");
            }
            else if (TotalValue > 100) {
                $('#' + $(this).data('modal')).addClass('show');
            }
            else if (TotalValue < 100) {
                $('#' + $(this).data('modal')).addClass('show');
            }
        });

        $('span.close').on('click', function () {
            $('.alert-popup-container').removeClass('show');
        });

        $('#btnResetProperties').click(function () {
            activeDialIds = [];
            activeDialId = null;
            $('.dialpadsection').removeClass("dialopen");
            $('.dialpopupwrapper .personaltab').fadeOut(300);
            $('div[id ^= "knob"]').parent().show();
            $(profileObject.pDials).each(function (key, val) {
                if ($("#knob" + val.dialId).jqxKnob('disabled')) {
                    $("#knob" + val.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knob' + val.dialId), val.selectedValue, false);
                }
            });
            $(profileObject.bDials).each(function (key, val) {
                if ($("#knobbus" + val.dialId).jqxKnob('disabled')) {
                    $("#knobbus" + val.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knobbus' + val.dialId), val.selectedValue, false);
                }
            });
            $('.financialneedssection').addClass('disablestate');
        });
        $('.pNeedsList').on("click", ".personalNext", function () {
            if (currentNeedsIndex < (activeDialIds.length - 1)) {
                currentNeedsIndex++;
                loadNeedsPanel(".pNeedsList", ".pNeedsHead", "knob", "chkPNeed", "personalNext", activeDialIds, "personaltab");
            }
            else {
                $('.persoanltabssection').hide();
                $('.profilebuildeinfo ').css("padding-bottom", "50px");
                $('div[id ^= "knob"]').parent().hide();
                $('.prioPanel, .prioPanelContent').hide();
                $('.dialpadsection').removeClass("dialopen");
                $('.dialpopupwrapper .personaltab').fadeOut(300);
                $('.financialneedssection').removeClass('disablestate');
                $("#btnViewProfile").prop("disabled", true);
                $("html, body").animate({ scrollTop: $("#formsec").offset().top - 300 }, "slow");
                $('.lidestageneeds').show();
                $(".financialneedssection > h4").show();
                $(".homeformsection").slideDown();
                if (profileObject.LifeStageID == 0) {
                    var lifestageDefault = lifeStageObject.filter(lifestage => lifestage.label == defaultlifeStage);
                    if (lifestageDefault.length > 0) {
                        $("#lifeStages-" + lifestageDefault[0].Id).prop("checked", true);
                        profileObject.LifeStage = lifestageDefault[0].label;
                        profileObject.LifeStageID = lifestageDefault[0].Id;
                        $("#btnViewProfile").prop("disabled", false);
                    }
                } else {
                    $("#btnViewProfile").prop("disabled", false);
                }
                removeHash();
            }
        });

        $('#tab-1 .knobs').on('change', function (event) {
            if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') {
                return;
            }
            if (!$(this).find(".jqx-knob").jqxKnob('disabled')) {
                $(this).find("input").val(event.args.value + "%");
                updateCol($(this).find(".jqx-knob"), event.args.value);
            }
            else {
                $(this).find(".jqx-knob").find("input").val(event.args.value + "%");
                $(this).find(".jqx-knob").val(getColValue($(this).find(".jqx-knob")));
            }
        });
        $(".homeformsection #profileName").on('change', function (event) {
            profileObject.Name = $(this).val();
            $("#profileName").removeClass("error");
            if ($("#profileName").val().trim() == "") {
                $("#profileName").addClass("error");
            }
            if ($("#profileName").val() != "" && $("#profileEmail").val() != "") {
                profileObject.Status = "Partial Completed";
                profileObject.Email = $("#profileName").val();
                localStorage.setItem('profileObject', JSON.stringify(profileObject));
            }
        });
        $(".homeformsection #profileEmail").on('change', function (event) {
            profileObject.Email = $(this).val();
            $("#profileEmail").removeClass("error");
            if ($("#profileEmail").val().trim() == "") {
                $("#profileEmail").addClass("error");
            }
            else if (!isValidEmailAddress($("#profileEmail").val().trim())) {
                $("#profileEmail").addClass("error");
            }
            if ($("#profileName").val() != "" && $("#profileEmail").val() != "") {
                profileObject.Status = "Partial Completed";
                localStorage.setItem('profileObject', JSON.stringify(profileObject));
            }
        });
        $(".homeformsection #profilezipcode").on('change', function (event) {
            profileObject.Pincode = $(this).val();
            $("#profilezipcode").removeClass("error");
            if ($("#profilezipcode").val().trim() == "") {
                $("#profilezipcode").addClass("error");
            }
            else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test($("#profilezipcode").val().trim())) {
                $("#profilezipcode").addClass("error");
            }
            if ($("#profileName").val() != "" && $("#profileEmail").val() != "") {
                profileObject.Status = "Partial Completed";
                localStorage.setItem('profileObject', JSON.stringify(profileObject));
            }
        });
    }
});
var currentNeedsIndex = 0;
var TotalValue = 0;
var activeDialIds = new Array();
var activeDialValues = new Array();
var inactiveDialIds = new Array();
var activeDialId = null;
var totalPersonalKnobs = 0;
var animateItem = ".pknb";
var loadedProfile = false;
function checkFormValidation()
{
    var isValid = true;
    $("#profileName, #profileEmail, #profilezipcode").removeClass("error");
    if ($("#profileName").val().trim() == "") {
        $("#profileName").addClass("error");
        isValid = false;
    }
    if ($("#profileEmail").val().trim() == "") {
        $("#profileEmail").addClass("error");
        isValid = false;
    }
    else if (!isValidEmailAddress($("#profileEmail").val().trim())) {
        $("#profileEmail").addClass("error");
        isValid = false;
    }
    if ($("#profilezipcode").val().trim() == "") {
        $("#profilezipcode").addClass("error");
        isValid = false;
    }
    else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test($("#profilezipcode").val().trim())) {
        $("#profilezipcode").addClass("error");
        isValid = false;
    }
    // else {
    //     // if (!isValidZip($("#profilezipcode").val().trim())) {
    //     //     $("#profilezipcode").addClass("error");
    //     //     $(".ziperror").show();
    //     //     isValid = false;
    //     // }
    //     // else {
    //     //     $(".ziperror").hide();
    //     // }
    // }
    return isValid;
}
function startAnimation(arr, obj) {
    animating = true;
    hasAnimated = true;
    $(arr).each(function (key, val) {
        if (!loadedProfile) {
            var ele = $('#' + obj + val.dialId + " input");
            var ele1 = $('#' + obj + val.dialId);
            if ($('#' + obj + val.dialId).find('input').length == 0) {
                appendInput($('#' + obj + val.dialId), 0, false);
                ele = $('#' + obj + val.dialId + " input");
            }
            var rndVal = ele.val().replace("%", "");
            var xVal = 0;
            var isInc = true;
            var animateTimer = setInterval(function () {
                if ($('#' + obj + val.dialId).find('input').length == 0) {
                    appendInput($('#' + obj + val.dialId), xVal, false);
                    ele = $('#' + obj + val.dialId + " input");
                }
                ele.val(xVal + "%");
                ele1.val(xVal);
                if (isInc) {
                    xVal = xVal + 10;
                }
                else {
                    xVal = xVal - 10;
                }
                if (xVal >= rndVal) {
                    isInc = false;
                }
                
                animating = true;
                if (xVal <= -10) {
                    clearInterval(animateTimer);
                    animating = false;
                    ele.val(0 + "%");
                    ele1.val(0);
                    val.selectedValue = 0;
                }
            }, 200);
        }
        setTimeout(function () {
            animating = false;
            $(profileObject.pDials).each(function (key, value) {
                if ($("#knob" + value.dialId).jqxKnob('disabled')) {
                    $("#knob" + value.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knob' + value.dialId), value.selectedValue, false);
                }
            });
            $(profileObject.bDials).each(function (key, value) {
                if ($("#knobbus" + value.dialId).jqxKnob('disabled')) {
                    $("#knobbus" + value.dialId).jqxKnob({ disabled: false });
                    appendInput($('#knobbus' + value.dialId), value.selectedValue, false);
                }
            });
        }, 2000);
    });
    $("#btnSetProperties").addClass('opacity');
    $("#btnBusSetProperties").addClass('opacity');
}
function enablePersonal(shouldAnimate) {
    activeDialIds = [];
    activeDialId = null;
    $('.dialpopupwrapper .personaltab').fadeOut(300);
    $('div[id ^= "knob"]').parent().show();
    $('.financialneedssection').addClass('disablestate');

    $('#tabHeader-2').removeClass('active');
    $('#tabHeader-2').parent().removeClass('active');
    $('#tab-2').removeClass('active');

    $('#tabHeader-1').addClass('active');
    $('#tabHeader-1').parent().addClass('active');
    $('#tab-1').addClass('active');
    $("#toggleServiceType").removeClass('show');

    $('div[id ^= "knob"]').parent().show();
    profileObject.BankingType = "Personal Banking";
    profileObject.Status = "Anonymous";
    animateItem = ".pknb";
    if (shouldAnimate) {
        $(profileObject.pDials).each(function (key, value) {
            if ($("#knob" + value.dialId).find('input').length == 0) {
                appendInput($("#knob" + value.dialId), 0, false);
                ele = $("#knob" + value.dialId + " input");
            }
            const random = Math.floor(Math.random() * animationStages.length);
            $("#knob" + value.dialId).find("input").val(animationStages[random] + "%");
            $("#knob" + value.dialId).val(animationStages[random]);
            value.selectedValue = 0;
            var arrs = value.needsList.filter(needs => needs.selected == true);
            $(arrs).each(function (key1, val1) {
                val1.selected = false;
            });
        });
        startAnimation(profileObject.pDials, "knob");
    }   
    $('.lidestageneeds').slideUp();
    $(".financialneedssection > h4").hide();
}
function enableBusiness(shouldAnimate) {
    activeDialIds = [];
    activeDialId = null;
    $('.dialpopupwrapper .businesstab').fadeOut(300);
    $('div[id ^= "knobbus"]').parent().show();
    $('.financialneedssection').addClass('disablestate');

    $('#tabHeader-1').removeClass('active');
    $('#tabHeader-1').parent().removeClass('active');
    $('#tab-1').removeClass('active');

    $('#tabHeader-2').addClass('active');
    $('#tabHeader-2').parent().addClass('active');
    $('#tab-2').addClass('active');
    $("#toggleServiceType").removeClass('show');

    $('div[id ^= "knobbus"]').parent().show();

    profileObject.BankingType = "Business Banking";
    profileObject.Status = "Anonymous";
    animateItem = ".bunb";
    if (shouldAnimate) {
        $(profileObject.bDials).each(function (key, value) {
            const random = Math.floor(Math.random() * animationStages.length);
            $("#knobbus" + value.dialId).find("input").val(animationStages[random] + "%");
            $("#knobbus" + value.dialId).val(animationStages[random]);
            value.selectedValue = 0;
            var arrs = value.needsList.filter(needs => needs.selected == true);
            $(arrs).each(function (key1, val1) {
                val1.selected = false;
            });
        });
        startAnimation(profileObject.bDials, "knobbus");
    }
    $('.lidestageneeds').slideUp();
    $(".financialneedssection > h4").hide();
}
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
} 

function saveAnonymousProfile() {
    if (!animating && mode == 'dials') {
        if (profileObject.pDials != undefined) {
            var arr = profileObject.pDials.filter(dials => dials.selectedValue == 0);
            $(arr).each(function (key, val) {
                var arrs = val.needsList.filter(needs => needs.selected == true);
                $(arrs).each(function (key1, val1) {
                    val1.selected = false;
                });
            });
        }
        if (profileObject.bDials != undefined) {
            var arr = profileObject.bDials.filter(dials => dials.selectedValue == 0);
            $(arr).each(function (key, val) {
                var arrs = val.needsList.filter(needs => needs.selected == true);
                $(arrs).each(function (key1, val1) {
                    val1.selected = false;
                });
            });
        }
        localStorage.setItem('profileObject', JSON.stringify(profileObject));
        $("#btnViewProfile").attr("data-ls", JSON.stringify(profileObject));
        var submissionObject = JSON.parse(JSON.stringify(profileObject));
        if (submissionObject.pDials != null) {
            submissionObject.pDials = submissionObject.pDials.filter(dials => dials.selectedValue > 0);
            $(submissionObject.pDials).each(function (key, val) {
                val.needsList = val.needsList.filter(needs => needs.selected == true);
            });
        }
        if (submissionObject.bDials != null) {
            submissionObject.bDials = submissionObject.bDials.filter(dials => dials.selectedValue > 0);
            $(submissionObject.bDials).each(function (key, val) {
                val.needsList = val.needsList.filter(needs => needs.selected == true);
            });
        }
        // $.ajax({
        //     url: '/umbraco/Surface/ProfileFormSurface/SubmitForm',
        //     type: "POST",
        //     data: submissionObject,
        //     dataType: "json",
        //     success: function (result) {
        //         if (result.message == "success") {
        //             profileObject.profileID = result.guid;
        //             localStorage.setItem('profileObject', JSON.stringify(profileObject));
        //         }
        //     }, error: function (xhr, status, error) {
        //         var errorMessage = xhr.status + ': ' + xhr.statusText;
        //         console.log(errorMessage);
        //     }
        // });
    }
}
function loadProfile() {
    if (localStorage.getItem('profileObject') != null) {
        if (JSON.parse(localStorage.getItem('profileObject')).Status != "Profile-Generated") {
            var tempProfileObject = JSON.parse(localStorage.getItem('profileObject'));
            if (tempProfileObject.pDials.length > 0 || tempProfileObject.bDials.length > 0) {
                profileObject = tempProfileObject;
            }
            animating = false;
            if (profileObject.pDials != undefined) {
                var TotalValue = profileObject.pDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
                var TotalBValue = profileObject.bDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);

                if (TotalValue > 0) {
                    loadedProfile = true;
                    hasAnimated = true;
                    $(profileObject.pDials).each(function (key, value) {
                        $("#knob" + value.dialId).find("input").val(value.selectedValue + "%");
                        $("#knob" + value.dialId).val(value.selectedValue);
                    });
                    enablePersonal(false);
                }
                else {
                    if (TotalBValue == 0) {
                        isElementInView = Utils.isElementInView($(animateItem), false);
                        if (isElementInView) {
                            if (!hasAnimated) {
                                $(profileObject.pDials).each(function (key, value) {
                                    const random = Math.floor(Math.random() * animationStages.length);
                                    $("#knob" + value.dialId).find("input").val(animationStages[random] + "%");
                                    $("#knob" + value.dialId).val(animationStages[random]);
                                });
                                startAnimation(profileObject.pDials, "knob");
                            }
                        }
                    }
                }

                if (TotalValue == 100) {
                    if (profileObject.LifeStageID != undefined) {
                        if (profileObject.LifeStageID != 0) {
                            $("#lifeStages-" + profileObject.LifeStageID).prop("checked", true);
                            $(".lidestageneeds").slideDown(200, "linear", function () {
                                $(".financialneedssection > h4").show();
                                $(".homeformsection").slideDown(200);
                                $("#btnViewProfile").prop("disabled", false);
                                $("#btnSetProperties").removeClass('opacity');
                                $('.dialpadsection').removeClass("dialopen");
                                $('.dialpopupwrapper .personaltab').fadeOut(300);
                                $('.financialneedssection').removeClass('disablestate');
                                $("#profileName").val(profileObject.Name);
                                $("#profileEmail").val(profileObject.Email);
                                $("#profilezipcode").val(profileObject.Pincode);
                                $("html, body").animate({ scrollTop: $(".dialanimatesection ").offset().top - 300 }, "slow");
                            });
                        }
                    }
                }
                else {
                    if (TotalBValue == 0) {
                        $("#btnSetProperties").addClass('opacity');
                    }
                }
            }
            if (profileObject.bDials != undefined) {
                var TotalValue = profileObject.bDials.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
                if (TotalValue > 0) {
                    loadedProfile = true;
                    hasAnimated = true;
                    enableBusiness(false);
                }
                else {
                    if (productType == "Business Banking") {
                        if (!loadedProfile) {
                            console.log("Trigger Business");
                            loadedProfile = false;
                            hasAnimated = false;
                            enableBusiness(true);
                        }
                    }
                    else {
                        isElementInView = Utils.isElementInView($(animateItem), false);
                        if (isElementInView) {
                            if (!hasAnimated) {
                                $(profileObject.pDials).each(function (key, value) {
                                    const random = Math.floor(Math.random() * animationStages.length);
                                    $("#knobbus" + value.dialId).find("input").val(animationStages[random] + "%");
                                    $("#knobbus" + value.dialId).val(animationStages[random]);
                                });
                                startAnimation(profileObject.pDials, "knobbus");
                            }
                        }
                    }
                }
                $(profileObject.bDials).each(function (key, value) {
                    $("#knobbus" + value.dialId).find("input").val(value.selectedValue + "%");
                    $("#knobbus" + value.dialId).val(value.selectedValue);
                });

                if (TotalValue == 100) {
                    $("#btnBusSetProperties").removeClass('opacity');
                    $('.dialpadsection').removeClass("dialopen");
                    $('.dialpopupwrapper .businesstab').fadeOut(300);
                    $('.financialneedssection').removeClass('disablestate');
                    $("#profileName").val(profileObject.Name);
                    $("#profileEmail").val(profileObject.Email);
                    $("#profilezipcode").val(profileObject.Pincode);
                    $(".homeformsection").slideDown(2000, 'linear', function () {
                        $("html, body").animate({ scrollTop: $(".dialanimatesection").offset().top - 300 }, "slow");
                    });
                    $("#btnViewProfile").prop("disabled", false);
                }
                else {
                    $("#btnBusSetProperties").addClass('opacity');
                }
            }
        }
        else {
            localStorage.setItem('profileObject', JSON.stringify(profileObject));
            $('.financialneedssection').addClass('disablestate');
        }
        
    }
    else {
        if (productType == "Business Banking") {
            console.log("Trigger Business");
            loadedProfile = false;
            hasAnimated = false;
            enableBusiness(true);
        }
        else {
            isElementInView = Utils.isElementInView($(animateItem), false);

            if (isElementInView) {
                if (!hasAnimated) {
                    $(profileObject.pDials).each(function (key, value) {
                        const random = Math.floor(Math.random() * animationStages.length);
                        $("#knob" + value.dialId).find("input").val(animationStages[random] + "%");
                        $("#knob" + value.dialId).val(animationStages[random]);
                    });
                    startAnimation(profileObject.pDials, "knob");
                }
            }
        }
    }
    anonymousSaveInterval = setInterval(saveAnonymousProfile, 5000);
}
function discardProfile() {
    if (!animating) {
        $.ajax({
            url: '/umbraco/Surface/ProfileFormSurface/DiscardForm',
            type: "POST",
            data: {},
            dataType: "json",
            success: function (result) {
                if (result.message == "success") {
                    localStorage.removeItem('profileObject');
                    redirectToProfile();
                }
            }, error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.log(errorMessage);
            }
        });
    }
}
function saveProfile() {
    if (!animating && mode == 'dials') {
        clearInterval(anonymousSaveInterval);
        profileObject.Status = "Completed";
        localStorage.setItem('profileObject', JSON.stringify(profileObject));
        $("#btnViewProfile").attr("data-ls", JSON.stringify(profileObject));
        var submissionObject = JSON.parse(JSON.stringify(profileObject));
        if (submissionObject.pDials != null) {
            submissionObject.pDials = submissionObject.pDials.filter(dials => dials.selectedValue > 0);
            $(submissionObject.pDials).each(function (key, val) {
                val.needsList = val.needsList.filter(needs => needs.selected == true);
            });
        }
        if (submissionObject.bDials != null) {
            submissionObject.bDials = submissionObject.bDials.filter(dials => dials.selectedValue > 0);
            $(submissionObject.bDials).each(function (key, val) {
                val.needsList = val.needsList.filter(needs => needs.selected == true);
            });
        }
        
        // $.ajax({
        //     url: '/umbraco/Surface/ProfileFormSurface/SubmitForm',
        //     type: "POST",
        //     data: submissionObject,
        //     dataType: "json",
        //     success: function (result) {
        //         if (result.message == "success") {
        //             profileObject.profileID = result.guid;
        //             profileObject.Status = "Profile-Generated";
        //             localStorage.setItem('profileObject', JSON.stringify(profileObject));
        //             redirectToProfile();
        //         }
        //     }, error: function (xhr, status, error) {
        //         var errorMessage = xhr.status + ': ' + xhr.statusText;
        //         console.log(errorMessage);
        //     }
        // });
    }
}

function appendInput(ele, val, _disabled) {
    var input1 = $('<div class="inputField1 inputField">');
    ele.append(input1);
    $(input1).jqxNumberInput({
        width: 97,
        height: '50px',
        decimal: 0, // starting value same as widget
        min: 0,  // same as widget
        max: 100, // same as widget
        textAlign: 'center',
        decimalDigits: 0,
        inputMode: 'simple',
        symbol: '%',
        value: val,
        disabled: _disabled,
        symbolPosition: 'right'
    });
    if (!_disabled) {
        $(input1).on('wheel', function (event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
        });
        $(input1).on('mousedown', function (event) {
            event.stopPropagation();
        });
        $(input1).on('keyup', function (event) {
            if (event.keyCode == 38) {
                stepUP($(input1).val(), ele);
            }
            else if (event.keyCode == 40) {
                stepDN($(input1).val(), ele);
            }
        });
        $(input1).on('change', function (event) {
            valueChanged($(input1), ele, event);
        });
    }
}

function loadNeedsPanel(ele, eleHead, knb, chkNeedClass, ctaNextClass, dCol, serviceType) {
    $(ele).empty();
    var dialItem = getDial(activeDialIds[currentNeedsIndex].dialId, dCol);
    $(eleHead).html(dialItem.needsHeadingText);
    $(dialItem.needsList).each(function (key, val) {
        var state = "";
        if (val.selected == true) {
            state = "checked";
        }
        $(ele).append('<li><input class="' + chkNeedClass + '" data-dialId="' + activeDialIds[currentNeedsIndex].dialId + '" data-needId="' + val.ID + '" type="checkbox" name="needsList[]" id="profile-step-' + val.ID + '" value="' + val.ID + '" ' + state+'><label for="profile-step-' + val.ID + '" class="ctaborder">' + val.Name + '</label></li>');
    });
    $(ele).append('<li class="btnsec"><a href="javascript:void(0);" class="ctabtn ' + ctaNextClass +'" id="btnNext2"><span>Next</span></a></li>');
    $('div[id ^= "' + knb+'"]').parent().hide();
    $("#" + knb + activeDialIds[currentNeedsIndex].dialId).parent().show();
    $("#" + knb + activeDialIds[currentNeedsIndex].dialId).jqxKnob({ disabled: true });

    appendInput($("#" + knb + activeDialIds[currentNeedsIndex].dialId), activeDialIds[currentNeedsIndex].selectedValue, true);
    
    $('.dialpadsection').addClass("dialopen");
    $('.dialpopupwrapper .' + serviceType).fadeIn(250);
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function updateCol(knb, vl) {
    if (!knb.jqxKnob('disabled') && !animating) {
        var col = profileObject.pDials;
        var bthProp = "#btnSetProperties";
        var pnl = "#personal";
        if (knb.attr("id").includes("knobbus")) {
            col = profileObject.bDials;
            bthProp = "#btnBusSetProperties";
            pnl = "#business";
        };
        var dId = knb.attr("id").replace("knob", "").replace("bus", "");
        var arr = col.filter(dial => dial.dialId != dId);
        var otherSum = arr.map(dial => dial.selectedValue).reduce((acc, dial) => dial + acc);
        var TVal = otherSum + vl;
        if (TVal == 100) {
            $(bthProp).removeClass('opacity');
            var m = knb.attr("id").replace("knob", "").replace("bus", "");
            let dialItem = col.filter(a => a.dialId == m);
            dialItem[0].selectedValue = vl;
        }
        else if (TVal > 100) {
            //$(pnl).addClass('show');
            //knb.val(100 - otherSum);
            //$(knb.attr("id") + " input").val((100 - otherSum) + "%");
            $(bthProp).addClass('opacity');
            var m = knb.attr("id").replace("knob", "").replace("bus", "");
            let dialItem = col.filter(a => a.dialId == m);
            dialItem[0].selectedValue = vl;
        }
        else {
            $(bthProp).addClass('opacity');
            var m = knb.attr("id").replace("knob", "").replace("bus", "");
            let dialItem = col.filter(a => a.dialId == m);
            dialItem[0].selectedValue = vl;
        }
    }
};

function getColValue(knb) {
    var col = profileObject.pDials;
    if (knb.attr("id").includes("knobbus")) {
        col = profileObject.bDials;
    };
    var m = knb.attr("id").replace("knob", "").replace("bus", "");
    let dialItem = col.filter(a => a.dialId == m);
    return dialItem[0].selectedValue;
};

function getDial(m, col) {
    let dialItem = col.filter(a => a.dialId == m);
    return dialItem[0];
};

function stepUP(val, knb) {
    if (!knb.jqxKnob('disabled')) {
        if (val < 10) {
            knb.val(0);
            knb.val(10);
            updateCol(knb, 10);
        }
        else if (val < 20) {
            knb.val(0);
            knb.val(20);
            updateCol(knb, 20);
        }
        else if (val < 30) {
            knb.val(0);
            knb.val(30);
            updateCol(knb, 30);
        }
        else if (val < 40) {
            knb.val(0);
            knb.val(40);
            updateCol(knb, 40);
        }
        else if (val < 50) {
            knb.val(0);
            knb.val(50);
            updateCol(knb, 50);
        }
        else if (val < 60) {
            knb.val(0);
            knb.val(60);
            updateCol(knb, 60);
        }
        else if (val < 70) {
            knb.val(0);
            knb.val(70);
            updateCol(knb, 70);
        }
        else if (val < 80) {
            knb.val(0);
            knb.val(80);
            updateCol(knb, 80);
        }
        else if (val < 90) {
            knb.val(0);
            knb.val(90);
            updateCol(knb, 90);
        }
        else if (val < 100) {
            knb.val(0);
            knb.val(100);
            updateCol(knb, 100);
        }
    }
}
function stepDN(val, knb) {
    if (!knb.jqxKnob('disabled')) {
        if (val > 90) {
            knb.val(0);
            knb.val(90);
            updateCol(knb, 90);
        }
        else if (val > 80) {
            knb.val(0);
            knb.val(80);
            updateCol(knb, 80);
        }
        else if (val > 70) {
            knb.val(0);
            knb.val(70);
            updateCol(knb, 70);
        }
        else if (val > 60) {
            knb.val(0);
            knb.val(60);
            updateCol(knb, 60);
        }
        else if (val > 50) {
            knb.val(0);
            knb.val(50);
            updateCol(knb, 50);
        }
        else if (val > 40) {
            knb.val(0);
            knb.val(40);
            updateCol(knb, 40);
        }
        else if (val > 30) {
            knb.val(0);
            knb.val(30);
            updateCol(knb, 30);
        }
        else if (val > 20) {
            knb.val(0);
            knb.val(20);
            updateCol(knb, 20);
        }
        else if (val > 10) {
            knb.val(0);
            knb.val(10);
            updateCol(knb, 10);
        }
        else if (val > 0) {
            knb.val(0);
            knb.val(0);
            updateCol(knb, 0);
        }
    }
}
function valueChanged(inp, knb, eve) {
    eve.stopPropagation();
    eve.stopImmediatePropagation();
    eve.preventDefault();
    newVal = inp.val();
    if (eve.keyCode == undefined && eve.args.type == "mouse") {
        if (!knb.jqxKnob('disabled')) {
            if (getColValue(knb) < newVal) {
                stepUP(newVal, knb);
            }
            else {
                stepDN(newVal, knb);
            }
        }
    }
    else if (eve.keyCode == undefined && eve.args.type == "keyboard") {
        if (newVal == 0) {
            knb.val(1);
            knb.val(0);
            updateCol(knb, 0);
        }
        if (newVal > 0 && newVal <= 14) {
            knb.val(0);
            knb.val(10);
            updateCol(knb, 10);
        }
        else if (newVal > 14 && newVal <= 24) {
            knb.val(0);
            knb.val(20);
            updateCol(knb, 20);
        }
        else if (newVal > 24 && newVal <= 34) {
            knb.val(0);
            knb.val(30);
            updateCol(knb, 30);
        }
        else if (newVal > 34 && newVal <= 44) {
            knb.val(0);
            knb.val(40);
            updateCol(knb, 40);
        }
        else if (newVal > 44 && newVal <= 54) {
            knb.val(0);
            knb.val(50);
            updateCol(knb, 50);
        }
        else if (newVal > 54 && newVal <= 64) {
            knb.val(0);
            knb.val(60);
            updateCol(knb, 60);
        }
        else if (newVal > 64 && newVal <= 74) {
            knb.val(0);
            knb.val(70);
            updateCol(knb, 70);
        }
        else if (newVal > 74 && newVal <= 84) {
            knb.val(0);
            knb.val(80);
            updateCol(knb, 80);
        }
        else if (newVal > 84 && newVal <= 94) {
            knb.val(0);
            knb.val(90);
            updateCol(knb, 90);
        }
        else if (newVal > 94) {
            knb.val(0);
            knb.val(100);
            updateCol(knb, 100);
        }
    }
}
function roundoffValue(dialValue){
    var roundoff1 = Math.floor(dialValue);
    var valu = Math.round(roundoff1 / 10) * 10;
    return valu;
}

function removeHash() { 
    window.history.pushState("", document.title, window.location.pathname);
}

function knob1(knob_id, k1_disabled, k1_value){
    
    $(knob_id).jqxKnob({
        value: k1_value,
        min: 0,
        max: 100,
        startAngle: 270,
        endAngle: 630,
        dragStartAngle: 270,
        snapToStep: false,
        rotation: 'clockwise',
        disabled: k1_disabled,
        marks: {
            colorRemaining: { color: '#B8B9B9', border: '#B8B9B9' },
            colorProgress: { color: '#EEB944', border: '#01295B' },
            type: 'line',
            offset: '80%',
            thickness: 1,
            size: '5%',
            majorSize: '9%',
            majorInterval: 1,
            minorInterval: 2
        },
        step: 10,
        labels: {
            offset: '88%',
            step: 10,
            visible: true,
            formatFunction: function (label) {
                if (label == 0)
                    return "Min";
                if (label == 100)
                    return "Max";
                return label;
            }
        },
        dial: {
              innerRadius: '0%', // specifies the inner Radius of the dial
                outerRadius: '100%', // specifies the outer Radius of the dial
            style: {
                stroke: '#E9EAF2', strokeWidth: 1, fill: { color: '#E9EAF2', gradientType: 'radial', gradientStops: [[1, 9], [70, 0.9999], [60, 1]] }
            }
        },
        spinner: {
            style: { fill: { color: '#E9EAF2', gradientType: "radial", gradientStops: [[0, 1], [0, 0.9], [100, 1]] }, stroke: '#E9EAF2' },
            innerRadius: '0%', // specifies the inner Radius of the dial
            outerRadius: '0%', // specifies the outer Radius of the dial
            marks: {
                colorRemaining: '#EEB944',
                colorProgress: '#EEB944',
                type: 'line',
                offset: '72%',
                thickness: 0,
                size: '16%',
                majorSize: '30%',
                majorInterval: 200,

            },

        },
        changing: function (oldValue, newValue) {
            var actualDiffValue = oldValue - newValue;
            var diffValue = oldValue - newValue;
            if (diffValue < 0) {
                diffValue = -diffValue;
            }
            if (diffValue > 100) {
                return false;
                //alert("Old Value : " +  oldValue + " - New Value : " +  newValue + " Diff : " + diffValue);
            }
            if (actualDiffValue < 0) {
                if (actualDiffValue > 5) {
                    var valu = Math.round(oldValue / 10) * 10;
                    $(input1).val(valu);
                }
                else {
                    var valu = Math.round(newValue / 10) * 10;
                    $(input1).val(valu);
                }
            }
            else {
                if (actualDiffValue > 5) {
                    var valu = Math.round(newValue / 10) * 10;
                    $(input1).val(valu);
                }
                else {
                    var valu = Math.round(oldValue / 10) * 10;
                    $(input1).val(valu);
                }
            }
        },

        progressBar: {
            style: { fill: { color: '#EEB944', gradientType: 'radial', gradientStops: [[1, 0.9], [100, 0.9]] } },
                size: '8%',
                offset: '70%',
                background: { fill: '#01295B', stroke: '#EEB944' }
        },
        pointer: {
             type: 'circle', style: { fill: '#EEB944', stroke: '#01295B' }, size: '8%', offset: '72%', thickness: 1}
    });

    var input1 = $('<div class="inputField1 inputField">');
    $(knob_id).append(input1);
    var inputOptions1 = {
        width: 97,
        height: '50px',
        decimal: k1_value, // starting value same as widget
        min: 0,  // same as widget
        max: 100, // same as widget
        textAlign: 'center',
        decimalDigits: 0,
        inputMode: 'simple',
        symbol: '%',
        symbolPosition: 'right',
        disabled: k1_disabled
    };

    $(input1).jqxNumberInput(inputOptions1);
    //$(knob_id).val(k1_value);
    $(input1).on('mousedown', function (event) {
        event.stopPropagation();
    });
    $(input1).on('keyup', function () {
        var val = $(this).val();
        $(knob_id).val(k1_value);
    });
    $(input1).on('change', function () {
        var val = $(this).val();
        $(knob_id).val(k1_value);
    });
}

var current_knobid;
var current_knobvalue;
var hasAnimated = false;
$(document).ready(function () {
    setTimeout(function () {
        $(window).scroll(function () {
            if (mode == 'dials') {
                isElementInView = Utils.isElementInView($(animateItem), false);

                if (isElementInView) {
                    if (!hasAnimated) {
                        $(profileObject.pDials).each(function (key, value) {
                            const random = Math.floor(Math.random() * animationStages.length);
                            $("#knob" + value.dialId).find("input").val(animationStages[random] + "%");
                            $("#knob" + value.dialId).val(animationStages[random]);
                        });
                        startAnimation(profileObject.pDials, "knob");
                    }
                }
            }
        });
    }, 2000);
    
    $('.popuplink').click(function () {
        $("body").css({ "overflow": "hidden" });
        $('.homepopupwrapper .overlay').fadeIn(300);
        $('.siteWrap').addClass("popupOpened");
    });
});

$(window).on("load", function () {
    $(".chartContainer svg circle").trigger('click');
 });

function redirectToProfile() {
    var root = window.location.origin;
    window.location.href = root;
}

function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop() - 200;
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();
var isElementInView = null;
if (mode == 'dials') {
    var isElementInView = Utils.isElementInView($(animateItem), false);
}

// function isValidZip(zipcode) {
//     var retval = false;
//     $.ajax({
//         url: '/umbraco/Surface/ProfileFormSurface/CheckZipcode',
//         type: "POST",
//         data: { zipcode: zipcode },
//         async: false,
//         success: function (result) {
//             if (result.status) {
//                 retval = result.status;
//             }
//         },
//         error: function (xhr, status) {
//             console.log("Error:" + status);
//             retval = false;
//         }
//     });
//     return retval;
// }
