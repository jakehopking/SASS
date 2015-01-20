$(function () {

    "use strict";

    // Get the base app data

    $.extend(Yellow, Yellow.util.parseData('#app-data'));

    // If any notification or error in the base data, trigger a notification bar

    if (Yellow.notificationMessage) Yellow.notify(Yellow.notificationMessage);
    if (Yellow.errorMessage)        Yellow.notify(Yellow.errorMessage, 'error');

    // bind search button and inputs

    Yellow.search('#searchbox');

    // Activate the mobile menu

    Yellow.popout({

        el: {
            open:       '.header-menu',
            content:    '.mobile-menu',
            close:      '.mobile-menu--close'
        },

        transition: {
            open: function (content) {
                content.addClass('open');
            },
            close: function (content) {
                content.removeClass('open');
            }
        }
    });



    // Reveal 'where' and submit button when 'what' is focused on in mobile

    $("input[name='what']").one('focus', function () {
        $('.header-search__where-and-button').removeClass('hide-me--portable');
    });





});
