/**
 * External dependencies
 */
import filter from 'lodash/filter'
import get from 'lodash/get'
import pick from 'lodash/pick'
import times from 'lodash/times'
/**
 * Internal dependencies
 */
import { galleryIcon } from './icons'
import GalleryImage from './gallery-image'

const { Component, Fragment } = wp.element
const { RichText, InspectorControls, MediaPlaceholder, BlockIcon, mediaUpload } = wp.editor
const {
	PanelBody,
	TextControl,
	ToggleControl,
	withNotices,
	FormFileUpload,
	DropZone,
} = wp.components
const { __, sprintf } = wp.i18n

export const pickRelevantMediaFiles = image => ({
	...pick(image, ['alt', 'id', 'caption']),
	url: get(
		image,
		['sizes', 'large', 'url'],
		get(image, ['media_details', 'sizes', 'large', 'source_url'], image.url)
	),
})

class RoomTypesEdit extends Component {
	constructor() {
		super(...arguments)
		this.state = { selectedImage: null }
	}

	uploadFromFiles = event => {
		this.addFiles(event.target.files)
	}

	addFiles = files => {
		const currentImages = this.props.attributes.gallery || []
		const { setAttributes, noticeOperations } = this.props

		mediaUpload({
			allowedTypes: ['image'],
			filesList: files,
			onFileChange: images => {
				const imagesNormalized = images.map(image => pickRelevantMediaFiles(image))
				setAttributes({
					gallery: currentImages.concat(imagesNormalized),
				})
			},
			onError: noticeOperations.createErrorNotice,
		})
	}

	setImageAttributes = (index, attributes) => {
		const {
			setAttributes,
			attributes: { gallery },
		} = this.props
		if (!gallery[index]) {
			return
		}
		setAttributes({
			gallery: [
				...gallery.slice(0, index),
				{ ...gallery[index], ...attributes },
				...gallery.slice(index + 1),
			],
		})
	}

	onSelectGallery = images => {
		const { setAttributes } = this.props
		setAttributes({ gallery: images.map(pickRelevantMediaFiles) })
	}

	onRemoveGalleryImage = index => {
		const { setAttributes } = this.props
		return () => {
			const gallery = filter(this.props.attributes.gallery, (img, i) => index !== i)
			this.setState({ selectedImage: null })
			setAttributes({ gallery })
		}
	}

	onSelectGalleryImage = index => () => {
		if (this.state.selectedImage !== index) {
			this.setState({ selectedImage: index })
		}
	}

	updateFeature = (index, prop) => value => {
		const { setAttributes } = this.props
		return setAttributes({ [`features${prop}${index + 1}`]: value })
	}

	renderControls = () => {
		const { attributes, setAttributes } = this.props
		const { id, collapsed } = attributes
		const toggleHelp = collapsed
			? __('Page will load with room details collapsed.', 'marram')
			: __('Toggle to collapse details on page load.', 'marram')

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<TextControl
						label={__('External ID', 'marram')}
						value={id}
						onChange={value => setAttributes({ id: value })}
					/>
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

	renderFeature = index => {
		const { attributes, className } = this.props

		return (
			<div key={index} className={`${className}__features`}>
				<RichText
					tagName="h3"
					className={`${className}__features-title`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					value={get(attributes, `featuresTitle${index + 1}`)}
					onChange={this.updateFeature(index, 'Title')}
				/>
				<RichText
					tagName="ul"
					multiline="li"
					className={`${className}__features-list`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					value={get(attributes, `featuresList${index + 1}`)}
					onChange={this.updateFeature(index, 'List')}
				/>
			</div>
		)
	}

	renderGallery = () => {
		const { attributes, isSelected, className, noticeOperations, noticeUI } = this.props
		const { gallery } = attributes

		if (gallery.length === 0) {
			return (
				<MediaPlaceholder
					icon={<BlockIcon icon={galleryIcon} />}
					className={`${className}__gallery ${className}__gallery--holder`}
					labels={{
						title: __('Gallery'),
						instructions: __(
							'Drag images, upload new ones or select files from your library.'
						),
					}}
					onSelect={this.onSelectGallery}
					accept="image/*"
					allowedTypes={['image']}
					multiple
					notices={noticeUI}
					onError={noticeOperations.createErrorNotice}
				/>
			)
		}

		return (
			<Fragment>
				{noticeUI}
				<div className={`${className}__gallery`}>
					{<DropZone onFilesDrop={this.addFiles} />}
					{gallery.map((img, index) => {
						const ariaLabel = sprintf(
							__('image %1$d of %2$d in gallery'),
							index + 1,
							gallery.length
						)

						return (
							<div className="blocks-gallery-item" key={img.id || img.url}>
								<GalleryImage
									url={img.url}
									alt={img.alt}
									id={img.id}
									isSelected={isSelected && this.state.selectedImage === index}
									onRemove={this.onRemoveGalleryImage(index)}
									onSelect={this.onSelectGalleryImage(index)}
									setAttributes={attrs => this.setImageAttributes(index, attrs)}
									caption={img.caption}
									aria-label={ariaLabel}
								/>
							</div>
						)
					})}
					{isSelected && (
						<div className="blocks-gallery-item has-add-item-button">
							<FormFileUpload
								multiple
								isLarge
								className="block-library-gallery-add-item-button"
								onChange={this.uploadFromFiles}
								accept="image/*"
								icon="insert"
							>
								{__('Upload an image')}
							</FormFileUpload>
						</div>
					)}
				</div>
			</Fragment>
		)
	}

	render() {
		const { attributes, className, setAttributes } = this.props
		const { name, description } = attributes

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
						className={`${className}__description`}
						placeholder={__('Add text…', 'marram')}
						keepPlaceholderOnFocus
						value={description}
						onChange={value => setAttributes({ description: value })}
					/>
					<div className={`${className}__all-features`}>
						{times(3, this.renderFeature)}
					</div>
				</div>
				{this.renderGallery()}
			</div>
		)
	}
}

export default withNotices(RoomTypesEdit)
