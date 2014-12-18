$(function () {

    "use strict";


    Yellow.equalizeHeight('.dlp-business-image-rating > .card, .dlp-business-info > .card', 'max');

    // Save / Unsave this listing
    
    Yellow.ajaxButton('.ajax-button');


    // Rate this listing

    Yellow.starRater('.star-rater');


});
