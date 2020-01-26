/**
 * External dependencies
 */
import filter from 'lodash/filter'
import get from 'lodash/get'
import times from 'lodash/times'
/**
 * Internal dependencies
 */
import { classAttr } from '..'
import GalleryImage from '../room-type/gallery-image'

const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, URLInput, MediaPlaceholder, InspectorControls /* BlockControls */ } = wp.editor
const {
	Dashicon,
	IconButton,
	PanelBody,
	RangeControl /* Button, Toolbar, Tooltip */,
} = wp.components

export default class FiftyFiftyEdit extends Component {
	constructor() {
		super(...arguments)
		this.state = { selectedImage: null }
	}

	className = (suffix = '') => {
		const [block, ...names] = this.props.className.split(' ')
		const blockElement = suffix.replace(/\&/g, block)
		const className = blockElement + ' ' + names.join(' ')

		return { className }
	}

	setAttrs = index => attrs => {
		const { attributes, setAttributes } = this.props
		const { entries, numberposts } = attributes
		setAttributes({
			entries: times(numberposts, n => {
				const entry = entries[n] || {}
				return n === index ? { ...entry, ...attrs } : entry
			}),
		})
	}

	onSelectGalleryImage = index => () => {
		if (this.state.selectedImage !== index) {
			this.setState({ selectedImage: index })
		}
	}

	onRemoveGalleryImage = index => () => {
		this.setAttrs(index)({ imageURL: null, imageAlt: null, imageID: null })
		this.setState({ selectedImage: null })
	}

	renderControls = () => {
		const { attributes, setAttributes } = this.props
		const { numberposts } = attributes

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
						<RangeControl
							label={__('Number of posts', 'marram')}
							value={numberposts}
							onChange={value => setAttributes({ numberposts: value })}
							min={1}
							step={1}
							max={10}
						/>
					</PanelBody>
				</InspectorControls>
				{/* {get(entries, `[${i}].imageID`) && (
					<BlockControls key="custom-controls">
						<Toolbar>
							<Tooltip text={__('Remove Image')}>
								<Button
									className="components-icon-button components-toolbar__control"
									onClick={() =>
										this.setAttrs(i)({
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
				)} */}
			</Fragment>
		)
	}

	renderImage = i => {
		const { attributes, className, noticeUI, isSelected } = this.props
		const { entries } = attributes
		const { imageID, imageURL, imageAlt } = entries[i] || {}
		const hasImage = !!imageID
		const labels = {
			title: __('Image'),
			instructions: __(
				'Drag an image to upload or select a file from your library.',
				'marram'
			),
		}

		return hasImage ? (
			<div {...classAttr(className, '&__image &__image--preview')}>
				<GalleryImage
					url={imageURL}
					alt={imageAlt}
					id={imageID}
					isSelected={isSelected && this.state.selectedImage === i}
					onSelect={this.onSelectGalleryImage(i)}
					onRemove={this.onRemoveGalleryImage(i)}
					setAttributes={attrs => console.log('setAttributes : ', attrs)}
				/>
			</div>
		) : (
			<MediaPlaceholder
				icon={<Dashicon icon="format-image" />}
				{...classAttr(className, '&__image &__image--holder')}
				labels={labels}
				onSelect={img =>
					this.setAttrs(i)({
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

	createOnChange = i => (url, post) => {
		console.log('post : ', post)
		this.setAttrs(i)({ buttonURL: url })
	}

	renderURLInput = i => {
		const { attributes, isSelected } = this.props
		const { entries } = attributes
		const { buttonURL } = entries[i] || {}

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
						onChange={this.createOnChange(i)}
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

	renderName = i => {
		const { attributes, className } = this.props
		const name = get(attributes, `entries[${i}].name`)

		return (
			<RichText
				tagName="h3"
				{...classAttr(className, '&__name')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => this.setAttrs(i)({ name: value })}
				value={name}
			/>
		)
	}

	renderContent = i => {
		const { attributes, className } = this.props
		const content = get(attributes, `entries[${i}].content`)

		return (
			<RichText
				tagName="p"
				{...classAttr(className, '&__content')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={['italic', 'bold', 'link']}
				onChange={value => this.setAttrs(i)({ content: value })}
				value={content}
			/>
		)
	}

	renderButton = i => {
		const { attributes, className } = this.props
		const buttonText = get(attributes, `entries[${i}].buttonText`)

		return (
			<Fragment>
				<RichText
					tagName="div"
					{...classAttr(className, '&__button')}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					onChange={value => this.setAttrs(i)({ buttonText: value })}
					value={buttonText}
				/>
				{this.renderURLInput(i)}
			</Fragment>
		)
	}

	render() {
		const { attributes, className } = this.props
		const { numberposts } = attributes

		return (
			<Fragment>
				{this.renderControls()}
				<div className={className}>
					<div className={`${className}__block`}>
						{this.renderTitle()}
						<div className={`${className}__body`}>
							{times(numberposts, i => (
								<div key={`highlights-${i}`} {...classAttr(className, '&__entry')}>
									{this.renderImage(i)}
									{this.renderName(i)}
									{this.renderContent(i)}
									{this.renderButton(i)}
								</div>
							))}
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}
