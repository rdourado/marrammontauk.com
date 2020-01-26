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
		default: __('Happenings', 'marram'),
	},
	category: {
		type: 'string',
		default: '',
	},
	numberposts: {
		type: 'number',
		default: 6,
	},
}

export default attributes
