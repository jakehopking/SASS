$(function () {

	$('.search-results__item').each(function () {
		var result = $(this);
		Yellow.equalizeHeight($('.business-score .review-score, .business-content', result), 'max');
		Yellow.equalizeHeight($('.business-score .business-thumbnail a, .business-content', result), 'max');
	});
	
    Yellow.tabs('.tabs-menu li','.tabs-content > div');
    Yellow.accordion('.accordion');
});
