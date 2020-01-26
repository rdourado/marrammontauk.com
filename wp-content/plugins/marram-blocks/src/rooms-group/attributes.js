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
}

export default attributes
