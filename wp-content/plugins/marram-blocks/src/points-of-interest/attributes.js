/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { __ } = wp.i18n

const attributes = {
	numberposts: {
		type: 'number',
		default: 1,
	},
	title: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__title`,
		default: __('In this article', 'marram'),
	},
	lead: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__lead`,
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

			latlng: {
				source: 'attribute',
				attribute: 'data-latlng',
			},
			group: {
				source: 'attribute',
				attribute: 'data-group',
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
				default: __('Visit Website', 'marram'),
			},
		},
	},
}

export default attributes
