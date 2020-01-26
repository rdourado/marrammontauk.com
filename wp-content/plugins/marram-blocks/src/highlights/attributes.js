/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { __ } = wp.i18n

const attributes = {
	numberposts: {
		type: 'number',
		default: 3,
	},
	title: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__title`,
	},
	entries: {
		type: 'array',
		default: [],
		source: 'query',
		selector: `.${BLOCK}__entry`,
		query: {
			name: {
				type: 'string',
				source: 'text',
				selector: `.${BLOCK}__name`,
			},
			content: {
				type: 'array',
				source: 'children',
				selector: `.${BLOCK}__content`,
			},

			imageURL: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			imageAlt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			imageID: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id',
			},

			buttonURL: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: `.${BLOCK}__button`,
			},
			buttonText: {
				type: 'string',
				source: 'text',
				selector: `.${BLOCK}__button`,
				default: __('Read the full story', 'marram'),
			},
		},
	},
}

export default attributes
