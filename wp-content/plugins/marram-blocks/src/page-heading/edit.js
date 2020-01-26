const { __ } = wp.i18n
const { Component } = wp.element
const { RichText } = wp.editor

export default class PageHeadingEdit extends Component {
	render() {
		const { attributes, className, setAttributes } = this.props
		const { title, headline } = attributes

		return (
			<div className={`${className}`}>
				<div className={`${className}__block`}>
					<RichText
						tagName="h1"
						className={`${className}__title`}
						placeholder={__('Add title…', 'marram')}
						keepPlaceholderOnFocus
						formattingControls={['italic']}
						onChange={value => setAttributes({ title: value })}
						value={title}
					/>
					<RichText
						tagName="p"
						className={`${className}__headline`}
						placeholder={__('Add headline…', 'marram')}
						keepPlaceholderOnFocus
						formattingControls={['italic']}
						onChange={value => setAttributes({ headline: value })}
						value={headline}
					/>
				</div>
			</div>
		)
	}
}
