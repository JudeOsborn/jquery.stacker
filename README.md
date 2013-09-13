JQuery Stacker
==============

A JQuery plugin that stacks DOM elements of the same width vertically in columns, fitting them tothe height of the window or container. DOM elements are essentially wrapped vertically similar to how text is wrapped horizontally.


Usage
-----

 	$('div').stacker({
 		container: $('#some-id'),
 		position: 'top',
 		throttle: 400
	});

Options
-------

 *  container: A jQuery element to use as the conainer. Window is default.
 *  position: Where the objects are anchored. Either "top" or "bottom".
 *  columNUmbers: If true (default), elements are given a data attribute called "data-col", that that represents the "column" they have been placed from left to right.
 *  throttle: The speed at which the position is updated on resize. Default 300. Requires the [http://benalman.com/code/projects/jquery-throttle-debounce/docs/files/jquery-ba-throttle-debounce-js.html](jquery.ba-throttle-debounce) plug-in. This is *strongly* recommended.


Copyright (c) 2013 Jude Osborn

Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
