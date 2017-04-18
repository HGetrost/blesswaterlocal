jQuery(function ($) {

	// Scroll to the top of the page, then stop scrolling on page load due to Unofy Map doing silly things
	function stopScroll() {	

		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 1);

		$('html, body').css({
			'overflow': 'hidden',
			'height': '100%'
		});

	}

	stopScroll();

});
