/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType, registerBlockStyle } = wp.blocks

registerBlockType('marram/page-heading', {
	title: __('Page Heading', 'marram'),
	category: 'marram',
	keywords: [__('heading', 'marram')],
	icon,
	attributes,
	edit,
	save,
})

registerBlockStyle('marram/page-heading', {
	name: 'alt',
	label: __('Alternative', 'marram'),
})
