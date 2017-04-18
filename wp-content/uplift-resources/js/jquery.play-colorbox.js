jQuery(function ($) {

	$(document).ready(function () {

		var viewportWidth = window.innerWidth;  // Get the Browser Width
		var videoWidth = viewportWidth * 0.6;
		var videoHeight = videoWidth * 0.5625;

		$(".uplbtw-lightbox-video").colorbox({iframe:true, innerWidth:766, innerHeight:540, opacity: 0.5});

	});  // Document Ready

});  // EOF