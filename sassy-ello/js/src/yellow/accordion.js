(function () {

    "use strict";


    /*

    Accordion Module (progressive enhancement)

    Example usage:

        Html:
            <div class="accordion">
                <div class="accordion-part">
                    <div class="accordion-head">
                        Section A link
                    </div>
                    <div class="accordion-body">
                        Section A body
                    </div>
                </div>
                <div class="accordion-part">
                    <div class="accordion-head">
                        Section B link
                    </div>
                    <div class="accordion-body">
                        Section B body
                    </div>
                </div>
                <div class="accordion-part">
                    <div class="accordion-head">
                        Section C link
                    </div>
                    <div class="accordion-body">
                        Section C body
                    </div>
                </div>
            </div>

        Js:

            Yellow.accordion('.accordion');
    */


    
    Yellow.accordion = function (selector, speed) {

        var sel = $(selector); if (sel.length < 1) return;

        var heads   = $('.accordion-head', sel),
            bodies  = $('.accordion-body', sel),
            speed   = speed || 200;

        heads.on('click', function () {
            $(this).next('.accordion-body').toggle();
			$(this).toggleClass('active');
        });

    };


}).call(this);