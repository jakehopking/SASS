$(function () {

    "use strict";


    // Save / Unsave this listing
    
    Yellow.ajaxButton('.ajax-button');


    // Rate this listing

    var ratingLabel = $('.star-rater-text'),
        ratingText  = ['Terrible', 'Very poor', 'Poor', 'Ok', 'Good', 'Love it!'];

    Yellow.starRater('.star-rater', function (rating) {
        ratingLabel.text((rating === -1) ? '' : ratingText[Math.round(rating)]);
    });

    // Reveal 'article title' and field when textarea above is focused

    $(".dlp-review-form__textarea textarea").one('focus', function () {
        $('.dlp-review-form__title').css('display', 'block');
    });


    // Activate carousel

    Yellow.carousel('.dlp-carousel', { showItems: 3 });

});
