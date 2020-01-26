/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/room-type', {
	icon: 'palmtree',
	title: __('Room Type', 'marram'),
	category: 'marram',
	keywords: [__('room', 'marram')],
	attributes,
	edit,
	save,
})
