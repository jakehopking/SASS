(function () {

    "use strict";

    /*

    Slider Module (progressive enhancement)

    Example usage:

        Html:
            <div class="slider">

                <div class="slider-content">
                    <img src="/img/slide1.jpg" alt="Slide 1">
                    <img src="/img/slide2.jpg" alt="Slide 2">
                    <img src="/img/slide3.jpg" alt="Slide 3">
                    <img src="/img/slide4.jpg" alt="Slide 4">
                </div>

                <div class="slider-arrows">
                    <div>&#9664;</div>
                    <div>&#9654;</div>
                </div>

                <div class="slider-nav">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
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
            content         = $('.slider-content > *', sel),
            menu            = $('.slider-menu > *', sel),
            jumpArrows      = $('.slider-arrows > *', sel),
            jumpPrev        = $(jumpArrows.get(0)),
            jumpNext        = $(jumpArrows.get(1)),
            jumpN           = $('.slider-nav > *', sel),

            framePrev       = $('<div class="slider-frame slider-prev"></div>'),
            frameCurrent    = $('<div class="slider-frame slider-current"></div>'),
            frameNext       = $('<div class="slider-frame slider-next"></div>'),

            count           = content.length,
            last            = count - 1,
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

        function reset (index) {

            position = 0;
            current  = index;
            prev     = (current === 0) ? last : current - 1;
            next     = (current === last) ? 0 : current + 1;

            framePrev.html($(content.get(prev)).clone()).css({ left: (-width) + 'px' });
            frameCurrent.html($(content.get(current)).clone()).css({ left: '0px' });
            frameNext.html($(content.get(next)).clone()).css({ left: width + 'px' });

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