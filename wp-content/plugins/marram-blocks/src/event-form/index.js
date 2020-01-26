/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/event-form', {
	title: __('Event Form', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	icon: 'forms',
	attributes,
	edit,
	save,
})
