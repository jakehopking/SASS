$(function () {
    Yellow.disruptiveAd(5000);

    var initialize = function(place) {
        Yellow.tabs('.tabs-menu li', '.tabs-content .tab-content__item',
        function(index) {
            var cat_name = $('.suggested-business-menu li:eq('+index+')').attr('category-name');
            var url = '/srv/cb/' + Yellow.util.slug(place) + '/' + Yellow.util.slug(cat_name) + '/';
            $.get(url, function(data) {
                $('.suggested-business-content .tab-content__item:eq('+index+')').html(data);
            });
        });

        var url = '/srv/bb/' + Yellow.util.slug(place);
        $.get(url, function(data) {
            $('#banner-business').html(data);
        });
    };

    Yellow.currentPlace('auckland', initialize);
});
