const { __ } = wp.i18n
const { Component } = wp.element
const { RichText } = wp.editor

export default class TextModuleEdit extends Component {
	render() {
		const { attributes, className, setAttributes } = this.props
		const { content } = attributes

		return (
			<div className={className}>
				<RichText
					tagName="p"
					className={`${className}__block`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={['italic', 'bold']}
					onChange={value => setAttributes({ content: value })}
					value={content}
				/>
			</div>
		)
	}
}
