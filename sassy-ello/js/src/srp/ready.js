$(function () {

    Yellow.selectProxy('.srp-filter-bar select');

    Yellow.srpFilter('#search-filter');

    if ($(window).outerWidth() >= 768) { // Aesthetic height mods for above tablet portrait
	    $('.search-results__item').each(function () {
			var result = $(this);
			Yellow.equalizeHeight($('.business-score .review-score, .business-content', result), 'max');
			Yellow.equalizeHeight($('.business-score .business-thumbnail a, .business-content', result), 'max');
		});
	}

	if ($(window).outerWidth() < 768) { // Aesthetic height mods for below tablet portrait
	    $('.search-results__item').each(function () {
			var result = $(this);
			Yellow.equalizeHeight($('.business-info, .review-score', result), 'max');
		});
	}

	// No image version(s)
	if ($(window).outerWidth() < 768) { // Aesthetic height mods for below tablet portrait
	    $('.search-results__item--no-image').each(function () {
			var result = $(this);
			Yellow.equalizeHeight($('.business-content, .review-score', result), 'max');
		});
	}
	
    Yellow.srpMap();

});
