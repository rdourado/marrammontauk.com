/**
 * External dependencies
 */
import Animate from 'animate.js'
import $ from 'jQuery'

$(
	[
		'body > [class^="wp-block-"]:not(.wp-block-marram-room-type)',
		'body > [class^="mtk-"]:not(.mtk-header, .mtk-special-offer, .mtk-room-type, .mtk-footer)',
		'body > h1',
		'body > h2',
		'body > h3',
		'body > h4',
	].join(',')
)
	.attr('data-animate', true)
	.attr('data-animation-classes', 'animated fadeIn')

$('.mtk-header, .wp-block-cover__inner-container')
	.attr('data-animate', true)
	.attr('data-animation-classes', 'animated fadeIn')
	.attr('data-animation-delay', '750')

new Animate({
	target: '[data-animate]',
	offset: 0.2,
	delay: 0,
	remove: false,
	scrolled: false,
	reverse: false,
	onLoad: true,
	onScroll: true,
	onResize: false,
	disableFilter: false,
}).init()
