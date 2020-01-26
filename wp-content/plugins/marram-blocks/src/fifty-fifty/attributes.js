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

	imageID: {
		source: 'attribute',
		selector: 'img',
		attribute: 'data-id',
	},
	imageAlt: {
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
		default: '',
	},
	imageURL: {
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
	},
	imageCaption: {
		type: 'string',
		source: 'text',
		selector: 'figcaption',
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
	},
}

export default attributes
