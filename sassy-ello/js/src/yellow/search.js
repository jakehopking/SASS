(function () {

    "use strict";

    function escapeInput (term) {
        return encodeURIComponent(term);
    }


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
                        return { value: item };
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
                        return { value: item };
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
            displayKey: 'value',
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
            displayKey: 'value',
            source: taLocations.ttAdapter(),
        });

        form.on('submit', function (e) {
            e.preventDefault();
            var what = escapeInput(whatBox.val());
            var where = escapeInput(whereBox.val());
            if (where === "") {
                where = escapeInput("New Zealand");
            }
            var searchUrl = Yellow.baseUrl + where + "/" + what + "/";
            window.location = searchUrl;
        });

    };

}).call(this);


