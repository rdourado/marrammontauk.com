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
		default: __('Private Events', 'marram'),
	},
	lead: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__lead`,
		default: [
			__(
				'We welcome events of all types. Please fill out the form bellow,',
				'so we can work together to ensure the best experience.'
			),
		],
	},
}

export default attributes
