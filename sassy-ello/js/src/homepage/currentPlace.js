(function () {
	
	"use strict";

    var geocoder = new google.maps.Geocoder();

    function currentPosition() {
        var position = { lat: -36.840, lng: 174.740 };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                var lat = pos.coords.latitude;
                var lng = pos.coords.longitude;
                position = { lat: lat, lng: lng };
            });
        }
        return position;
    }


	Yellow.currentPlace = function(defualt_place, handler) {

        var pos = currentPosition();
        var latlng = new google.maps.LatLng(pos.lat, pos.lng);
       
        if (latlng) {
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var place = results[1].formatted_address;
                        handler.call(this, place);
                    }
                }
            });
        } else {
            handler.call(this, default_place);
        }
	};

}).call(this);
