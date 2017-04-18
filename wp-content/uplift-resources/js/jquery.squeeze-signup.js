jQuery(function ($) {

	$(document).ready(function () {

	});

	/*
   	 * Checks the status of the return from MailChimp and output it to the page.
	 * @param object mcStatus
	 */
   	function outputSignupStatus(mcStatus) {

   		var subscribeSuccess = mcStatus['success'];
   		var subscribeExists = mcStatus['exists'];
   		var subscribeUpdate = mcStatus['update'];
   		var subscribeError = mcStatus['error'];
   		var subscribeMessage = mcStatus['message'];
   		var subscribeEmail = mcStatus['email'];
   		var subscribeRedirectURI = mcStatus['redirectURI'];
   		var subscribeRedirectPageTitle = mcStatus['redirectPageTitle'];
   		var subscribeMsgText;
   		var viewportWidth = window.innerWidth;

   		if (subscribeSuccess == 'true') {

			// Ouput the messsage to the form
		  	$('.uplbtw-squeeze-mc-error').remove();
		  	$('[id^=uplbtw-mc-subscribe-]').hide();
		  	subscribeMsgText = "<div id='uplbtw-squeeze-success-container'><p class='uplbtw-squeeze-mc-success'>" + subscribeMessage + " You are now being redirected to the Bless The Water Video page...</p></div>";
		  	$('[id^=uplbtw-email-signup-container]').append(subscribeMsgText);
		  	$('#wrapper-wyy56b3f8805937a').css({"padding-bottom":"0"});
		  	$('#wrapper-wp356c69c9903292').css({"padding":"0"});

		  	// Set the cookie
		  	Cookies.set('uplbtw_regsiter', btoa('subscribed:true;email:' + mcStatus['email']) + ';', { expires: 731 });
		   	setTimeout("window.location.href='http://blesswaterlocal/" + subscribeRedirectURI + "';", 3000)

		} else {

			$('.uplbtw-squeeze-mc-error').remove();

			if (viewportWidth >= 750) { 
				$('#uplbtw-signup-form-all').css({"margin-top" : "35px"}) 
			} else {
				$('#wrapper-wyy56b3f8805937a').css({"padding-bottom" : "30px"});
			}
			
			subscribeMsgText = "<p class='uplbtw-squeeze-mc-error'>" + subscribeMessage + "</p>";
			$('#uplbtw-email-signup-container-1').append(subscribeMsgText);
			$('#uplbtw-email-signup-container-2').append(subscribeMsgText);

	  } // Subscribe Success 

  } // END Formunction outputSignupSattus

  	/*
  	 * Toggles the submit button on & off for the given form. Also displays / hides the loading gif
  	 * @param string formNumber
  	 * @param bool enableFlag)
   	*/
   	function toggleButton(formNumber, enableFlag) {

   		if (!enableFlag) {

   			$('#uplbtw-mc-subscribe-' + formNumber + ' img').css('visibility', 'visible');
   			$('#uplbtw-mc-subscribe-button-' + formNumber)
   				.attr('disabled', true)
   				.attr('style', 'background-color: #ccc !important');

   		} else {

   			$('#uplbtw-mc-subscribe-' + formNumber + ' img').css('visibility', 'hidden');
   			$('#uplbtw-mc-subscribe-button-' + formNumber)
   				.attr('disabled', false)
   				.attr('style', 'background-color: #ff32af !important');

   		}

   }


	// Form Validation for the top signup form. We cannot combine this into one function as only one of the forms is to be validated, not all of them.
	$("#uplbtw-mc-subscribe-1").validate({

		ignore: ".email",
		submitHandler: function(form) {
			
			// Grey the submit button ot and show th wait gif
			toggleButton('1', false);
			$(form).ajaxSubmit({

				type: 'POST',
				url: '/wp-content/uplift-resources/mc3-signup/processMCForm.php',
				dataTyoe: 'json',
				data: $(form).serialize(), 
				success: function(data) {

					//alert(data);
					outputSignupStatus($.parseJSON(data));
					toggleButton('1', true);

				}  // Success Handler

			});  // AJAX Call
			
		} // Submit Handler
		
	}); // Form Validate


	// Form Validation for the top signup form. We cannot combine this into one function as only one of the forms is to be validated, not all of them.
	$("#uplbtw-mc-subscribe-2").validate({

		ignore: ".email",
		submitHandler: function(form) {

			// Grey the submit button ot and show th wait gif
			toggleButton('2', false);
			$(form).ajaxSubmit({

				type: 'POST',
				url: '/wp-content/uplift-resources/mc3-signup/processMCForm.php',
				dataTyoe: 'json',
				data: $(form).serialize(), 
				success: function(data) {

				   //alert(data);
				   outputSignupStatus($.parseJSON(data));
				   toggleButton('2', true);

				}  // Success Handler

			});  // AJAX Call
			
		} // Submit Handler
		
	}); // Form Validate

});  // EOF
