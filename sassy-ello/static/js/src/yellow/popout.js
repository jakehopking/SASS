

    /*

    Popout Module (progressive enhancement)

    Example usage:

        Html:
            <div class="popout-link">
                popout
            </div>

            <div class="popout-content">
                content
            </div>

        Js:

            Yellow.popout({

                el: {
                    open:       '.popout-link',
                    content:    '.popout-content'
                },

                transition: { // optional overrides
                    open: function (content) {
                        content.addClass('open');
                    },
                    close: function (content) {
                        content.removeClass('open');
                    }
                }
            });
    */


    

    
    Yellow.popout = function (options) {

        "use strict";

        var $body       = $('body'),
            el          = options.el,
            link        = $(el.open),
            content     = $(el.content),
            close       = el.close && $(el.close),
            speed       = options.speed || 50,
            trans       = options.transition || {},
            open;

        if (link.length < 1 && content.link < 1) return;
        
        function opener (e) {
            if (!open) {
                e.stopPropagation();
                if (trans.open) {
                    trans.open(content, speed);

                } else {
                    content.fadeIn(speed);
                }
                open = true;
            }
        }

        function closer () {
            if (open) {
                if (trans.close) {
                    trans.close(content,speed);

                } else {
                    content.fadeOut(speed);
                }
                open = false;
            }
        } 

        function stopper (e) {
            e.stopPropagation();
        }    

        content.on('click', stopper); 
        link.on('click', opener);
        $body.on('click', closer);
        if (close) close.on('click', closer);
    };

