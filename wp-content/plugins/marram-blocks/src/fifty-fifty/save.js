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
		imageID,
		imageURL,
		imageAlt,
		imageCaption,
		buttonURL,
		buttonText,
	} = attributes

	return (
		<article className={BLOCK}>
			<div className={`${BLOCK}__body`}>
				<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />
				<RichText.Content tagName="p" className={`${BLOCK}__content`} value={content} />
				{buttonURL && buttonText && (
					<RichText.Content
						tagName="a"
						className={`${BLOCK}__button`}
						value={buttonText}
						href={buttonURL}
					/>
				)}
			</div>
			{imageURL && (
				<figure className={`${BLOCK}__image`}>
					<RichText.Content
						tagName="img"
						src={imageURL}
						alt={imageAlt}
						data-id={imageID}
					/>
					{!!imageCaption && (
						<RichText.Content
							tagName="figcaption"
							className={`${BLOCK}__caption`}
							value={imageCaption}
						/>
					)}
				</figure>
			)}
		</article>
	)
}
