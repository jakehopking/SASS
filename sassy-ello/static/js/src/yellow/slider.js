(function () {

    "use strict";

    /*

    Slider Module (progressive enhancement)

    Example usage:

        Html:
            <div class="slider slider-feature">
                
                <div class="slider-content">
                    <div class="slider-frame slider-prev">  
                    </div>
                    <div class="slider-frame slider-current">
                    </div>
                    <div class="slider-frame slider-next">
                    </div>
                </div>

                <div class="slider-arrows">
                    <a class="arrow-left"></a>
                    <a class="arrow-right"></a>
                </div>
                <div  class="slider-nav grid">
                    <div class="grid__item palm--one-quarter lap--one-quarter one-eighth">
                        <div class="slider-item-info" data-description="This is not so long description" data-title="Main title" data-review-link="#" data-rating="4.5" data-time="2 days ago" data-photo="/main_image.jpg"></div>
                        <img class="image-thumb-square" src="/thumb_image.jpg" alt="Main title">
                    </div>
                    <div class="grid__item palm--one-quarter lap--one-quarter one-eighth">
                        <div class="slider-item-info" data-description="This is not so long description 2" data-title="Main title 2" data-review-link="#" data-rating="4.5" data-time="4 days ago" data-photo="/main_image2.jpg"></div>
                        <img class="image-thumb-square" src="/thumb_image2.jpg" alt="Main title 2">
                    </div>
                </div>
            </div>

        Js:
            Yellow.slider('.slider');

    Expands to fill available horizontal space.
    You will need to set a reasonable height with css on .slider-content
    Scrolls via swipe, or optionally: index navigation / arrow click.

    */

    
    function slider () {

        var sel             = $(this),
            container       = $('.slider-content', sel),
            //content         = $('.slider-content > *', sel),
            content_full    = [],
            menu            = $('.slider-menu > *', sel),
            jumpArrows      = $('.slider-arrows > *', sel),
            jumpPrev        = $(jumpArrows.get(0)),
            jumpNext        = $(jumpArrows.get(1)),
            jumpN           = $('.slider-nav > *', sel),

            framePrev       = $('<div class="slider-frame slider-prev"></div>'),
            frameCurrent    = $('<div class="slider-frame slider-current"></div>'),
            frameNext       = $('<div class="slider-frame slider-next"></div>'),

            fromIndex       = 0,
            current         = 0,
            prev,
            next,

            width           = container.width(),
            position        = 0,
            speed           = 10,
            distance        = 50,
            interval,

            startX,
            destX;

            $( ".slider-item-info", sel ).each(function(i) {
                content_full.push({
                    description: $( this ).attr('data-description'), 
                    title: $( this ).attr('data-title'),
                    review_link: $( this ).attr('data-review-link'),
                    rating: $( this ).attr('data-rating'), 
                    time: $( this ).attr('data-time'), 
                    photo: $( this ).attr('data-photo')
                });
            });
            console.log(content_full);

        var count           = content_full.length,
            last            = count - 1;

        function reset (index) {

            position = 0;
            current  = index;
            prev     = (current === 0) ? last : current - 1;
            next     = (current === last) ? 0 : current + 1;

            framePrev.html(
                '<div class="slider-item" style="background-image: url('+content_full[prev].photo+');">'+
                    '<div class="slider-description">'+
                        '<div class="review-feature review-feature--for-slider">'+
                            '<a class="zeta" href="'+content_full[prev].review_link+'">'+content_full[prev].title+'</a>'+
                            '<div class="feature__content">'+
                                '<div class="feature__comment">'+content_full[prev].description+'</div>'+
                                '<div class="feature__comment-details">'+
                                    '<span class="feature__comment-score">'+content_full[prev].rating+' <i class="fa fa-star"></i></span>'+
                                    '<span class="feature__comment-time">'+content_full[prev].time+'</span>'+
                '</div></div></div></div></div>'
            ).css({ left: (-width) + 'px' });
            frameCurrent.html(
                '<div class="slider-item" style="background-image: url('+content_full[current].photo+');">'+
                    '<div class="slider-description">'+
                        '<div class="review-feature review-feature--for-slider">'+
                            '<a class="zeta" href="'+content_full[current].review_link+'">'+content_full[current].title+'</a>'+
                            '<div class="feature__content">'+
                                '<div class="feature__comment">'+content_full[current].description+'</div>'+
                                '<div class="feature__comment-details">'+
                                    '<span class="feature__comment-score">'+content_full[current].rating+' <i class="fa fa-star"></i></span>'+
                                    '<span class="feature__comment-time">'+content_full[current].time+'</span>'+
                '</div></div></div></div></div>'
            ).css({ left: '0px' });
            frameNext.html(
                '<div class="slider-item" style="background-image: url('+content_full[next].photo+');">'+
                    '<div class="slider-description">'+
                        '<div class="review-feature review-feature--for-slider">'+
                            '<a class="zeta" href="'+content_full[next].review_link+'">'+content_full[next].title+'</a>'+
                            '<div class="feature__content">'+
                                '<div class="feature__comment">'+content_full[next].description+'</div>'+
                                '<div class="feature__comment-details">'+
                                    '<span class="feature__comment-score">'+content_full[next].rating+' <i class="fa fa-star"></i></span>'+
                                    '<span class="feature__comment-time">'+content_full[next].time+'</span>'+
                '</div></div></div></div></div>'
            ).css({ left: width + 'px' });

            if (jumpN.length > 0) $(jumpN.removeClass('active').get(current)).addClass('active');
        }

        function autoMove (velocity) {

            interval = window.setInterval(function () { move(position + velocity); }, speed);
        }

        function move (to) {

            if (Math.abs(to) >= width) {

                if (interval) {
                    window.clearInterval(interval);
                    interval = null;
                }

                reset((position < 0) ? next : prev);

            } else {
                position = to;
                framePrev.css({ left: (to - width) + 'px' });
                frameCurrent.css({ left: to + 'px' });
                frameNext.css({ left: (to + width) + 'px' });
            }
        }

        function jumpOne (direction, index) {

            if (interval) return;
            reset(current);
            autoMove(direction * distance);
        }

        function jumpMany (index) {

            frameCurrent.fadeOut(speed * 5, function () {
                reset(index);
                frameCurrent.fadeIn(speed * 5);
            });
        }

        function setSize () {

            width = container.width();
            reset(current);
        }

        if (jumpArrows.length > 0) {

            jumpPrev.on({ click: function () { jumpOne(1,  prev); } });
            jumpNext.on({ click: function () { jumpOne(-1, next); } });
        }

        if (jumpN.length > 0) {

            jumpN.on({ 

                click: function () {

                    jumpN.removeClass('active');
                    var index = $(this).addClass('active').index();

                    if (current === index) return;

                    if (index === prev) {
                        jumpOne(1,  prev);

                    } else if (index === next) {
                        jumpOne(-1, next);

                    } else {
                        jumpMany(index);
                    }
                }
            });
        }

        container.on({

            touchstart: function (e) {

                e.preventDefault(); 
                startX = e.originalEvent.changedTouches[0].pageX;
            },

            touchmove: function (e) { 

                e.preventDefault(); 
                destX = e.originalEvent.changedTouches[0].pageX;
                move(destX - startX);
            },

            touchend: function (e) {

                if (Math.abs(position) > (width / 3)) { // continue
                    autoMove((position > 0) ? distance : -distance);

                } else { // return
                    move(0);
                }
            }
        });

        $(window).on({ resize: setSize });

        container.html([framePrev, frameCurrent, frameNext]);  

        setSize();
    };



    Yellow.slider = function (selector) {

        var sel = (selector instanceof $) ? selector : $(selector); 
        if (sel.length < 1) return;

        sel.each(slider);
    }



}).call(this);