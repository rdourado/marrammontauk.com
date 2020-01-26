/**
 * External dependencies
 */
import times from 'lodash/times'
import merge from 'lodash/merge'
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
	...times(3, n => ({
		[`featuresTitle${n + 1}`]: {
			type: 'string',
			source: 'text',
			selector: `.${BLOCK}__features:nth-child(${n + 1}) .${BLOCK}__features-title`,
		},
		[`featuresList${n + 1}`]: {
			type: 'array',
			source: 'children',
			multiline: 'li',
			selector: `.${BLOCK}__features:nth-child(${n + 1}) .${BLOCK}__features-list`,
		},
	})).reduce(merge, {}),
	gallery: {
		type: 'array',
		default: [],
		source: 'query',
		selector: '.blocks-gallery-item',
		query: {
			url: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			link: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-link',
			},
			alt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			id: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id',
			},
			caption: {
				type: 'string',
				source: 'html',
				selector: 'figcaption',
			},
		},
	},
}

export default attributes
