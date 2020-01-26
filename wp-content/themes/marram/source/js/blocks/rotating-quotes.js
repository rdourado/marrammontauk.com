/**
 * External dependencies
 */
import $ from 'jQuery'
/**
 * Internal dependencies
 */
import { BLOCK } from '../../../../../plugins/marram-blocks/src/rotating-quotes/types'

const rotatingQuotes = $(`.${BLOCK}`)
if (rotatingQuotes.children().length > 1) {
	rotatingQuotes.addClass('slick-slider').html(() => {
		const allQuotes = $('p', rotatingQuotes).map((_, el) => el.outerHTML)
		const allSources = $('cite', rotatingQuotes).map((_, el) => el.outerHTML)

		return (
			`<div class="${BLOCK}__all-quotes"><div>` +
			allQuotes.get().join('</div><div>') +
			'</div></div>' +
			`<div class="${BLOCK}__all-sources">` +
			allSources.get().join('') +
			'</div>'
		)
	})

	const allQuotes = $(`.${BLOCK}__all-quotes`)
	const allSources = $(`.${BLOCK}__all-sources`)

	allQuotes.slick({
		adaptiveHeight: true,
		// autoplay: true,
		// autoplaySpeed: 6000,
		pauseOnHover: true,
		arrows: false,
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: allSources,
	})
	allSources.slick({
		arrows: true,
		asNavFor: allQuotes,
		focusOnSelect: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0%',
		variableWidth: false,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 760,
				settings: {
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '15%',
					variableWidth: true,
				},
			},
			// {
			// 	breakpoint: 1200,
			// 	settings: {
			// 		arrows: false,
			// 		slidesToShow: 4,
			// 		slidesToScroll: 1,
			// 		centerMode: false,
			// 		variableWidth: true,
			// 	},
			// },
		],
	})
}
