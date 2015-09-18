/*! socialshares buttons | https://socialshar.es/ */

(function(){

	var shareButtons = document.querySelectorAll(".share-btn"),
	    shareUrl;

	if (shareButtons) {
		[].forEach.call(shareButtons, function(button) {
			button.addEventListener("click", function(event) {
				var width  = 650,
				    height = 450;

				event.preventDefault();

				// Set default URLs
				if (this.href == '' || this.href == document.URL) {
					if (this.className.match(/\bshare-btn-twitter\b/)) {
						shareUrl = 'https://twitter.com/share?url='+encodeURIComponent(document.URL)+'&text='+encodeURIComponent(document.title);
					}
					if (this.className.match(/\bshare-btn-facebook\b/)) {
						shareUrl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-googleplus\b/)) {
						shareUrl = 'https://plus.google.com/share?url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-reddit\b/)) {
						shareUrl = 'http://www.reddit.com/submit?url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-tumblr\b/)) {
						shareUrl = 'http://www.tumblr.com/share/link?url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-linkedin\b/)) {
						shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-pinterest\b/)) {
						shareUrl = 'https://www.pinterest.com/pin/create/button/?url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-stumbleupon\b/)) {
						shareUrl = 'http://www.stumbleupon.com/submit?url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-delicious\b/)) {
						shareUrl = 'https://delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-email\b/)) {
						shareUrl = 'mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(document.URL);
					}
					if (this.className.match(/\bshare-btn-more\b/)) {
						shareUrl = 'https://socialshar.es/share.html?url='+encodeURIComponent(document.URL)+'&text='+encodeURIComponent(document.title);
					}
				} else {
					shareUrl = this.href;
				}

				// Dialog
				window.open(shareUrl, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
			});
		});
	}

})();
