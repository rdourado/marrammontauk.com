/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const attributes = {
	collapsed: {
		type: 'boolean',
		default: true,
	},
	name: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__name`,
	},
	description: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__description`,
	},
	meta: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__meta`,
	},
	embed: {
		type: 'string',
		source: 'html',
		selector: `.${BLOCK}__embed`,
	},
}

export default attributes
