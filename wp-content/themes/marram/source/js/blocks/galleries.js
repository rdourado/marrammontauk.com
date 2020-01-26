/* global slickParams */
/**
 * External dependencies
 */
import $ from 'jQuery'
import get from 'lodash/get'

let initialSlide
try {
	initialSlide = get(slickParams, 'initialSlide', 0)
} catch (e) {
	initialSlide = 0
}

$('.mtk-galleries').each((_, element) => {
	$(element).slick({
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1020,
				settings: 'unslick',
			},
		],
	})
})

$('.mtk-close-up:not(.slick-slider)').each((_, element) => {
	$(element).slick({
		slidesToShow: 1,
		variableWidth: true,
		initialSlide,
	})
})

$('.blocks-gallery-item a').each((_, element) => {
	const href = $(element).attr('href')
	const post = encodeURIComponent(window.location.href.replace(':3000', ':8000'))
	const sep = href.indexOf('?') >= 0 ? '&' : '?'
	$(element).attr('href', `${href}${sep}post=${post}`)
})
