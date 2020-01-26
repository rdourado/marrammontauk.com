/* globals jQuery */
;(function($) {
	const $singleGallery = $('.wp-block-gallery.is-style-carousel-single')
	const $multipleGallery = $(
		'.wp-block-gallery.is-style-carousel-multiple, .mtk-room-type__gallery'
	)

	$singleGallery.each(
		(_, el) =>
			$(el).children().length > 1 &&
			$(el).slick({
				arrows: true,
				autoplay: true,
				autoplaySpeed: 6000,
				mobileFirst: true,
				slidesToShow: 1,
			})
	)

	$multipleGallery.each(
		(_, el) =>
			$(el).children().length > 1 &&
			$(el).slick({
				arrows: true,
				autoplay: true,
				autoplaySpeed: 6000,
				centerMode: true,
				slidesToShow: 1,
			})
	)
})(jQuery)
