$(function () {

    "use strict";

    Yellow.disruptiveAd(5000);
    Yellow.tabs('.tabs-menu li', '.tabs-content .tab-content__item', 5000, function(item) {
        $('.suggested-business-content .see-all a').attr('href', item.find('.view-all-link').val());
    });

    var initialize = function(place) {
        var url = '/srv/bb/' + Yellow.util.slug(place);
        $.get(url, function(data) {
            $('#banner-business').html(data);
        });

        $('.suggested-business-content .tab-content__item').each(function(idx) {
            var item = $(this);
            if (item.find('i.fa-spin')) {
                var catName = $('.suggested-business-menu li:eq('+idx+')').attr('category-name');
                var slugUrl = Yellow.util.slug(place) + '/' + Yellow.util.slug(catName) + '/';
                var url = '/srv/cb/' + slugUrl;
                $.get(url, function(data) {
                    item.html(data);
                });
            }
        });

    };

    initialize($('#location-by-ip').val());
    //Yellow.currentPlace('auckland', initialize);
});
