const attributes = {
	quotesToShow: {
		type: 'number',
		default: 2,
	},
	quotes: {
		type: 'array',
		default: [],
		source: 'query',
		selector: 'blockquote',
		query: {
			value: {
				type: 'string',
				source: 'html',
				multiline: 'p',
			},
			citation: {
				type: 'string',
				source: 'text',
				selector: 'cite',
			},
		},
	},
}

export default attributes
