/* global mtk */
/**
 * External dependencies
 */
import $ from 'jQuery'

function animateTo(elem) {
	const $body = $('body')
	const $elem = $(elem)

	const padding = +$body.css('padding-top').replace('px', '')
	const margin = +$elem.css('margin-top').replace('px', '')
	const scrollTop = $elem.offset().top - padding - margin

	$('html, body').animate({ scrollTop }, 500)
}

$(document)
	.on('click.mtk', 'a[href^="#"]:not(a[href="#"])', function(event) {
		event.preventDefault()
		animateTo(this.hash)
	})
	.on('click.mtk', '.mtk-js-toggle-newsletter-form', function(event) {
		event.preventDefault()
		event.stopPropagation()
		$.get(`${mtk.ajax_url}?action=stay_in_touch_modal`, data => {
			const html = `<div class="mtk-modal mtk-modal--show mtk-modal--mc"><div class="mtk-modal__wrap">
				${data}<button type="button" class="mtk-modal__close">Close</button>
			</div></div>`

			if (!$('.mtk-modal').length) $('body').append(html)
			else $('.mtk-modal').replaceWith(html)

			$('form', '.mtk-modal--mc').mailchimp()
		})
	})
