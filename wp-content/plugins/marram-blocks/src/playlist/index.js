/**
 * Internal dependencies
 */
import attributes from './attributes'
import edit from './edit'
import save from './save'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType('marram/playlist', {
	icon: 'format-audio',
	title: __('Playlist', 'marram'),
	category: 'marram',
	keywords: [__('playlist', 'marram'), __('audio', 'marram'), __('music', 'marram')],
	attributes,
	edit,
	save,
})
