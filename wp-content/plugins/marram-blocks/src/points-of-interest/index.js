/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType, registerBlockStyle } = wp.blocks

registerBlockType('marram/points-of-interest', {
	title: __('Points of Interest', 'marram'),
	category: 'marram',
	icon: 'admin-site-alt',
	keywords: [__('poi', 'marram')],
	attributes,
	edit,
	save,
})

registerBlockStyle('marram/points-of-interest', {
	name: 'alt',
	label: __('Alternative', 'marram'),
})
