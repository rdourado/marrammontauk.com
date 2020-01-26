/**
 * Internal dependencies
 */
import edit from './edit'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/post-date', {
	title: __('Post Date', 'marram'),
	category: 'marram',
	keywords: [__('post', 'marram'), __('date', 'marram')],
	icon: 'calendar-alt',
	attributes: {},
	edit,
	save: () => null,
})
