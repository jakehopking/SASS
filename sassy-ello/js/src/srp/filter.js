(function () {
    

    "use strict";

    /*

    SRP Filter bar

    It is just a form that submits when one of its fields are changed.
    The 'clear filter' link contains the search query minus filters.

    */


    Yellow.srpFilter = function (selector) {

        var form = $(selector); if (form.length < 1) return;

        $('select', form).on('change', function (e) {
            form.submit();
        });
    };



}).call(this);