$(function () { 


    "use strict";


    /*

    Notification bar

    Example usage:

        Js:
            Yellow.notify('Logged in');
            Yellow.notify('Something went wrong', 'error'); // adds 'error' as an extra class

    Closes on click and after a delay;        

    */


    var notifBar = $('#notification-bar'),
        delay    = 5000,
        speed    = 500;



    Yellow.notify = function (message, extraClass) {

        var content = $('<div class="notification-message ' + extraClass + '">' +
                            '<b>' + message + '</b>' +
                            '<i class="fa fa-times-circle"></i>' +
                        '</div>');

        function close () {
            content.slideUp(speed, function () {
                notifBar.html('');
            });
        }

        notifBar
            .html(content.slideDown(speed))
            .on('click', close);

        setTimeout(close, delay);    
    };


});