/*
    Name: YouTubePopUp
    Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
    Version: 1.0.2
    Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
    Written By: Qassim Hassan
    Twitter: @QQQHZ
    Websites: wp-time.com | qass.im | wp-plugins.in
    Dual licensed under the MIT and GPL licenses:
        http://www.opensource.org/licenses/mit-license.php
        http://www.gnu.org/licenses/gpl.html
    Copyright (c) 2016 - Qassim Hassan
*/
(function ($) {
    $.fn.YouTubePopUp = function (options) {
        var YouTubePopUpOptions = $.extend({
            autoplay: 1,
        }, options);

        var youtubeAPIReady = false;

        // Load YouTube API dynamically and set a flag when ready
        function loadYouTubeAPI(callback) {
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                var script = document.createElement('script');
                script.src = "https://www.youtube.com/iframe_api";
                document.body.appendChild(script);

                // Listen for the YouTube API ready event
                window.onYouTubeIframeAPIReady = function () {
                    youtubeAPIReady = true;
                    if (callback) callback();
                };
            } else {
                youtubeAPIReady = true;
                if (callback) callback();
            }
        }

        // Initialize the popup on click
        $(this).on('click', function (e) {
            e.preventDefault();

            var youtubeLink = $(this).attr("href");

            var split_c, split_n;
            if (youtubeLink.match(/(youtube.com)/)) {
                split_c = "v=";
                split_n = 1;
            } else if (youtubeLink.match(/(youtu.be)/)) {
                split_c = "/";
                split_n = 3;
            }

            var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];
            var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

            // Add popup HTML
            $("body").append(`
                <div class="YouTubePopUp-Wrap YouTubePopUp-animation">
                    <div class="YouTubePopUp-Content">
                        <span class="YouTubePopUp-Close"></span>
                        <div id="YouTubePopUp-Player"></div>
                    </div>
                </div>
            `);

            if ($('.YouTubePopUp-Wrap').hasClass('YouTubePopUp-animation')) {
                setTimeout(function () {
                    $('.YouTubePopUp-Wrap').removeClass("YouTubePopUp-animation");
                }, 600);
            }

            // Load the YouTube API and initialize the player
            loadYouTubeAPI(function () {
                if (youtubeAPIReady) {
                    var player = new YT.Player('YouTubePopUp-Player', {
                        videoId: cleanVideoID,
                        playerVars: {
                            autoplay: YouTubePopUpOptions.autoplay,
                            rel: 0,
                            mute:true,
                        },
                        events: {
                            'onReady': function (event) {
                                console.log("YouTube Player is ready.");
                            },
                            'onStateChange': function (event) {
                                var action = '';
                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        action = 'play';
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        action = 'pause';
                                        break;
                                    case YT.PlayerState.ENDED:
                                        action = 'end';
                                        break;
                                }

                                if (action) {
                                    var videoData = player.getVideoData();
                                    var percentageWatched = Math.floor((player.getCurrentTime() / player.getDuration()) * 100);

                                    // Push to dataLayer
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                        event: 'gtm.video',
                                        action: action,
                                        videoTitle: videoData.title || "Unknown Title",
                                        videoUrl: player.getVideoUrl(),
                                        percentage: percentageWatched
                                    });
                                }
                            }
                        }
                    });
                } else {
                    console.error("YouTube API is not ready.");
                }
            });

            // Close the popup
            $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function () {
                $(".YouTubePopUp-Wrap").addClass("YouTubePopUp-Hide").delay(515).queue(function () {
                    $(this).remove();
                });
            });

            // Close on escape key press
            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    $('.YouTubePopUp-Wrap, .YouTubePopUp-Close').click();
                }
            });
        });
    };
}(jQuery));
