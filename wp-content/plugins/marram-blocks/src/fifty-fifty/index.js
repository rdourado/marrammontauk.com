/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType, registerBlockStyle } = wp.blocks

registerBlockType('marram/fifty-fifty', {
	title: __('50x50', 'marram'),
	category: 'marram',
	icon,
	keywords: [__('fifty', 'marram')],
	supports: { anchor: true },
	attributes,
	edit,
	save,
})

registerBlockStyle('marram/fifty-fifty', {
	name: 'alt',
	label: __('Alternative', 'marram'),
})
