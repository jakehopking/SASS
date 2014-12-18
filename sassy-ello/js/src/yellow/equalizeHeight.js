(function () {

    "use strict";


    /*

    Equalize Height Module (progressive enhancement)

    Example usage:

        Html:
            <div class="eq-height-max">
                <div class="eq-item">iwej pfoij wefopij fwe jf</div>
                <div class="eq-item">iip weuh rgiu hwe pgiuhw epiguh wpeiu ghp eiug piwue hgpi ewu rh ipuw hpwerg</div>
                <div class="eq-item">iwejfo iwje fpoi jw ofpij wpog ijeo pirg jepoirgj peoi gjp oeij</div>
            </div>

        Js:
            Yellow.equalizeHeight('.eq-height-max > *', 'max');

    Sets the height of all elements in a selector to that of the shortest or tallest element in the selector.
    Can be called with 'max' or 'min'.
    This is based on calculated height, not css height property.
    Returns new height datum.

    */

    
    Yellow.equalizeHeight = function (selector, minOrMax) {

        var sel = (selector instanceof $) ? selector : $(selector); 
        if (sel.length < 1) return; 

        var heights = sel.map(function (i, el) { return $(el).outerHeight(); }),
            datum   = Math[minOrMax].apply(null, heights);

        sel.outerHeight(datum + 'px');   

        return datum; 
    };




}).call(this);