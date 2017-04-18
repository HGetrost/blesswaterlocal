jQuery(function ($) {

	// stop scrolling on page load due to Unofy Map doing silly things
	$('html, body').css({
	    'overflow': 'auto',
    	'height': 'auto'
	});

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);

});
