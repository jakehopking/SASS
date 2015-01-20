(function () {

    "use strict";

    function escapeInput (term) {
        return encodeURIComponent(term);
    }

    // To keep matches found from selecting actual values
    Yellow.typeahead_matches = {
        what: null,
        where: null
    };

    Yellow.search = function (formSel) {

        var form        = $(formSel),
            whatBox     = $('input[name="what"]', form),
            whereBox    = $('input[name="where"]', form);
        var taCategories = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 5,
            prefetch: {
                url: '/srv/ta/categories.json',
                filter: function(list) {
                    return $.map(list, function(item) {
                        return { label: item.name, value: item.slug };
                    });
                }
            }
        });
        var taBusinesses = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 5,
            remote: '/srv/ta/?q=%QUERY'
        });

        var taLocations = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: {
                url: '/srv/ta/locations.json',
                filter: function(list) {
                    return $.map(list, function(item) {
                        return { label: item.name, value: item.slug };
                    });
                }
            }

        });

        taCategories.initialize();
        taBusinesses.initialize();
        taLocations.initialize();

        $(whatBox).typeahead({
            highlight: true,
            minLength: 2
        },
        {
            name: 'ta-categories',
            displayKey: 'label',
            source: taCategories.ttAdapter(),
            templates: {
                header: '<h3>Suggested Categories</h3>'
            },
        },
        {
            name: 'ta-businesses',
            displayKey: 'value',
            source: taBusinesses.ttAdapter(),
            templates: {
                header: '<h3>Are you looking for:</h3>'
            }
        });

        $(whereBox).typeahead({
            highlight: true,
            minLength: 2
        },
        {
            name: 'ta-locations',
            displayKey: 'label',
            source: taLocations.ttAdapter(),
        });

        $(whatBox).on('typeahead:autocompleted typeahead:selected', function(event, value) {
            Yellow.typeahead_matches.what = value;
        });

        $(whereBox).on('typeahead:autocompleted typeahead:selected', function(event, value) {
            Yellow.typeahead_matches.where = value;
        });

        form.on('submit', function (e) {
            e.preventDefault();

            var what = escapeInput(whatBox.val());
            var where = escapeInput(whereBox.val());
            if (Yellow.typeahead_matches.what != null) {
                if (what === Yellow.typeahead_matches.what.label) {
                    // The user selected a value from the dropdown, which 
                    // and it valid (ie. text value is identical to the value) so
                    // it means we can use a slug
                    what = Yellow.typeahead_matches.what.value; 
                }
            }
            if (Yellow.typeahead_matches.where != null) {
                if (where === Yellow.typeahead_matches.where.label) {
                    // The user selected a value from the dropdown, which 
                    // and it valid (ie. text value is identical to the value) so
                    // it means we can use a slug
                    where = Yellow.typeahead_matches.where.value; 
                }
            }

            if (where === "current-location") {
                execute_geo_search(what, Yellow.geoPosition.coords);
            } else {
                execute_place_search(what, where);
            }
        });

        function execute_place_search(what, where) {
            if (where === "") {
                where = escapeInput("New Zealand");
            }
            var searchUrl = Yellow.baseUrl + where + "/" + what + "/";
            window.location = searchUrl;
        }

        function execute_geo_search(what, coords) {
            if (typeof coords != 'undefined') {
                var params = $.param({what: what, lat: coords.latitude, lng:coords.longitude });
                var searchUrl = Yellow.baseUrl +  "search/?" + params;
                window.location = searchUrl;
            }
        }
    };

}).call(this);


