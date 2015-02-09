$(function () {

    "use strict";


    /*

    Ajax button


    Example usage:

        Html:

            <a class="ajax-button" href="#/listing/listing_id/unsave" data-require-login="Please login to save a listing">
                <i class="fa fa-times"></i>
                <span>Saved</span>
            </a>

        Js:
            Yellow.ajaxButton('.ajax-button');    


    - It does an ajax request to the url in its 'href' (less any '#')
    - If the link has 'data-requires-login' attribute, the action will be prevented, and the message will be used in a login prompt.
    - The button state updates based on what json is returned from the ajax call, e.g:

        POST /listing/12345/save =>

        {
            "label":    "Save",
            "icon":     "fa fa-times",
            "action":   "/listing/12345/unsave",
            "message":  "Listing saved"
        }

    - "message", if present, will be notified in the ui    
    - if an error is received in the ajax reponse, the ui will show it    
    

    */


    function ajaxButton (el, success) {

        el.on('click', function (e) {

            e.preventDefault();

            var sel = $(this),
                action              = sel.attr('href').replace('#', ''),
                requireLoginMessage = sel.attr('data-require-login'),
                iconEl              = $('i', sel),
                labelEl             = $('span', sel);

            if (requireLoginMessage && !Yellow.user) return Yellow.promptLogin(requireLoginMessage); 

            $.ajax({

                url:        action,
                method:     'POST',
                dataType:   'json',
                headers:    { 'X-CSRFToken': Yellow.csrf },

                success: function (data) {

                    if (success) return success(data, sel, iconEl, labelEl);

                    if (data.icon && iconEl)    iconEl.attr('class', data.icon);
                    if (data.label && labelEl)  labelEl.text(data.label);
                    if (data.message)           Yellow.notify(data.message);
                },

                error: function (xhr, textStatus, errMessage) {

                    Yellow.notify(errMessage || 'Error', 'error');
                } 
            }); 
        });    
    }


    Yellow.ajaxButton = function (selector, success) {

        var sel = $(selector); if (sel.length < 1) return;
        ajaxButton(sel, success); 
    };


});
