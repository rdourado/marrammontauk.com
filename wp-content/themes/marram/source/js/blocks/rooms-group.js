/**
 * External dependencies
 */
import $ from 'jQuery'

const activeClass = 'mtk-rooms-group--active'
const headerClass = 'mtk-rooms-group__header'

$(`.${headerClass}`).on('click', event => {
	$(event.currentTarget || event.target)
		.parent()
		.toggleClass(activeClass)
})
