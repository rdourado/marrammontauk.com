const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText } = wp.editor

export default class StayInTouchEdit extends Component {
	renderTitle = () => {
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

	renderLead = () => {
		const { attributes, className, setAttributes } = this.props
		const { lead } = attributes

		return (
			<RichText
				tagName="p"
				className={`${className}__lead`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={['italic', 'link']}
				onChange={value => setAttributes({ lead: value })}
				value={lead}
			/>
		)
	}

	renderFields = () => {
		const { className } = this.props

		return (
			<Fragment>
				<div className={`${className}__field`}>
					<span className={`${className}__input`}>
						{__('Please enter your Email Address', 'marram')}
					</span>
					<button className={`${className}__button`} type="button">
						Submit
					</button>
				</div>
			</Fragment>
		)
	}

	renderLinks = () => {
		const { className } = this.props

		return (
			<ul className={`${className}__links`}>
				<li className={`${className}__link`}>{__('Privacy Policy')}</li>
				<li className={`${className}__link`}>{__('Terms of Service', 'marram')}</li>
			</ul>
		)
	}

	render() {
		const { className } = this.props

		return (
			<div className={className}>
				<div className={`${className}__block`}>
					{this.renderTitle()}
					{this.renderLead()}
					{this.renderFields()}
					{this.renderLinks()}
				</div>
			</div>
		)
	}
}
