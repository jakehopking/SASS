(function () {

    "use strict";


    /*

    Utility functions

    Any misc stuff that doesn't belong anywhere else can go here.

    */


    var slice = Array.prototype.slice;


    Yellow.util = { 

        // $ -> { x: pixels, y: pixels }
        // returns the offset centre of a jQuery element

        getCentre: function (el) { 

            var o   = el.offset(),
                w   = el.outerWidth(),
                h   = el.height();

            return { 
                x: o.left + (w / 2), 
                y: o.top  + (h / 2) 
            };    
        },


        // Loads json data from <code> tag in the html

        parseData: function (selector) {

            try {
                return JSON.parse($(selector).text());

            } catch (e) {
                return false;
            }
        },

        slug: function(str) {
            return $.trim(str)
                .replace(/[^a-z0-9-]/gi, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
                .toLowerCase();
        }

    };


}).call(this);
