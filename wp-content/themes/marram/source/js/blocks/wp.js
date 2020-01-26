/**
 * External dependencies
 */
import $ from 'jQuery'

$('.wp-block-gallery.is-style-carousel-single').each(
	(_, el) =>
		$(el).children().length > 1 &&
		$(el).slick({
			arrows: true,
			autoplay: true,
			autoplaySpeed: 6000,
			fade: true,
			mobileFirst: true,
			slidesToShow: 1,
			pauseOnHover: false,
		})
)

$('.wp-block-gallery.is-style-carousel-multiple').each(
	(_, el) => $(el).children().length > 1 && $(el).attr('class', 'mtk-close-up')
)
