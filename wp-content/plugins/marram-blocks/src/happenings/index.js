/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/happenings', {
	title: __('Happenings', 'marram'),
	category: 'marram',
	keywords: [__('text', 'marram')],
	icon: 'calendar',
	attributes,
	edit,
	save,
})
