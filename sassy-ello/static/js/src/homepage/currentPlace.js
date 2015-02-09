

	Yellow.currentPlace = function(defualt_place, handler) {

        "use strict";

        var geocoder = new google.maps.Geocoder();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;
                var position = { lat: lat, lng: lng };
                var latlng = new google.maps.LatLng(position.lat, position.lng);
                if (latlng) {
                    geocoder.geocode({'latLng': latlng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[2]) {
                                var place = results[2].formatted_address;
                                handler.call(this, place);
                            }
                        }
                    });
                } else {
                    handler.call(this, default_place);
                }
            }, function(error) {
                handler.call(this, default_place);
            });
        }
	};
