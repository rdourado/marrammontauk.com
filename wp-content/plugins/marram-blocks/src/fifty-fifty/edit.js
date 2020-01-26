/**
 * Internal dependencies
 */
import { classAttr } from '..'

const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, URLInput, MediaPlaceholder, BlockControls } = wp.editor
const { Dashicon, IconButton, Button, Toolbar, Tooltip } = wp.components

export default class FiftyFiftyEdit extends Component {
	className = (suffix = '') => {
		const [block, ...names] = this.props.className.split(' ')
		const blockElement = suffix.replace(/\&/g, block)
		const className = blockElement + ' ' + names.join(' ')

		return { className }
	}

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
										imageCaption: null,
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
		const { imageID, imageURL, imageAlt, imageCaption } = attributes
		const hasImage = !!imageID
		const labels = {
			title: __('Image'),
			instructions: __(
				'Drag an image to upload or select a file from your library.',
				'marram'
			),
		}

		return hasImage ? (
			<figure {...classAttr(className, '&__image &__image--preview')}>
				<img src={imageURL} alt={imageAlt} title={__('Edit Image', 'marram')} />
				<RichText
					tagName="figcaption"
					{...classAttr(className, '&__caption')}
					placeholder={__('caption…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					onChange={value => setAttributes({ imageCaption: value })}
					value={imageCaption}
				/>
			</figure>
		) : (
			<MediaPlaceholder
				icon={<Dashicon icon="format-image" />}
				{...classAttr(className, '&__image &__image--holder')}
				labels={labels}
				onSelect={img => {
					console.log(img) // eslint-disable-line
					return setAttributes({
						imageID: img.id,
						imageURL: img.url,
						imageAlt: img.alt,
						imageCaption: img.caption,
					})
				}}
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
				{...classAttr(className, '&__title')}
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
				{...classAttr(className, '&__content')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={['italic', 'bold', 'link']}
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
					{...classAttr(className, '&__button')}
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
					<div {...classAttr(className, '&__block')}>
						<div {...classAttr(className, '&__body')}>
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
