function loader(element) {
	var loader = '<img src="/resources/images/loader.svg" class="w-full loader" />'
	if (element != 'hide') {
		return jQuery(element).html(loader)
	} else {
		jQuery(".preloader-wrapper").remove()
	}
}

function notif(message) {
	alert(message);
}

function _post(content, btn, process_url, redirect, data_type) {
	var me = jQuery(this),
		activeBtn = jQuery(`#${btn}`),
		btnValue = activeBtn.text();

	if (me.data('requestRunning')) return
	jQuery.ajax({
		url: process_url,
		dataType: 'json',
		type: data_type,
		cache: false,
		// processData: false,
		// contentType: false,
		headers: {
			'CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
		},
		accepts: {
			'request-type': 'application/x-www-ajax-request'
		},
		data: content.serialize(),
		beforeSend: function() {
			me.data('requestRunning', true)
			loader(`#${btn}`)
			jQuery('.validation-block').removeClass('validation-block');
			jQuery('.validation-danger').removeClass('validation-danger');
		},
		error: function(jqXHR, status, thrown) {
			loader('hide')
			notif("We are sorry, something error with the system. But you can come back later and try again.")
		},
		success: function(data) {
			if ( data.success ) {
				if (data.window) {
					window.open(data.window, '_blank')
				}
				if (data.redirect != false || redirect == true) {
					window.location.href = data.redirect
				} else {
					loader('hide')
					activeBtn.html(btnValue)
					handleError(data.messages)
				}
			} else {
				loader('hide')
				activeBtn.html(btnValue)
				handleError(data.messages)
			}
		},
		complete: function() {
			activeBtn.html(btnValue)
			me.data('requestRunning', false)
		}
	})
}

function handleError(errors, target = 'input[name=%v]') {
	if (errors.length) {
		errors.forEach(err => {
			const key = Object.keys(err)[0];
			const targetKey = target.replace('%v', key);
			const targetElement = jQuery(targetKey);
			const targetValidation = jQuery(`.${key}-validation`);
			targetElement.addClass('validation-danger');
			targetValidation.text(err[key]).addClass('validation-block validation-danger');
		});
	}
}

jQuery("form[ja-ajax]").on('submit', function() {
	var data_request = jQuery(this).attr("ja-request"),
		data_redirect = jQuery(this).attr("ja-redirect"),
		data_type = jQuery(this).attr("ja-type"),
	    redirect = true,
	    btn = jQuery(this).find("button[ja-send]")

	// Set random number var button id
	var number = 1 + Math.floor(Math.random() * 6),
		btn_value = "ja-SubmitBtn_" + number

	if (data_request == "") {
		alert("Missing attribute data-request")
	} else {
		// Set button id atribute with random value
		btn.attr("id", btn_value)
		if (data_redirect === undefined) redirect = false
		if (data_type === undefined) data_type = 'POST'
		// Ajax request
		_post(jQuery(this), btn_value, data_request, redirect, data_type)
	}

	return false
})
