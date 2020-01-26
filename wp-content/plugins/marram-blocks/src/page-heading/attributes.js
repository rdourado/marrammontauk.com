/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const attributes = {
	title: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__title`,
	},
	headline: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__headline`,
	},
}

export default attributes
