(function () {

    "use strict";

    /* 

    SRP map

    This map fills the whole screen
    The marker group is offset to the right side
    Markers are numbered with custom labels, using Yellow.mapLabel
    The marker data it uses is extracted from the #map-data element and JSON.parsed

    */


    Yellow.srpMap = function () {

        var id           = 'search-results-map',
            mapContainer = $('#' + id),
            resultsList  = $('.search-results-list'),
            markerData   = Yellow.util.parseData('#srp-map-data');

        var map = Yellow.map(id, {
            panControl:     false,
            mapTypeControl: false,
            zoomControl:    true,
            zoomControlOptions: {
                style:      1, // google.maps.ZoomControlStyle.SMALL,
                position:   3  // google.maps.ControlPosition.TOP_RIGHT
            }
        });

        function placeMarkers () {

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
                            draggable:  true,
                            icon:       '/static/images/map-icon.png'
                        });

                        Yellow.mapLabel(m.map, marker, data);

                        return marker;
                    }
                )
                .centerOnMarkers(from.x - to.x, from.y - to.y, -2);
        }

        map.ready(placeMarkers);

        $(window).on('resize', placeMarkers);

    };

}).call(this);
