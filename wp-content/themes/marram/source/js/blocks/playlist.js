/**
 * External dependencies
 */
import $ from 'jQuery'

const activeClass = 'mtk-playlist--active'
const headerClass = 'mtk-playlist__header'

$(`.${headerClass}`).on('click', event => {
	$(event.currentTarget || event.target)
		.parent()
		.toggleClass(activeClass)
})
