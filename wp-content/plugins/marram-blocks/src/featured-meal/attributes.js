/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const attributes = {
	title: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__title`,
	},
	content: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__content`,
	},
	portion: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__portion`,
	},
	price: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__price`,
	},
}

export default attributes
