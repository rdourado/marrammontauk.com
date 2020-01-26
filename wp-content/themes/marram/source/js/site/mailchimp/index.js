/**
 * External dependencies
 */
import $ from 'jQuery'

$.fn.mailchimp = function() {
	if (!$.validator) return this
	$.validator.addClassRules('gdpr', { mc_gdpr: '.gdprRequired' })

	const fnames = ['EMAIL', 'MMERGE5']
	// const ftypes = ['email', 'zip']

	const isTooEarly = element => {
		const fields = $('input:not(:hidden)', $(element).closest('.mc-field-group'))
		return (
			$(fields)
				.eq(-1)
				.attr('id') !== $(element).attr('id')
		)
	}

	return this.each(function() {
		let validator = {}

		const getGroups = () => {
			const groups = {}
			$('.mc-field-group', this).each(function() {
				const inputs = $(this).find('input:text:not(:hidden), input:checkbox:not(:hidden)')
				if (inputs.length > 1) {
					const mergeName = inputs.first().attr('name')
					const fieldNames = $.map(inputs, f => f.name)
					groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ')
				}
			})
			return groups
		}

		const getAjaxSubmitUrl = () => {
			let url = $(this).attr('action')
			url = url.replace('/post?u=', '/post-json?u=')
			url += '&c=?'
			return url
		}

		const mceSuccessCB = resp => {
			$('.mce-success-response', this).hide()
			$('.mce-error-response', this).hide()

			// On successful form submission, display a success message and reset the form
			if (resp.result === 'success') {
				$(`.mce-${resp.result}-response`, this).show()
				$(`.mce-${resp.result}-response`, this).html(resp.msg)
				$(this).reset()

				// If the form has errors, display them, inline if possible, or appended to #mce-error-response
			} else {
				if (resp.msg === 'captcha') {
					let url = $(this).attr('action')
					const parameters = $.param(resp.params)
					url = url.split('?')[0]
					url += '?'
					url += parameters
					window.open(url)
				}
				// Example errors - Note: You only get one back at a time even if you submit several that are bad.
				// Error structure - number indicates the index of the merge field that was invalid, then details
				// Object {result: "error", msg: "6 - Please enter the date"}
				// Object {result: "error", msg: "4 - Please enter a value"}
				// Object {result: "error", msg: "9 - Please enter a complete address"}

				// Try to parse the error into a field index and a message.
				// On failure, just put the dump thing into in the msg variable.
				let index = -1
				let msg
				try {
					const parts = resp.msg.split(' - ', 2)
					if (parts[1] === undefined) {
						msg = resp.msg
					} else {
						const i = parseInt(parts[0])
						if (i.toString() === parts[0]) {
							index = parts[0]
							msg = parts[1]
						} else {
							index = -1
							msg = resp.msg
						}
					}
				} catch (e) {
					index = -1
					msg = resp.msg
				}

				try {
					// If index is -1 if means we don't have data on specifically which field was invalid.
					// Just lump the error message into the generic response div.
					if (index === -1) {
						$(`.mce-${resp.result}-response`, this).show()
						$(`.mce-${resp.result}-response`, this).html(msg)
					} else {
						const fieldName = $(`input[name*='${fnames[index]}']`, this).attr('name') // Make sure this exists (they haven't deleted the fnames array lookup)
						const data = {}
						data[fieldName] = msg
						validator.showError(data)
					}
				} catch (e) {
					$(`.mce-${resp.result}-response`, this).show()
					$(`.mce-${resp.result}-response`, this).html(msg)
				}
			}
		}

		const closePopup = () => {
			$(this)
				.parent()
				.find('.mc_embed_signup')
				.hide()
			const now = new Date()
			const expiresDate = new Date(now.getTime() + 31536000000)
			document.cookie = 'MCPopupClosed=yes;expires=' + expiresDate.toGMTString() + ';path=/'
		}

		$(document)
			.on('click.mce', '.mc_embed_signup a.mc_embed_close', closePopup)
			.on('keydown.mce', function(e) {
				const keycode = e === null ? event.keyCode : e.which
				if (keycode === 27) closePopup()
			})

		validator = $(this).validate({
			// Set error HTML: <div class="mce_inline_error"></div>
			errorClass: 'mce_inline_error',
			errorElement: 'div',

			// Validate fields on keyup, focusout and blur.
			onkeyup: false,
			onfocusout(element) {
				if (!isTooEarly(element)) {
					$(element).valid()
				}
			},
			onblur(element) {
				if (!isTooEarly(element)) {
					$(element).valid()
				}
			},
			// Grouping fields makes jQuery Validation display one error for all the fields in the group
			// It doesn't have anything to do with how the fields are validated (together or separately),
			// it's strictly for visual display of errors
			groups: getGroups(),
			// Place a field's inline error HTML just before the div.mc-field-group closing tag
			errorPlacement(error, element) {
				element.closest('.mc-field-group').append(error)
			},
			// Submit the form via ajax (see: jQuery Form plugin)
			submitHandler(form) {
				$(form).ajaxSubmit({
					url: getAjaxSubmitUrl(),
					type: 'GET',
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					success: mceSuccessCB,
				})
			},
		})
	})
}

