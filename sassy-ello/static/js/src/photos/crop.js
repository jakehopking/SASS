
    /*

    Image cropper

    Requires jcrop
    Generates a hidden form field named 'crop' next to the image 
    the crop values are passed in the form:

    "{c.x}_{c.y}_{c.x2}_{c.y2}_{c.w}_{c.h}"

    e.g:

    "72_72_202_202_130_130"

    So assuming the image is in a <form>, the crop values will be submitted when that form is

    Usage:

        Html:
            <img src="some-image.jpg" alt="Some image" class="some-image">

        Js:
            Yellow.crop('.some-image');    
    */


    Yellow.crop = function (selector, aspectRatio) {

        "use strict";

        var image = $(selector); if (image.length < 1) return;

        var field = $('<input type="hidden" name="crop" value="">');

        function updateCoords (c) {
            field.val([c.x, c.y, c.x2, c.y2, c.w, c.h].join('_'));
        }

        image.after(field);

        image.Jcrop({
            onChange:    updateCoords,
            onSelect:    updateCoords,
            aspectRatio: aspectRatio || 1, // 1 is square
            setSelect:   [ 100, 100, 50, 50 ] // initial selection
        });
    };
 	 
