(function () {
	
	"use strict";

	/* 

	Vertical scroller

	Usage:

		Html:

			<div class="promo-ctrls">
		        <a href="#0"><i class="fa fa-circle"></i></a>
		        <a href="#1"><i class="fa fa-circle"></i></a>
		    </div>

		    <a href="#" class="promo-arrow-up"><i class="fa fa-angle-up"></i></a>
    		<a href="#" class="promo-arrow-down"><i class="fa fa-angle-down"></i></a>

		    <div class="promo-slides">

		        <section class="section section-promo" style="background-image:url(/static/images/hand-phone.jpg);">
		            <div class="section-container">
		                <div class="promo-content">...</div>
		            </div>
		        </section>

		        <section class="section section-promo" style="background-image:url(/static/images/hand-phone.jpg);">
		            <div class="section-container">
		                <div class="promo-content">...</div>
		            </div>
		        </section>

		    </div>

	    Js:
	    	Yellow.verticalScroller('.promo-slides', '.promo-ctrls', '.promo-arrow-up', '.promo-arrow-down', 'header, footer');

	*/

	Yellow.verticalScroller = function (container, controls, arrowUp, arrowDown, minus) {

		var el      = $(container),
			slides 	= el.children(),
			ctrlEl  = $(controls),
			ctrls   = ctrlEl.children(),
			arrowU  = $(arrowUp),
			arrowD  = $(arrowDown),
			minus   = minus && $(minus),
			offset  = 0,
			height  = 0,
			$html   = $('html'),
			$window = $(window),
			active  = -1;


		function setActive (index, isUserInitiated) {

			if (index === active) return;

			$(ctrls.get(active)).removeClass('active');
			$(ctrls.get(index)).addClass('active');

			active = index;

			arrowU.show();
			arrowD.show();

			if (active === 0) arrowU.fadeOut(200);
			if (active === slides.length - 1) arrowD.fadeOut(200);

			if (isUserInitiated)  el.animate({ scrollTop: index * height }, 500);
		}

		function centre (arrow) {
			arrow.css({
				left: (el.outerWidth() / 2 - arrow.outerWidth() / 2) + 'px'
			})
		}

		function setHeight () {
			
			height = $window.outerHeight() - offset;
			
			slides.outerHeight(height + 'px');
			el.outerHeight(height + 'px');
			el.scrollTop(active * height);

			[arrowU, arrowD].forEach(centre);

			ctrlEl.css({
				top: (height / 2 - ctrlEl.outerHeight() / 2) + 'px'
			});
		}

		if (minus) minus.each(function () {
			offset += $(this).outerHeight();
		});

		$html.css({ 'overflow-y': 'auto' });

		setHeight();
		setActive(0);

		ctrls.on('click', function (e) {
			e.preventDefault();
			setActive($(this).index(), true);
		});

		arrowU.on('click', function (e) {
			e.preventDefault();
			setActive(active - 1, true);
		});

		arrowD.on('click', function (e) {
			e.preventDefault();
			setActive(active + 1, true);
		});

		$window.on({
			resize: setHeight,
			scroll: function () {
				setActive(Math.floor(el.scrollTop() / height));
			}
		});
	};


}).call(this);