$(function () {

    "use strict";


    // Tabs

    var place       = $('#location-by-ip').val(),
        placeSlug   = Yellow.util.slug(place);

    function setViewAllLink () {
        $('.suggested-business-content .see-all a').attr('href',
            $('.suggested-business-content .tab-content__item.active .view-all-link').val());
    }

    Yellow.tabs('.tabs-menu li', '.tabs-content .tab-content__item', 5000, setViewAllLink);

    // Get tabs content
    // Desirable optimisation todo - get json from a combined ajax call to multiple categories
    // and render in a template browserside
    $('.suggested-business-content .tab-content__item').each(function (idx) {

        var item = $(this);

        if (item.find('i.fa-spin')) {

            var catName = $('.suggested-business-menu li:eq('+idx+')').attr('category-name');
            var slugUrl = placeSlug + '/' + Yellow.util.slug(catName) + '/';
        
            $.get('/srv/cb/' + slugUrl, function (data) {
                item.html(data);
                if ($('.suggested-business-content .see-all a').attr('href') === '#') setViewAllLink();
            });
        }
    });

    

    // Get business banner content
    $.get('/srv/bb/' + placeSlug, function (data) {
        $('#banner-business').html(data);
    });

    // Some homepage fun
    var homePageAssets = function() {
        var $searchWhatField = $("#yellow-search-term")
        $searchWhatField.on('input', function() {
            if ($(this).val() == 'Spin me') {
                $('body *').addClass('fa-spin');
            }
            if ($(this).val() == 'Flip me') {
                $('body *').addClass('fa-rotate-180');
            }
            if ($(this).val() == 'Reset me') {
                $('body *').removeClass("fa-spin fa-rotate-180");
            }
            if ($(this).val() == 'The Pink Pages') {
                $('header').css({
                    'background-color': '#ff7bb0'
                });
                $('body').css({
                    'background-color': 'pink'
                });
                $('body .section-colour-alt').css({
                    'background-color': '#ff7bb0'
                });
                $('body .section-hero-image').css('background-image', 'url(http://mezhopking.com/development/the-yellow-team-pink.jpg)');
                $('body .section-hero-image').animate({
                    height: 600
                    }, 2000, function() {
                    // Animation complete.
                });
            }
            if ($(this).val() == 'Two-fingered salute!') {
                $('.yellow-logo--header').hide('slow', function() {
                    $(this).attr({src: '/static/images/yolFingers.png'}).css('width', '40px');
                    $(this).show('slow', function() {
                        $(this).css({
                            transition: 'all 0.2s ease-in-out',
                            transform: 'rotate(180deg)',
                            'margin-top': '-4px' //,
                            // float: 'right'
                        });
                    });
                });
            }
            if ($(this).val() == 'The Yellow Team') {
                $('body .section-hero-image').css('background-image', 'url(http://mezhopking.com/development/the-yellow-team.jpg)');
                $('body .section-hero-image').animate({
                    height: 600
                    }, 2000, function() {
                    // Animation complete.
                });
            }
        })
    }
    
    homePageAssets();
    Yellow.disruptiveAd(5000);

});
