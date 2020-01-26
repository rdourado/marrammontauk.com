/**
 * External dependencies
 */
import $ from 'jQuery'

$('.mtk-special-offer')
	.wrapAll(
		'<div class="mtk-special-offers" data-animate data-animation-classes="animated fadeIn" />'
	)
	.parent()
	.each(
		(_, elem) =>
			$(elem).slick &&
			$(elem).slick({
				arrows: false,
				autoplay: true,
				autoplaySpeed: 7000,
				pauseOnHover: false,
			})
	)
