/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const { attributes } = props
	const {
		title,
		content,
		description,
		meta,
		imageID,
		imageURL,
		imageAlt,
		buttonURL,
		buttonText,
	} = attributes

	return (
		<article className={BLOCK}>
			{imageURL && (
				<figure className={`${BLOCK}__image`}>
					<RichText.Content
						tagName="img"
						src={imageURL}
						alt={imageAlt}
						data-id={imageID}
					/>
				</figure>
			)}
			<div className={`${BLOCK}__body`}>
				<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />
				<RichText.Content tagName="p" className={`${BLOCK}__content`} value={content} />

				<RichText.Content tagName="p" className={`${BLOCK}__title-2`} value={title} />
				<RichText.Content
					tagName="p"
					className={`${BLOCK}__description`}
					value={description}
				/>
				<RichText.Content tagName="p" className={`${BLOCK}__meta`} value={meta} />

				{buttonURL && buttonText && (
					<RichText.Content
						tagName="a"
						className={`${BLOCK}__button`}
						value={buttonText}
						href={buttonURL}
					/>
				)}
			</div>
		</article>
	)
}
