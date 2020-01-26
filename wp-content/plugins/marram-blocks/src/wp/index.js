const { __ } = wp.i18n
const { registerBlockStyle } = wp.blocks

// registerBlockStyle('core/cover', {
// 	name: 'short',
// 	label: __('Short Cover', 'marram'),
// })
registerBlockStyle('core/gallery', {
	name: 'carousel-single',
	label: __('Carousel Single', 'marram'),
})
registerBlockStyle('core/gallery', {
	name: 'carousel-multiple',
	label: __('Carousel Multiple', 'marram'),
})
registerBlockStyle('core/heading', {
	name: 'subtitle',
	label: __('Subtitle', 'marram'),
})
registerBlockStyle('core/heading', {
	name: 'sans-serif',
	label: __('Sans serif', 'marram'),
})
registerBlockStyle('core/paragraph', {
	name: 'small-caps',
	label: __('Small Caps', 'marram'),
})
