/*! Share Buttons | https://github.com/sunnysingh/share-buttons */

if (typeof jQuery === 'undefined') {
  throw new Error('share-buttons.jquery.js requires jQuery. Include jQuery or use the share-buttons.js file instead.');
}

(function($) {

	$(document).ready(function() {
		
		// Launch a popup window when clicking on the share button
		
		$('.share-btn').on('click', function(event) {

			var width = 650,
					height = 450,
					$this = $(this),
					showDialog = ($this.data('shareBtnDialog') != false);

			if (showDialog) {

				event.preventDefault();

				window.open(this.href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));

			}

		});
		
	});

})(jQuery);

