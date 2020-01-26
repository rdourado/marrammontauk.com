/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/rooms-group', {
	title: __('Rooms Group', 'marram'),
	category: 'marram',
	keywords: [__('room', 'marram')],
	icon: 'palmtree',
	attributes,
	edit,
	save,
})
