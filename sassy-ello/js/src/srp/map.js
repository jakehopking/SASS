(function () {

    "use strict";

    /* 

    SRP map
    
    Only shows in desktop
    The map height is window height - y offset - footer height
    The marker group is offset to the right side
    Markers are numbered with custom labels, using Yellow.mapLabel
    The marker data it uses is extracted from the #map-data element and is JSON.parsed

    */
    

    Yellow.srpMap = function () {

        var $window = $(window);

        if ($window.outerWidth() < 1020) return;

        var id                  = 'search-results-map',
            mapContainer        = $('#' + id),
            mapContainerAnchor  = $('#' + id + '-anchor'),
            resultsContainer    = $('.search-results-container'),
            resultsList         = $('.search-results-list'),
            footer              = $('footer'),
            markerData          = Yellow.util.parseData('#srp-map-data'),
            $html               = $('html, body');

        if (!markerData) return;  

        var map = Yellow.map(id, {
            panControl:     false,
            mapTypeControl: false,
            zoomControl:    true,
            scrollwheel: false,
            zoomControlOptions: {
                style:      1, // google.maps.ZoomControlStyle.SMALL,
                position:   3  // google.maps.ControlPosition.TOP_RIGHT
            }
        });


        function mapHeight () {

            if ($window.width() > 1023) {
                mapContainer.height($window.height());
                footer.css({ position: "fixed", bottom: "0", width: "100%", "z-index": 9999 });
                resultsContainer.css({ "margin-bottom": "65px" });

            } else {
                mapContainer.height(0);
                footer.removeAttr("style");
                resultsContainer.removeAttr("style");
            }
        }


        function mapRelocate () {

            if ($window.scrollTop() > mapContainerAnchor.offset().top) {
                mapContainer.addClass('stick');
            } else {
                mapContainer.removeClass('stick');
            }
        }


        function placeMarkers () {

            mapHeight();

            var from = Yellow.util.getCentre(mapContainer),
                offs = resultsList.offset(),
                to   = { x: offs.left + resultsList.width() + 250, y: offs.top + 250 };

            if (map) map
                .clearMarkers()
                .setMarkers(

                    markerData, 

                    function numberedMarker (data, latLng) {

                        var m = this;

                        var marker = new google.maps.Marker({
                            position:   latLng,
                            map:        m.map,
                            draggable:  false,
                            icon:       '/static/images/map-icon.png'
                        });

                        Yellow.mapLabel(m.map, marker, data);

                        google.maps.event.addListener(marker, 'click', function () {
                            $html.animate({
                                scrollTop: $('.search-results__item:nth-child(' + data.index + ')').offset().top
                            }, 200);
                        });

                        return marker;
                    }
                )
                .centerOnMarkers(from.x - to.x, from.y - to.y, -2);
        }


        mapHeight();

        map.ready(placeMarkers);

        $window.on({
            resize: placeMarkers,
            scroll: mapRelocate
        });

    };

}).call(this);
