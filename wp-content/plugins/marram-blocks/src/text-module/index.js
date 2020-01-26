/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/text-module', {
	title: __('Text Module', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	supports: { customClassName: false, anchor: true },
	icon,
	attributes,
	edit,
	save,
})
