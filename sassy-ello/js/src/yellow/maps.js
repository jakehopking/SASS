(function () {

    "use strict";

    /*

    General google maps wrapper and helper functions

    Example usage:

        Yellow.map('map-element-id', options);

        Yellow.mapLabel(map, marker, data);

    */


    if (typeof google === 'undefined') throw new Error('Yellow.map depends on google maps, which is not in scope');


    function Label (map, marker, data) {
    
        this.setValues({ map: map });
        this._div = $('<div class="map-marker"><span>' + data.index + '</span></div>');

        this.bindTo('position', marker, 'position');
        this.bindTo('text', marker, 'position');
    }


    Label.prototype = new google.maps.OverlayView();


    Label.prototype.onAdd = function() {

        this.getPanes().overlayLayer.appendChild(this._div.get(0));

        this._listeners = [
            google.maps.event.addListener(this, 'position_changed', this.draw),
            google.maps.event.addListener(this, 'text_changed', this.draw)
        ];
    };


    Label.prototype.onRemove = function() {

        this._div.remove();
        this._listeners.forEach(google.maps.event.removeListener);
    };


    Label.prototype.draw = function() {

        var posn = this.getProjection().fromLatLngToDivPixel(this.get('position'));

        if (!this.overlay) this.overlay = $(this.getPanes().overlayLayer).css({ 'z-index': 200 });

        this._div
            .css({
                left:       posn.x + 'px', 
                top:        posn.y + 'px',
                display:    'block'
            });
    };


    function Map (el, options) {

        this.options = $.extend({ 
            center: { lat: -36.840, lng: 174.740 },
            zoom: 8 
        }, options);

        this.map        = new google.maps.Map(el, this.options);
        this.bounds     = new google.maps.LatLngBounds();
        this.markers    = [];

        return this;
    }


    Map.prototype = {

        ready: function (cback) {

            var m = this;

            google.maps.event.addListenerOnce(m.map, 'idle', function () {
                cback.call(m);
            });
        },

        clearMarkers: function () {

            this.markers.forEach(function (m) {
                m.setMap(null);
            });

            this.bounds = new google.maps.LatLngBounds();

            return this;
        },

        addMarker: function (data, markerMaker) {

            var m      = this,
                latLng = new google.maps.LatLng(data.lat, data.lng);

            var marker = (markerMaker) ? markerMaker.call(m, data, latLng) : new google.maps.Marker({
                position:   latLng,
                map:        m.map
            });

            m.bounds.extend(latLng);
            m.markers.push(marker);

            return this;
        },

        setMarkers: function (markers, markerMaker) {

            var m = this;

            markers.forEach(function (marker, i) {
                m.addMarker(marker, markerMaker);
            });

            return this;
        },

        centerOnMarkers: function (shiftByX, shiftByY, offsetZ) {

            this.map.fitBounds(this.bounds);
            this.map.setCenter(this.bounds.getCenter());

            if (offsetZ) this.map.setZoom(this.map.getZoom() + offsetZ);
            if (shiftByX || shiftByY) this.map.panBy(shiftByX || 0, shiftByY || 0);

            return this;
        }
    };


    Yellow.map = function (id, options) {
        var el = document.getElementById(id); 
        if (!el) return;
        return new Map(el, options);
    };



    Yellow.mapLabel = function (map, marker, data) {
        return new Label(map, marker, data);
    };



}).call(this);
