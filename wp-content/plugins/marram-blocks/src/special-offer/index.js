/**
 * Internal dependencies
 */
import icon from './icon'
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/special-offer', {
	title: __('Special Offer', 'marram'),
	category: 'marram',
	icon,
	keywords: [__('fifty', 'marram')],
	attributes,
	edit,
	save,
})
