$(function () {
    "use strict";

    var $window = $(window);

    // Save / Unsave this listing
    
    Yellow.ajaxButton('.ajax-button');


    // Rate this listing

    Yellow.starRater('.star-rater');
    

    // Reveal 'article title' and field when textarea above is focused

    $(".dlp-review-form__textarea textarea").one('focus', function () {
        $('.dlp-review-form__title').css('display', 'block');
    });


    // Activate carousel

    Yellow.carousel('.dlp-carousel', { showItems: 3 });


    // Review feedback / report

    Yellow.ajaxButton('.review-feedback a', function (data, el) {
        el.parent('.review-feedback').html('Thank you for your feedback');
    });

    Yellow.ajaxButton('.review-report', function (data, el) {
        el.replaceWith($('<span>Reported</span>'));
    });

    $('.dlp-phone-us').on('click', function (e) {
        if ($window.outerWidth() < 768) return true;
        e.preventDefault();
        var el = $(this);
        el.siblings('.phone-us-number').removeClass('hide-me').text(el.attr('href').slice(4));
    });
    // Submit review

    Yellow.submitReview();

    $("#photo-input").change(function() {
        $('#upload-form').submit();
    })
    $('.imageAction').click(function () {
        $('.review-image').hide()
        $('.progress').hide()
    })

    Yellow.upload({
        form:     $('#upload-form'),
        success:  function (response, xhr) { 
            $('.review-image').show().find('img').attr('src', response.image)
        },
        progress: function (percentDone, xhr) {
            var progress = $('.progress')
            progress.show().find('.bar').width(percentDone + "%")
            progress.find('.percent').text(percentDone + "%")

        }, // optional
        error:    function (response, xhr) {
            Yellow.notify(response.error, 'error');
            $('.uploadImageProgress').hide()
        }, // optional'
        fallback: 'iframe', 
    });

});
