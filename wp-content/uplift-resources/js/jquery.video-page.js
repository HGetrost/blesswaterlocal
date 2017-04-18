jQuery(function ($) {

	// Start the countdown timer.
	function playCountdown() {

		// Make the timer consistent across ALL time zones.
		var currentTime = new Date();
		var GMTOffset = -currentTime.getTimezoneOffset() / 60; // This is OUR GMT offset as calculated by our browser
		var hoursToOffset = 8 + GMTOffset;  // PST is GMT-8, so get the ofset from PST
		var PSTEndTime = new Date("March 19, 2016 17:00:00"); // End time in PST
		var endTimeSec = PSTEndTime.setHours(PSTEndTime.getHours()+hoursToOffset);
		var endTime = new Date(endTimeSec); // Yay, our end time for our time zone!

		// Render & start the timer
		$('.countdown').countdown({
        	date: endTime,
	    	render: function(data) {
            	$(this.el).html("<span style='color: red; padding: 0;'>LIVE in: </span><div><div class='rotate'>days</div><span style='margin-left: -2px;'>" + this.leadingZeros(data.days, 2) + "</span></div><div><div class='rotate'>hrs</div><span>" + this.leadingZeros(data.hours, 2) + "</span></div><div><div class='rotate'>min</div><span>" + this.leadingZeros(data.min, 2) + "</span></div><div><div class='rotate'>sec</div><span>" + this.leadingZeros(data.sec, 2) + "</span></div>");
          	}

    	});

	}

	playCountdown();

	$(document).ready(function () {

	    setTimeout(function() {
	      window.scrollTo(0, 0);
	    }, 2000);

      	// Make the image maps responsive
      	$('map').imageMapResize();

	});

	// Safari fires document.ready too early, this is to fix the safari problem
	//$(window).on('beforeunload', function(){
  	//	$(window).scrollTop(0);
	//});

});
