/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/rotating-quotes', {
	title: __('Rotating Quotes', 'marram'),
	category: 'marram',
	icon,
	keywords: [__('blockquote', 'marram')],
	attributes,
	edit,
	save,
})
