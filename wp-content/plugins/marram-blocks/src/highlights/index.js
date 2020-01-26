/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/highlights', {
	title: __('Highlights', 'marram'),
	category: 'marram',
	icon,
	keywords: [__('highlight', 'marram')],
	attributes,
	edit,
	save,
})
