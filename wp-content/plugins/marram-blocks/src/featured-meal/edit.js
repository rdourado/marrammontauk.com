const { __ } = wp.i18n
const { Component } = wp.element
const { RichText } = wp.editor

export default class FeaturedMealEdit extends Component {
	renderTitle() {
		const { attributes, className, setAttributes } = this.props
		const { title } = attributes

		return (
			<RichText
				tagName="h2"
				className={`${className}__title`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ title: value })}
				value={title}
			/>
		)
	}

	renderContent() {
		const { attributes, className, setAttributes } = this.props
		const { content } = attributes

		return (
			<RichText
				tagName="p"
				className={`${className}__content`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ content: value })}
				value={content}
			/>
		)
	}

	renderPortion() {
		const { attributes, className, setAttributes } = this.props
		const { portion } = attributes

		return (
			<RichText
				tagName="p"
				className={`${className}__portion`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ portion: value })}
				value={portion}
			/>
		)
	}

	renderPrice() {
		const { attributes, className, setAttributes } = this.props
		const { price } = attributes

		return (
			<RichText
				tagName="p"
				className={`${className}__price`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ price: value })}
				value={price}
			/>
		)
	}

	render() {
		const { className } = this.props

		return (
			<div className={className}>
				{this.renderTitle()}
				{this.renderContent()}
				<div className={`${className}__info`}>
					{this.renderPortion()} - {this.renderPrice()}
				</div>
			</div>
		)
	}
}
