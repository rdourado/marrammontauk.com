const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, URLInput, MediaPlaceholder, BlockControls } = wp.editor
const { Dashicon, IconButton, Button, Toolbar, Tooltip } = wp.components

export default class FiftyFiftyEdit extends Component {
	renderControls = () => {
		const { attributes, setAttributes } = this.props
		const { imageID } = attributes

		return (
			imageID && (
				<BlockControls key="custom-controls">
					<Toolbar>
						<Tooltip text={__('Remove Image')}>
							<Button
								className="components-icon-button components-toolbar__control"
								onClick={() =>
									setAttributes({
										imageID: null,
										imageURL: null,
										imageAlt: null,
									})
								}
							>
								<Dashicon icon="dismiss" />
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>
			)
		)
	}

	renderImage = () => {
		const { attributes, className, setAttributes, noticeUI } = this.props
		const { imageID, imageURL, imageAlt } = attributes
		const hasImage = !!imageID
		const labels = {
			title: __('Image'),
			instructions: __(
				'Drag an image to upload or select a file from your library.',
				'marram'
			),
		}

		return hasImage ? (
			<div className={`${className}__image ${className}__image--preview`}>
				<img src={imageURL} alt={imageAlt} title={__('Edit Image', 'marram')} />
			</div>
		) : (
			<MediaPlaceholder
				icon={<Dashicon icon="format-image" />}
				className={`${className}__image ${className}__image--holder`}
				labels={labels}
				onSelect={img =>
					setAttributes({
						imageID: img.id,
						imageURL: img.url,
						imageAlt: img.alt,
					})
				}
				accept="image/*"
				allowedTypes={['image']}
				notices={noticeUI}
			/>
		)
	}

	renderURLInput = () => {
		const { attributes, setAttributes, isSelected } = this.props
		const { buttonURL } = attributes

		return (
			isSelected && (
				<form
					className="block-library-button__inline-link"
					onSubmit={event => event.preventDefault()}
				>
					<Dashicon icon="admin-links" />
					<URLInput
						value={buttonURL}
						autoFocus={false} // eslint-disable-line jsx-a11y/no-autofocus
						onChange={value => setAttributes({ buttonURL: value })}
					/>
					<IconButton icon="editor-break" label={__('Apply')} type="submit" />
				</form>
			)
		)
	}

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

	renderContent = () => {
		const { attributes, className, setAttributes } = this.props
		const { content } = attributes

		return (
			<RichText
				tagName="p"
				className={`${className}__content`}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={['italic', 'link']}
				onChange={value => setAttributes({ content: value })}
				value={content}
			/>
		)
	}

	renderButton = () => {
		const { attributes, className, setAttributes } = this.props
		const { buttonText } = attributes

		return (
			<Fragment>
				<RichText
					tagName="div"
					className={`${className}__button`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					onChange={value => setAttributes({ buttonText: value })}
					value={buttonText}
				/>
				{this.renderURLInput()}
			</Fragment>
		)
	}

	render() {
		const { className } = this.props

		return (
			<Fragment>
				{this.renderControls()}
				<div className={className}>
					<div className={`${className}__block`}>
						<div className={`${className}__body`}>
							{this.renderTitle()}
							{this.renderContent()}
							{this.renderButton()}
						</div>
						{this.renderImage()}
					</div>
				</div>
			</Fragment>
		)
	}
}
