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
	},
	content: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__content`,
	},
	description: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__description`,
	},
	meta: {
		type: 'array',
		source: 'children',
		selector: `.${BLOCK}__meta`,
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
		default: __('Deliver To Room', 'marram'),
	},
	buttonText: {
		type: 'string',
		source: 'text',
		selector: `.${BLOCK}__button`,
	},
}

export default attributes
