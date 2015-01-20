(function () {
    

    "use strict";

    /*

    Carousel Module (progressive enhancement)

    Example usage:

        Html:

        <div class="carousel">
            <div class="carousel-content">
                <div class="carousel-inner">
                    <div class="carousel-item"><img src="/static/images/home-featured-business-01.jpg"></div>
                    <div class="carousel-item"><img src="/static/images/home-featured-business-02.jpg"></div>
                    <div class="carousel-item"><img src="/static/images/home-featured-business-03.jpg"></div>
                    <div class="carousel-item"><img src="/static/images/home-featured-business-04.jpg"></div>
                </div>
            </div>
            <div class="carousel-nav">
                <a href="#left"><i class="fa fa-chevron-left"></i></a>
                <a href="#right"><i class="fa fa-chevron-right"></i></a>
            </div>
            <div class="carousel-expanded-item"></div>
        </div>

        Js:
            Yellow.carousel('.carousel', { showItems: 3 });

    */


    function carousel (sel, options) {

        var showItems   = options.showItems || 3,
            content     = $('.carousel-content', sel),
            inner       = $('.carousel-inner', sel),
            items       = $('.carousel-item', sel),
            nav         = $('.carousel-nav a', sel),
            expanded    = $('.carousel-expanded-item', sel),
            width       = items.length / showItems * 100,
            startX,
            startScrollLeft,
            widthpx,
            distpx,
            maxScrollLeft;


        inner.css('width', width + '%');  


        function init () {

            widthpx         = content.width();
            distpx          = widthpx / showItems;
            maxScrollLeft   = widthpx - distpx;
        }


        function setNavVisibility (scrollLeft) {

            nav.css('opacity', 1);
            if (scrollLeft <= 5) $(nav.get(0)).css('opacity', 0.3);
            if (scrollLeft >= (maxScrollLeft - 5)) $(nav.get(1)).css('opacity', 0.3);
        }    
    

        // Arrow clicks scroll by the width of one item 

        nav.on('click', function (e) {

            e.preventDefault();

            var dir                 = $(this).attr('href'),
                scrollLeftCurrent   = content.scrollLeft(),
                scrollLeftTo        = ((dir === '#left') ?
                    ((scrollLeftCurrent - distpx < 0) ? 0 : scrollLeftCurrent - distpx) :
                    ((scrollLeftCurrent + distpx >= widthpx) ? widthpx : scrollLeftCurrent + distpx));

            content.animate({ scrollLeft: scrollLeftTo }, 500);
            setNavVisibility(scrollLeftTo);
        });


        // Swipe to scroll on mobile, while not showing scrollbars

        content.on({

            touchstart: function (e) {

                startX = e.originalEvent.changedTouches[0].pageX;
                startScrollLeft = content.scrollLeft();
            },

            touchmove: function (e) { 

                var destX = e.originalEvent.changedTouches[0].pageX;
                content.scrollLeft(startScrollLeft - (destX - startX));
            },

            touchend: function (e) {
                setNavVisibility(content.scrollLeft());
            }
        });


        // expand an item on click, removing any present one

        items.on('click', function () {

            var item    = $(this),
                vidsrc  = item.attr('data-video-src');    

            expanded
                .slideUp(1)
                .html((vidsrc) ? [closeHtml, videoHtml(vidsrc)] : [closeHtml, item.html()])
                .slideDown(500);
        });


        expanded.on('click', '.close', function () {
            expanded.slideUp(500);
        });


        $(window).on('resize', init); // correct scroll sizing on resize


        init();
        setNavVisibility(0);
    }


    var closeHtml = '<div class="close"><i class="fa fa-times"></i></div>';


    function videoHtml (src) {

        return [
            '<div class="embed-container">',
                '<iframe src="', src, '" frameborder="0" allowfullscreen></iframe>',
            '</div>'
        ].join('');
    }


    Yellow.carousel = function (selector, options) {

        var sel = (selector instanceof $) ? selector : $(selector); 
        if (sel.length < 1) return;

        sel.each(function () {
            carousel($(this), options);
        });
    };


}).call(this);