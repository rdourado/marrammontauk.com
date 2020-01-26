/**
 * External dependencies
 */
import get from 'lodash/get'
import pick from 'lodash/pick'

const { Component } = wp.element
const { RichText, InspectorControls, PlainText } = wp.editor
const { PanelBody, ToggleControl } = wp.components
const { __ } = wp.i18n

export const pickRelevantMediaFiles = image => ({
	...pick(image, ['alt', 'id', 'caption']),
	url: get(
		image,
		['sizes', 'large', 'url'],
		get(image, ['media_details', 'sizes', 'large', 'source_url'], image.url)
	),
})

class PlaylistEdit extends Component {
	renderControls = () => {
		const { attributes, setAttributes } = this.props
		const { collapsed } = attributes
		const toggleHelp = collapsed
			? __('Page will load with block collapsed.', 'marram')
			: __('Toggle to collapse details on page load.', 'marram')

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<ToggleControl
						label={__('Collapsed', 'marram')}
						checked={!!collapsed}
						onChange={() => setAttributes({ collapsed: !collapsed })}
						help={toggleHelp}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	render() {
		const { attributes, className, setAttributes } = this.props
		const { name, description, meta, embed } = attributes

		return (
			<div className={className}>
				{this.renderControls()}
				<RichText
					tagName="h3"
					className={`${className}__name`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					value={name}
					onChange={value => setAttributes({ name: value })}
				/>
				<div className={`${className}__content`}>
					<RichText
						tagName="p"
						className={`${className}__meta`}
						placeholder={__('Add text…', 'marram')}
						keepPlaceholderOnFocus
						value={meta}
						onChange={value => setAttributes({ meta: value })}
					/>
					<RichText
						tagName="p"
						className={`${className}__description`}
						placeholder={__('Add text…', 'marram')}
						keepPlaceholderOnFocus
						value={description}
						onChange={value => setAttributes({ description: value })}
					/>
					<PlainText
						className={`${className}__embed`}
						placeholder={__('Write Embed HTML…', 'marram')}
						aria-label={__('Embed HTML')}
						value={embed}
						onChange={value => setAttributes({ embed: value })}
					/>
				</div>
			</div>
		)
	}
}

export default PlaylistEdit
