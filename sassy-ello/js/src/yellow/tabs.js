(function () {

    "use strict";

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

            Yellow.tabs('.tabs');

    The first child of .tabs-content will be active on initialisation        

    */

    Yellow.tabs = function (menuSel, contentSel) {

        var menu    = $(menuSel),
            content = $(contentSel);

        if (menu.length < 1 || content.length < 1) return;    

        function activate (index) {
            $(menu.removeClass('active').get(index)).addClass('active');
            $(content.removeClass('active').get(index)).addClass('active');
        }

        menu.on('click', function (evt) {
            activate($(this).index());
        });

        activate(0);
    };


}).call(this);