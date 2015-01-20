$(function () {

    "use strict";


    /*

    Star rater

    Example usage:

        Html:

            A star rater that submits a rating directly (to 'data-action' url):

            <div class="star-rater" data-action="/rate/listing_id" data-rating="3.5">
            </div>


            A star rater that just sets the value of a hidden field:

            <div class="star-rater" data-rating="2.5">
                <input type="hidden" name="rating" value="2.5">
            </div>

        Js:

            Yellow.starRater('.star-rater');

    Expects a rating from 0 - 5 by 0.5 increments;        

    */

    function ratingToCls (rating) {

        var cls = [], i;
        for (i = 0; i < 5; i++) 
            cls.push((rating - i === 0.5) ? 'fa-star-half-o' : ((rating > i) ? 'fa-star' : 'fa-star-o'));

        return cls;
    }    


    function percentToRating (pct) {
        return parseFloat((Math.round(pct / 20 * 2) / 2).toFixed(1));
    }


    function update (stars, rating, onUpdate) {

        var cls = ratingToCls(rating);

        stars.each(function (i, el) {
            $(el).attr('class', 'fa ' + cls[i]);
        });

        if (onUpdate) onUpdate(rating);
    }


    function starRater (onUpdate) {

        var sel         = $(this),
            offset      = sel.offset().left,
            action      = sel.attr('data-action'),
            rating      = parseFloat(sel.attr('data-rating')),
            input       = $('input', sel),
            tempRating  = rating,
            width       = 0;

        sel.append(
            '<span class="star-rater-stars">' + 
                ratingToCls(rating).map(function (cls) { 
                    return '<i class="fa ' + cls + '"></i>';
                }).join('') + 
            '</span>'
        );

        var stars = $('i', sel);

        sel.on({

            // update stars on mouseover

            mouseenter: function () {
                width = sel.width();
            },

            mousemove: function (e) {
                var x = e.pageX - offset;
                tempRating = percentToRating(Math.round(x / width * 100));
                update(stars, tempRating, onUpdate);
            },

            mouseout: function () {
                update(stars, rating, onUpdate);
            },

            click: function () { 

                if (input) {

                    rating = tempRating;
                    input.val(rating);
                    update(stars, rating, onUpdate);
                }

                if (action) {

                    if (!Yellow.user) return Yellow.promptLogin('Please log in to submit a rating');

                    // send new rating to server, expect new average rating for that listing in response
                    // i.e: POST /rate/{listingId} { rating: 3.5, xsrf: "23r89u2r98u2r" }
                    // response if ok: 200 { rating: 3, message: 'Rating received' }
                    // response if error: 5XX { error: 'Rating error' }

                    $.ajax({

                        url:        action,
                        method:     'POST',
                        dataType:   'json',
                        data:       { rating: tempRating },
                        headers:    { 'X-CSRFToken': Yellow.csrf },

                        success: function (data) {

                            rating = data.rating;
                            update(stars, rating, onUpdate);
                            Yellow.notify(data.message || 'Rating received');
                        },

                        error: function (xhr, textStatus, errMessage) {

                            Yellow.notify(errMessage || 'Rating error', 'error');
                        } 
                    });
                }
            }
        });
    }


    Yellow.starRater = function (selector, onUpdate) {

        var sel = $(selector); if (sel.length < 1) return;
        sel.each(function () {
            starRater.call($(this), onUpdate);
        });
    };


});
