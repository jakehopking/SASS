
	/* 

	Disruptive ad loader / dismisser 

	The disruptive ad may be in the page html at load time.
	It has a 'data-created' attribute, which is a date/time in milliseconds e.g: 1421802716132

	If the user dismisses the ad, we save the time of dismissal as a date/time in milliseconds in their window.localStorage.

	If the dismissal time is < the ad creation time, we show the ad.

	*/

	Yellow.disruptiveAd = function (delay) {

		"use strict";

		var ad = $('.disruptive-advert');
		if (ad.length < 1) return;

		var dismissed = parseInt(localStorage.dismissed || 0, 10),
			adCreated = parseInt(ad.attr('data-created'), 10);

		if (dismissed >= adCreated) return;

		setTimeout(function () {
			ad.slideDown(200);
		}, delay);

		$('.close-panel', ad).on('click', function () {
			localStorage.dismissed = new Date().valueOf();
			ad.slideUp(200);
		});
	};

