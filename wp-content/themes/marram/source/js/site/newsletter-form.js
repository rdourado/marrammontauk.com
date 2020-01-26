/**
 * External dependencies
 */
import clickOutside from 'click-outside'
/**
 * Internal dependencies
 */
import { $, on } from '../helpers'
;(($modal, $wrap, $close, $toggle) => {
	if (!$modal) {
		return
	}

	let isActive = false
	let unbind = null

	function init() {
		on('click', $toggle, toggleNewsletter)
		on('click', $close, hideNewsletter)
	}

	function toggleNewsletter(event) {
		if (!isActive) {
			showNewsletter(event)
		} else {
			hideNewsletter(event)
		}
	}

	function showNewsletter(event) {
		if (event && event.preventDefault) {
			event.preventDefault()
		}
		$modal.classList.add('mtk-modal--active')
		document.body.classList.add('mtk--no-flow')
		setTimeout(() => (unbind = clickOutside($wrap, hideNewsletter)), 100)
		isActive = true
	}

	function hideNewsletter(event) {
		if (event && event.preventDefault) {
			event.preventDefault()
		}
		$modal.classList.remove('mtk-modal--active')
		document.body.classList.remove('mtk--no-flow')
		if (unbind) {
			unbind()
		}
		isActive = false
	}

	init()
})(
	$('#newsletter'),
	$('#newsletter .mtk-modal__wrap'),
	$('#newsletter .mtk-modal__close'),
	$(
		'.mtk-js-toggle-newsletter-form > a, .mtk-js-toggle-newsletter-form, a[data-title="Newsletter"], a[data-title="newsletter"], a[data-title="NEWSLETTER"]'
	)
)
