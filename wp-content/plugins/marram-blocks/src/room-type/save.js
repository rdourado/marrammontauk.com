/**
 * External dependencies
 */
import classnames from 'classnames'
/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function RoomTypesSave({ attributes }) {
	const { collapsed, name, description, gallery } = attributes
	const features = Array.from(Array(3)).map((_, n) => ({
		title: attributes[`featuresTitle${n + 1}`],
		list: attributes[`featuresList${n + 1}`],
	}))

	return (
		<article
			className={classnames({
				[BLOCK]: true,
				[`${BLOCK}--active`]: !collapsed,
			})}
		>
			<header className={`${BLOCK}__header`}>
				<RichText.Content tagName="h3" value={name} className={`${BLOCK}__name`} />
			</header>
			<div className={`${BLOCK}__content`}>
				<RichText.Content
					tagName="p"
					className={`${BLOCK}__description`}
					value={description}
				/>
				<div className={`${BLOCK}__all-features`}>
					{features.map(renderFeature).filter(Boolean)}
				</div>
			</div>
			{renderGallery(gallery)}
		</article>
	)
}

const renderFeature = ({ title, list }, index) =>
	title &&
	list && (
		<div className={`${BLOCK}__features`} key={index}>
			<RichText.Content tagName="h4" className={`${BLOCK}__features-title`} value={title} />
			<RichText.Content
				tagName="ul"
				multiline="li"
				className={`${BLOCK}__features-list`}
				value={list}
			/>
		</div>
	)

const renderGallery = (gallery = []) => (
	<div className={`${BLOCK}__gallery`}>
		{gallery.map(({ id, alt, url, caption }) => (
			<div key={id || url} className="blocks-gallery-item">
				<figure>
					<img src={url} alt={alt} data-id={id} />
					{caption && <RichText.Content tagName="figcaption" value={caption} />}
				</figure>
			</div>
		))}
	</div>
)
