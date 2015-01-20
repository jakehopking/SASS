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


    // Activate carousel

    Yellow.carousel('.dlp-carousel', { showItems: 3 });


});
