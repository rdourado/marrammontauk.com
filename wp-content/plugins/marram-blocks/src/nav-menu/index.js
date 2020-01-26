/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/nav-menu', {
	title: __('Menu'),
	category: 'marram',
	keywords: [__('menu', 'marram')],
	icon: 'menu',
	attributes,
	edit,
	save: () => null,
})
