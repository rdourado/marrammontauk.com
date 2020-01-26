/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/clippings', {
	title: __('Clippings', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	icon: 'paperclip',
	attributes,
	edit,
	save,
})