$('.mc-embedded-subscribe-form').mailchimp()

/*
// Expose extra mc form methods in global var
window.mc = {
	openPopup() {
		$('.mc_embed_signup a.mc_embed_close').show()
		setTimeout(function() {
			$('.mc_embed_signup').fadeIn()
		}, mc.delayPopup)
	},
	closePopup() {
		$('.mc_embed_signup').hide()
		const now = new Date()
		const expiresDate = new Date(now.getTime() + 31536000000)
		document.cookie = 'MCPopupClosed=yes;expires=' + expiresDate.toGMTString() + ';path=/'
	},
	//
	// Figure out if we should show the popup (if they've closed it before, don't show it.)
	//
	evalPopup() {
		$('.mc_embed_signup').hide()
		const cks = document.cookie.split(';')
		for (let i = 0; i < cks.length; i++) {
			const parts = cks[i].split('=')
			if (parts[0].indexOf('MCPopupClosed') !== -1) mc.showPopup = false
		}
		if (mc.showPopup) mc.openPopup()
	},
	//
	// Grab the list subscribe url from the form action and make it work for an ajax post.
	//
	getAjaxSubmitUrl() {
		let url = $('form.mc-embedded-subscribe-form').attr('action')
		url = url.replace('/post?u=', '/post-json?u=')
		url += '&c=?'
		return url
	},
	//
	// Classify text inputs in the same field group as group for validation purposes.
	// All this does is tell jQueryValidation to create one error div for the group, rather
	// than one for each input. Primary use case is birthday and date fields, where we want
	// to display errors about the inputs collectively, not individually.
	// NOTE: Grouping inputs will give you one error div, but you still need to specify where
	// that div should be displayed. By default, it's inserted after the first input with a
	// validation error, which can break up a set of inputs. Use the errorPlacement setting in
	// the validator to control error div placement.
	//
	getGroups() {
		const groups = {}
		$('.mc-field-group').each(function() {
			const inputs = $(this).find('input:text:not(:hidden), input:checkbox:not(:hidden)')
			if (inputs.length > 1) {
				const mergeName = inputs.first().attr('name')
				const fieldNames = $.map(inputs, function(f) {
					return f.name
				})
				groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ')
			}
		})
		return groups
	},
	//
	// Check if a field is part of a multipart field
	// (e.g., A date merge field is composed of individual inputs for month, day and year)
	// Used in jQuery validation onkeyup method to ensure that we don't evaluate a field
	// if a user hasn't reached the last input in a multipart field yet.
	//
	isMultiPartField(element) {
		return $('input:not(:hidden)', $(element).closest('.mc-field-group')).length > 1
	},
	//
	// Checks if the element is the last input in its fieldgroup.
	// If the field is not the last in a set of inputs we don't want to validate it on certain events (onfocusout, onblur)
	// because the user might not be finished yet.
	//
	isTooEarly(element) {
		const fields = $('input:not(:hidden)', $(element).closest('.mc-field-group'))
		return (
			$(fields)
				.eq(-1)
				.attr('id') !== $(element).attr('id')
		)
	},
	//
	// Handle the error/success message after successful form submission.
	// Success messages are appended to #mce-success-response
	// Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
	//
	mceSuccessCB(resp) {
		$('.mce-success-response').hide()
		$('.mce-error-response').hide()

		// On successful form submission, display a success message and reset the form
		if (resp.result === 'success') {
			$(`.mce-${resp.result}-response`).show()
			$(`.mce-${resp.result}-response`).html(resp.msg)
			$('.mc-embedded-subscribe-form').each(function() {
				this.reset()
			})

			// If the form has errors, display them, inline if possible, or appended to #mce-error-response
		} else {
			if (resp.msg === 'captcha') {
				let url = $('form.mc-embedded-subscribe-form').attr('action')
				const parameters = $.param(resp.params)
				url = url.split('?')[0]
				url += '?'
				url += parameters
				window.open(url)
			}
			// Example errors - Note: You only get one back at a time even if you submit several that are bad.
			// Error structure - number indicates the index of the merge field that was invalid, then details
			// Object {result: "error", msg: "6 - Please enter the date"}
			// Object {result: "error", msg: "4 - Please enter a value"}
			// Object {result: "error", msg: "9 - Please enter a complete address"}

			// Try to parse the error into a field index and a message.
			// On failure, just put the dump thing into in the msg variable.
			let index = -1
			let msg
			try {
				const parts = resp.msg.split(' - ', 2)
				if (parts[1] === undefined) {
					msg = resp.msg
				} else {
					const i = parseInt(parts[0])
					if (i.toString() === parts[0]) {
						index = parts[0]
						msg = parts[1]
					} else {
						index = -1
						msg = resp.msg
					}
				}
			} catch (e) {
				index = -1
				msg = resp.msg
			}

			try {
				// If index is -1 if means we don't have data on specifically which field was invalid.
				// Just lump the error message into the generic response div.
				if (index === -1) {
					$(`.mce-${resp.result}-response`).show()
					$(`.mce-${resp.result}-response`).html(msg)
				} else {
					const fieldName = $("input[name*='" + fnames[index] + "']").attr('name') // Make sure this exists (they haven't deleted the fnames array lookup)
					const data = {}
					data[fieldName] = msg
					$(document).trigger('showError.mce', data)
				}
			} catch (e) {
				$(`.mce-${resp.result}-response`).show()
				$(`.mce-${resp.result}-response`).html(msg)
			}
		}
	},
}

window.mc.mce_validator_options = {
	// Set error HTML: <div class="mce_inline_error"></div>
	errorClass: 'mce_inline_error',
	errorElement: 'div',

	// Validate fields on keyup, focusout and blur.
	onkeyup: false,
	onfocusout(element) {
		if (!mc.isTooEarly(element)) {
			$(element).valid()
		}
	},
	onblur(element) {
		if (!mc.isTooEarly(element)) {
			$(element).valid()
		}
	},
	// Grouping fields makes jQuery Validation display one error for all the fields in the group
	// It doesn't have anything to do with how the fields are validated (together or separately),
	// it's strictly for visual display of errors
	groups: mc.getGroups(),
	// Place a field's inline error HTML just before the div.mc-field-group closing tag
	errorPlacement(error, element) {
		element.closest('.mc-field-group').append(error)
	},
	// Submit the form via ajax (see: jQuery Form plugin)
	submitHandler(form) {
		$(form).ajaxSubmit(mc.ajaxOptions)
	},
}

window.mc.ajaxOptions = {
	url: mc.getAjaxSubmitUrl(),
	type: 'GET',
	dataType: 'json',
	contentType: 'application/json; charset=utf-8',
	success: mc.mceSuccessCB,
}

$(document)
	.on('refresh.mce start.mce', function() {
		window.mc.mce_validator = $('.mc-embedded-subscribe-form').map(function(){ $(this).validate(
			window.mc.mce_validator_options
		) })
	})
	.on('showError.mce', function(data){

	})
	.trigger('start.mce')

// Custom validation methods for fields with certain css classes
$.validator.addClassRules('gdpr', { mc_gdpr: '.gdprRequired' })

// Evil Popup
$(document).on('click', '.mc_embed_signup a.mc_embed_close', function() {
	mc.closePopup()
})
$(document).keydown(function(e) {
	const keycode = e === null ? event.keyCode : e.which
	if (keycode === 27 && typeof mc.showPopup !== 'undefined') mc.closePopup()
})
*/
