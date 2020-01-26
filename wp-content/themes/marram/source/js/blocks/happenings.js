/**
 * External dependencies
 */
import $ from 'jQuery'

const blockClass = 'mtk-happenings'
const activeClass = 'mtk-happenings__event--active'
const eventClass = 'mtk-happenings__event'
const imageClass = 'mtk-happenings__image wp-post-image'
const previewClass = 'mtk-happenings__preview'
const thumbAttr = 'data-thumbnail'

$(`.${eventClass}`).each((_, elem) => {
	const image = $('<img alt="" />')
		.attr('src', $(elem).attr(thumbAttr))
		.attr('class', imageClass)

	$(elem).on('click', event => {
		const target = $(event.currentTarget || event.target)

		target
			.toggleClass(activeClass)
			.siblings()
			.removeClass(activeClass)

		if (target.hasClass(activeClass)) {
			target
				.closest(`.${blockClass}`)
				.find(`.${previewClass} > img`)
				.replaceWith(image)
		}
	})
})
