const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText } = wp.editor

export default class EventFormEdit extends Component {
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
				<div className={`${className}__side`}>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Full Name:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Company:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Adress:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('City:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('State:', 'marram')}
						/>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('ZIP:', 'marram')}
						/>
					</div>
				</div>
				<div className={`${className}__side`}>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Email:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Phone:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="date"
							readOnly
							placeholder={__('Event Dates:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<select
							className={`${className}__input`}
							readOnly
							placeholder={__('Event Type:', 'marram')}
						/>
					</div>
					<div className={`${className}__field`}>
						<input
							className={`${className}__input`}
							type="text"
							readOnly
							placeholder={__('Number of Guests:', 'marram')}
						/>
					</div>
				</div>

				<div className={`${className}__wide_field`}>
					<input
						className={`${className}__input`}
						type="text"
						readOnly
						placeholder={__('Tell us about your event...', 'marram')}
					/>
				</div>

				<button className={`${className}__button`} type="button">
					Inquire About Your Event
				</button>
			</Fragment>
		)
	}

	render() {
		const { className } = this.props

		return (
			<div className={className}>
				{this.renderTitle()}
				{this.renderLead()}
				{this.renderFields()}
			</div>
		)
	}
}
