(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            let opt = options,
                jtype = opt.type,
                jfit = opt.fit,
                jwidth = opt.width,
                //vtabs = 'vertical',
                accord = 'accordion';

            $(this).bind('tabactivate', function (e, currentTab) {
                if (typeof options.activate === 'function') {
                    options.activate.call(currentTab, e);
                }
            });

            this.each(function () {
                let $respTabs = $(this);
                setupTabs($respTabs, jwidth);
                applyTabOptions($respTabs, jtype, jfit, accord);
                createAccordionMarkup($respTabs);
                setTabAttributes($respTabs, options, $respTabs.find('ul.resp-tabs-list'));
                setupClickActions($respTabs);
                handleResize($respTabs);
            });
        }
    });

    function setupTabs($respTabs, jwidth) {
        $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
        $respTabs.css({
            'display': 'block',
            'width': jwidth
        });
        $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
    }

    function applyTabOptions($respTabs, jtype, jfit, accord) {
        if (jtype === 'vertical') {
            $respTabs.addClass('resp-vtabs');
        }
        if (jfit) {
            $respTabs.css({ width: '100%', margin: '0px' });
        }
        if (jtype === accord) {
            $respTabs.addClass('resp-easy-accordion');
            $respTabs.find('.resp-tabs-list').css('display', 'none');
        }
    }

    function createAccordionMarkup($respTabs) {
        $respTabs.find('.resp-tab-content').before("<div class='resp-accordion' role='tab'><span class='resp-arrow'></span></div>");
        $respTabs.find('.resp-accordion').each(function (index) {
            let $tabItemh2 = $(this);
            let innertext = $respTabs.find('.resp-tab-item').eq(index).html();
            $tabItemh2.append(innertext).attr('aria-controls', 'tab_item-' + index);
        });
    }

    function setTabAttributes($respTabs, options, $respTabsList) {
        $respTabs.find('.resp-tab-item').each(function (index) {
            $(this).attr({
                'aria-controls': 'tab_item-' + index,
                'role': 'tab'
            });
        });
        let tabcount = 0;
        let count = 0;
        $respTabs.find('.resp-tab-content').each(function (index) {
            let $tabContent = $(this);
            $(this).attr({
                'aria-labelledby': 'tab_item-' + index,
                'id': 'tab_item-' + index,
                'role': 'tabpanel'
            });
            let tabcountmob = 0;
                    $('.mobileCloneContent .mobiletabData').find('.mobileProduct').each(function () {
                        let $tabContentSwiper = $(this);
                        $tabContentSwiper.attr('id', 'mob_tab_item-' + (tabcountmob));
                        tabcountmob++;
                    });
                    count++;
                    let id = $tabContent.attr('id');
                        let swiperlistcontent = $("#" + id).clone();
                        $('#mob_tab_item-' + tabcount).html(swiperlistcontent).hide();
                        $('#mob_tab_item-' + tabcount).show();
                        $('#mob_tab_item-' + tabcount).find('.lazy').Lazy({
                            bind: 'event',
                            afterLoad: function(element) {
                                $("img").removeClass("layzeloading");
                            }
                        });
                        tabcount++;
        });
        
        setInitialActiveTab($respTabs, options, $respTabsList);
    }

    function setInitialActiveTab($respTabs, options, $respTabsList) {
        if (options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
            $respTabs.find('.resp-tab-item').first().addClass('resp-tab-active');
            $respTabs.find('.resp-accordion').first().addClass('resp-tab-active');
            $respTabs.find('.resp-tab-content').first().addClass('resp-tab-content-active').attr('style', 'display:flex');
        }
    }

    function setupClickActions($respTabs) {
        $respTabs.find("[role=tab]").each(function () {
            $(this).click(function () {
                handleTabClick($(this), $respTabs);
            });
        });
    }

    function handleTabClick($currentTab, $respTabs) {
        let $tabAria = $currentTab.attr('aria-controls');
        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
            $respTabs.find('.resp-tab-content-active').slideUp('', function () {
                $(this).addClass('resp-accordion-closed');
            });
            $currentTab.removeClass('resp-tab-active');
            return false;
        }
        toggleTabs($currentTab, $respTabs, $tabAria);
        handleVideoPause($respTabs);
    }

    function toggleTabs($currentTab, $respTabs, $tabAria) {
        $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
        $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active resp-accordion-closed');
        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
        $respTabs.find('.resp-tab-content[aria-labelledby=' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:flex');
        $currentTab.trigger('tabactivate', $currentTab);
    }

    function handleVideoPause($respTabs) {
        let youtubeVideo = $respTabs.find('.videoPanel.youtubevideopanel');
        let vimeoVideo = $respTabs.find('.videoPanel.vimeovideopanel');
        if (youtubeVideo.length) {
            let youtubeIndex = youtubeVideo.attr('data-index');
            if (youtubeIndex) {
                YoutubeplayerList[youtubeIndex].pauseVideo();
            }
        }
        if (vimeoVideo.length) {
            let vimeoIndex = vimeoVideo.attr('data-index');
            if (vimeoIndex) {
                VimeoplayerList[vimeoIndex].pause();
            }
        }
    }

    function handleResize($respTabs) {
        $(window).resize(function () {
            $respTabs.find('.resp-accordion-closed').removeAttr('style');
        });
    }
})(jQuery);
