/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/featured-meal', {
	title: __('Featured Meal', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	icon: 'carrot',
	attributes,
	edit,
	save,
})
