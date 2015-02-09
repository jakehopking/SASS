

	/* 

	Modal box 

	Usage:

		Js:
			Yellow.modal(
				'Please confirm', // can be html or text
				function (modal) { ... } // confirmation callback
			);

	*/

	Yellow.modal = function (content, onConfirm) {

		"use strict";

		var el = $(
			'<div class="modal">' + 
				'<div class="modal-content">' + 
					'<a class="modal-close" href="#close"><i class="fa fa-times"></i></a>' +
					content + 
				'</div>' +
				'<div class="modal-buttons">' +
					'<a href="#cancel" class="button button--muted">cancel</a>' +
					'<a href="#confirm" class="button button--positive">confirm</a>' +
				'</div>' +
			'</div>'
		);

		function close (e) {
			if (e) e.preventDefault();
			el.fadeOut(300, function () { el.remove(); });
		}

		$('body').append(el);

		Yellow.util.centralize(el.fadeIn(300));

		$('.modal-close', el).on('click', close);

		$('.modal-buttons a').on('click', function (e) {
			e.preventDefault();
			if ($(this).attr('href') === '#confirm' && onConfirm) onConfirm(el);
			close();
		});
	};

