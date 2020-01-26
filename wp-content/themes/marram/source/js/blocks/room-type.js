/**
 * External dependencies
 */
import $ from 'jQuery'

const activeClass = 'mtk-room-type--active'
const headerClass = 'mtk-room-type__header'
const galleryClass = 'mtk-room-type__gallery'

$(`.${headerClass}`).on('click', event => {
	const target = $(event.currentTarget || event.target).parent()
	target.toggleClass(activeClass)
	if (target.hasClass(activeClass) && !target.data('slick-active')) {
		target.data('slick-active', true)
		target.find(`.${galleryClass}`).slick({
			arrows: true,
			lazyLoad: 'ondemand',
			slidesToScroll: 1,
			slidesToShow: 1,
		})
	}
})
