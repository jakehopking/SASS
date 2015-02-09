

	
	Yellow.submitReview = function () {

		"use strict";

		var form 	= $('.dlp-review-form'),
			submit  = $('.dlp-review-submit'),
			verb    = $('span', submit);

		function disable () { 
            submit.attr({ disabled: true });
            verb.text('Sending');
        }

        function enable () {
            submit.attr({ disabled: false });
            verb.text('Post');
        }    

        function update (percent) {
            verb.text('Sending: ' + percent + '%');
        } 

        function success (response, xhr) { 
        	Yellow.notify('Thank you, your review was received');
        	enable();
		} 

		function fail (response, xhr) { 
			Yellow.notify('Review submission failed');
			enable();
		} 

		Yellow.upload({
			form:     form,
			fallback: 'iframe',
			success:  success,
			progress: update, 
			error:    fail,
			submit:   disable
		});

	};
