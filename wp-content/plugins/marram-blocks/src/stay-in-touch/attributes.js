/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { __ } = wp.i18n

const attributes = {
	title: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__title`,
		default: __('Stay in touch', 'marram'),
	},
	lead: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__lead`,
		default: [
			__(
				'There’s always something going on here. Stay in the loop for events, experiences and more.',
				'marram'
			),
		],
	},
}

export default attributes
