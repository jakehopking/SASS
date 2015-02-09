$(function () {


	var $window = $(window);


    Yellow.selectProxy('.srp-filter-bar select');

    Yellow.srpFilter('#search-filter');

    Yellow.srpMap();


	// desktop-specific ui functionality

	function fixResultHeights () {

		var width = $window.outerWidth();

		if (width >= 768) { // Aesthetic height mods for above tablet portrait
			
		    $('.search-results__item').each(function () {
				var result = $(this);
				Yellow.equalizeHeight($('.business-score .review-score, .business-content', result), 'max');
				Yellow.equalizeHeight($('.business-score .business-thumbnail a, .business-content', result), 'max');
			});

		} 

		if (width < 768) { // Aesthetic height mods for above tablet portrait
			
		    $('.search-results__item--no-image').each(function () {
				var result = $(this);
				Yellow.equalizeHeight($('.business-score .review-score, .business-content', result), 'max');
			});

		} 
		
	}

	fixResultHeights();

	$window.on('resize', fixResultHeights);
    

	$('.cta__phone-us').on('click', function (e) {
		if ($window.outerWidth() < 768) return true;
		e.preventDefault();
		var el = $(this);
		el.siblings('.phone-us-number').removeClass('hide-me').text(el.attr('href').slice(4));
	});


});
