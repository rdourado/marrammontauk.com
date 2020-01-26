/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const attributes = {
	content: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}`,
	},
}

export default attributes
