/**
 * External dependencies
 */
import $ from 'jQuery'

$.validator.addMethod(
	'skip_or_complete_group',
	function(_, element, groupingClass) {
		const $fields = $('input:not(:hidden)', $(element).closest(groupingClass)),
			$fieldsFirst = $fields.eq(0),
			validator = $fieldsFirst.data('valid_skip')
				? $fieldsFirst.data('valid_skip')
				: $.extend({}, this),
			numberFilled = $fields.filter(function() {
				return validator.elementValue(this)
			}).length,
			isValid = numberFilled === 0 || numberFilled === $fields.length

		// Store the cloned validator for future validation
		$fieldsFirst.data('valid_skip', validator)

		// If element isn't being validated, run each field's validation rules
		if (!$(element).data('being_validated')) {
			$fields.data('being_validated', true)
			$fields.each(function() {
				validator.element(this)
			})
			$fields.data('being_validated', false)
		}
		return isValid
	},
	$.validator.format('Please supply missing fields.')
)

$.validator.addMethod(
	'skip_or_fill_minimum',
	function(_, element, options) {
		const $fields = $(options[1], element.form),
			$fieldsFirst = $fields.eq(0),
			validator = $fieldsFirst.data('valid_skip')
				? $fieldsFirst.data('valid_skip')
				: $.extend({}, this),
			numberFilled = $fields.filter(function() {
				return validator.elementValue(this)
			}).length,
			isValid = numberFilled === 0 || numberFilled >= options[0]

		// Store the cloned validator for future validation
		$fieldsFirst.data('valid_skip', validator)

		// If element isn't being validated, run each skip_or_fill_minimum field's validation rules
		if (!$(element).data('being_validated')) {
			$fields.data('being_validated', true)
			$fields.each(function() {
				validator.element(this)
			})
			$fields.data('being_validated', false)
		}
		return isValid
	},
	$.validator.format('Please either skip these fields or fill at least {0} of them.')
)

$.validator.addMethod(
	'zipcodeUS',
	function(value, element) {
		return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value)
	},
	'The specified US ZIP Code is invalid'
)

$.validator.addMethod(
	'mc_gdpr',
	function(_, element, groupingClass) {
		//if gdpr is required the user must pick at least one option.
		const $fields = $('input:not(:hidden)', $(element).closest(groupingClass))
		return $fields.filter(':checked').length !== 0
	},
	'Please choose an option.'
)
