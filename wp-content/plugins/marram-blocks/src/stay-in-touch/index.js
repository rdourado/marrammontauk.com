/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/stay-in-touch', {
	title: __('Stay In Touch', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	supports: { customClassName: false, anchor: true },
	icon: 'email',
	attributes,
	edit,
	save,
})
