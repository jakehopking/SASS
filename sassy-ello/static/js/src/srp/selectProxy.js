(function () {
    

    "use strict";

    /*

    Select Proxy (progressive enhancement)

    Creates a div proxy of a select tag, allowing greater layout control.

    Example usage:

        Html:
            <select name="my-field" data-label="My field:">
                <option value="" selected="selected">Any</option>
                <option value="other">Other</option>
            </select>

        js:
            Yellow.selectProxy('select');

    */

    var $body = $('body');


    function selectProxy (el) {

        var proxy   = $('<div class="select-proxy"></div>'),
            label   = el.attr('data-label'),
            label   = (label) ? '<label>' + label + '</label>' : '',
            options = [],
            selected,
            open;

        $('option', el).each(function (i) { // get options from existing select

            var optEl   = $(this),
                opt     = { value: optEl.val(), text:  optEl.text() };

            if (optEl.is(':selected')) selected = i;
            options.push(opt);
        });   

        function view () { // current state -> html string
            return [
                '<div class="select-proxy-selected">', 
                    label,
                    '<b>', 
                        options[selected].text,
                        '<i class="fa fa-chevron-', (open) ? 'up' : 'down' ,'"></i>',
                    '</b>',
                '</div>',
                '<div class="select-proxy-options" style="display:', (open) ? 'block' : 'none' ,';">',
                    '<div class="select-proxy-options-inner">',
                        options.map(function (opt, i) {
                            return '<a href="#' + i + '"' + ((i === selected) ? ' class="selected"' : '') + '>' + opt.text + '</a>';
                        }).join(''),
                    '</div>',
                '</div>'
            ].join('');
        }

        function render () { // update dom
            proxy.html(view());
        }

        proxy.on('click', '.select-proxy-selected', function (e) {
            if (!open) {
                e.stopPropagation();
                open = true;
                render();
            }
        });

        proxy.on('click', 'a', function (e) {

            e.preventDefault();
            e.stopPropagation();

            selected    = parseInt($(this).attr('href').slice(1), 10);
            open        = false;
            render();

            el.val(options[selected].value);
            el.trigger('change');
        });

        $body.on('click', function () {
            if (open) {
                open = false;
                render();
            }
        });
 
        el.css('display', 'none').after(proxy);
        render();
    }



    Yellow.selectProxy = function (selector) {

        var sel = $(selector); if (sel.length < 1) return;

        sel.each(function () {
            return selectProxy($(this));
        });
    };



}).call(this);