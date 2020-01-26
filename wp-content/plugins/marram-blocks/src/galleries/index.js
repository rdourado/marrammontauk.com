/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/galleries', {
	title: __('Galleries', 'marram'),
	category: 'marram',
	keywords: [__('image', 'marram'), __('gallery', 'marram')],
	icon: 'format-gallery',
	attributes,
	edit,
	save: () => null,
})
