

    /*

    Tabs Module (progressive enhancement)

    Example usage:

        Html:

            <div>

                <div class="tabs-menu">
                    <div>Tab A</div>
                    <div>Tab B</div>
                    <div>Tab C</div>
                    <div>Tab D</div>
                </div>

                <div class="tabs-content">
                    <div>Content A</div>
                    <div>Content B</div>
                    <div>Content C</div>
                    <div>Content D</div>
                </div>
            </div>

        Js:

            Yellow.tabs('.tabs-menu > *', '.tabs-content > *');

    The first child of .tabs-content will be active on initialisation        

    */

    Yellow.tabs = function (menuSel, contentSel, shiftInterval, evtHandler) {

        "use strict";

        var menu    = $(menuSel),
            content = $(contentSel),
            currIdx = 0;

        if (menu.length < 1 || content.length < 1) return;    

        function activate (index) {
            $(menu.removeClass('active').get(index)).addClass('active');
            $(content.removeClass('active').get(index)).addClass('active');
            if (evtHandler)
                evtHandler.call(this, $(content.get(index)));
        }

        menu.on('click', function (evt) {
            shiftInterval = 0;
            currIdx = $(this).index();
            activate(currIdx);
        });

        var shiftHandler = function() {
            if (menu.eq(currIdx).is(':hidden'))
                currIdx = 0;
            activate(currIdx++);
            if (currIdx >= menu.filter(':visible').length )
                currIdx = 0;
            if (shiftInterval)
                setTimeout(shiftHandler, shiftInterval);
        };
        shiftHandler.apply();
    };

