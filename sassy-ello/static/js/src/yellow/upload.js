(function () {


	"use strict";

	/*

	File upload

	Defaults to html5 / XMLHttpRequest if available
	can be configured to falls back to the post-to-hidden-iframe method
	if no fallback configured, just does a normal POST

	Fires when form is submitted

	Usage:

		Html:

			<form id="some-form" action="/upload-photo" method="post">
				<input type="file" name="photo">
				<input type="submit" value="upload">
			</form>

		Js:

			Yellow.upload({
				form:     $('#some-form')
				success:  function (response, xhr) { ... },
				progress: function (percentDone, xhr) { ... }, // optional
				error:    function (response, xhr) { ... }, // optional
				fallback: 'iframe', // optional
				submit:   function () { ... }, // optional 
				url:      '/upload-photo' // only required if the given form doesn't have an action attribute
			});

		Serverside:
		
			Expects a JSON reponse with following format:

			{
				"success": true // if succeeded
				... any other properties, e.g: error messages
			}	

			HTTP status codes can also be used to indicate success or failure
			but a JSON response is required regardless
	*/


	var id = 0;
	var error_message = 'Please make sure you are logged in and try again later'

	Yellow.upload = function (opts) {

		var form 		= opts.form,
			success 	= opts.success,
			progress 	= opts.progress,
			err  		= opts.error,
			submit      = opts.submit,
			url         = opts.url || form.attr('action'),
			fallback    = opts.fallback;

		if (submit) form.on('submit', submit);	
			
		form.on('submit', function (e) {
			
			if (window.FormData !== undefined && XMLHttpRequest) { // html5 upload
					e.preventDefault();
					var xhr  = new XMLHttpRequest(),
					    data = new FormData(form.get(0));

					xhr.onreadystatechange = function () {

						if (xhr.readyState !== 4) return;
			            
			            var res = xhr.responseText;

		                try {
		                    res = JSON.parse(res);

		                } catch (e) {
		                    //throw new Error(xhr.responseText);
		                    res = { error: error_message };
		                }

			            (xhr.status < 400 && res.success) ? success(res, xhr) : (err && err(res, xhr));
					};

					if (progress && xhr.upload) {
			            xhr.upload.addEventListener('progress', function (e) {
			                if (e.lengthComputable) progress(Math.round((e.loaded * 100) / e.total), xhr);
			            });
			        }

			        xhr.open('POST', url, true);
			        xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
			        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			        xhr.setRequestHeader('X-CSRFToken', Yellow.csrf);
			        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			        xhr.send(data);   

			} else if (fallback === 'iframe') { // dumb (hidden iframe) upload

				var iframe = $('<iframe style="display: none" name="post-target_' + id + '"></iframe>');

		        $('body').append(iframe);

				form.attr({ target: 'post-target_' + id, enctype: 'multipart/form-data', encoding: 'multipart/form-data' });

		        iframe.on("load", function () { 
		        	var res = {};
		        	id++;

		        	var content = (this.contentDocument) ? this.contentDocument.body :
		        				  (this.contentWindow) ? this.contentWindow.document.body : 
		        				  this.document.body;
		        	try {			  
		            	res = JSON.parse($(content).text());

		            } catch (e) {
		            	//throw new Error('Could not parse json');
		            	res = { error: error_message };
		            }
		            (res.success) ? success(res) : (err && err(res));
		        });
			} 
		}); 
		// otherwise just submit the form normally
	};


}).call(this);
