/*
 * Stacker - A JQuery plugin that stacks DOM elements of the same width vertically 
 * in columns, and fitted to the height of the window or container. DOM elements 
 * are essentially wrapped vertically similar to how text is wrapped horizontally.
 *
 * Note that all elements much be set to position: absolute.
 *
 * Copyright (c) 2013 Jude Osborn
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.0.0
 *
 * Usage:
 *  $('div').stacker({
 *     container: $('#some-container-id'),
 *     position: 'top'
 * });
 *
 * Parameters:
 *  container: A jQuery element to use as the conainer. Window is default.
 *  position: Where the objects are anchored. Either "top" or "bottom".
 *  columnNumbers: If true (default), elements are given a data attribute called
 *      "data-col", that that represents the "column" they have been placed from
 *      left to right.
 *     a data attribute called "data-col".
 *  throttle: The speed at which the positio is updated on resize. Default 300.
 *     This parameter requires Ben Alman's jQuery throttle/debounce plugin, which
 *     is strongly recommended for performance reasons.
 */
(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.stacker = function(options) {
        var elements = this;
        var $container;
        var settings = {
            container: window,
            position: 'bottom',
            columnNumbers: true,
            throttle: 300
        };

        if (options) {
            $.extend(settings, options);
        }

        function update() {
            var left = 0;
            var col = 0;

            // This is the vertical position, which could be either top or bottom, depending on 
            // the "position" option.
            var vertPosition = 0;

            elements.each(function() {
                var $this = $(this);

                // Do not process invisible items.
                if (!$this.is(':visible')) {
                    return;
                }

                var height = $this.outerHeight(true);
                var width = $this.outerWidth(true);

                if (vertPosition + height > $container.height()) {
                    left += width;
                    vertPosition = 0;

                    if (settings.columnNumbers) {
                        col++;
                    }
                }

                // Set a data attribute that represnets the column in which the element is
                // being placed.
                if (settings.columnNumbers) {
                    $this.attr('data-col', col);
                }

                if (settings.position === 'top') {
                    $this.css({'transform' : 'translate3d(' + left + 'px, ' + vertPosition + 'px, 0)'});
                } else {
                    $this.css({'transform' : 'translate3d(' + left + 'px, -' + vertPosition + 'px, 0)'});
                }
                
                vertPosition += height;
            });
        }

        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        // Initial setup.
        elements.each(function() {
            $this = $(this);

            $this.css(settings.position, '0');
            $this.css('position', 'absolute');

        });

        // Supports the jQuery throttle/debounce plugin.
        if ($.throttle && settings.throttle > 0) {
            $window.on('resize', $.throttle(settings.throttle, function(e) {
                return update();
            }));
        } else {
            $window.on('resize', function(e) {
                return update();
            });
        }

        return update();
    };
})(jQuery, window, document);
