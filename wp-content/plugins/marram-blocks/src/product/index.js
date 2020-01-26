/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType, registerBlockStyle } = wp.blocks

registerBlockType('marram/product', {
	title: __('Product', 'marram'),
	category: 'marram',
	icon,
	keywords: [__('product', 'marram')],
	supports: { anchor: true },
	attributes,
	edit,
	save,
})

registerBlockStyle('marram/product', {
	name: 'alt',
	label: __('Alternative', 'marram'),
})
