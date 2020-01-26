/**
 * External dependencies
 */
import times from 'lodash/times'
/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const {
		attributes: { entries, numberposts, title },
	} = props

	return (
		<div className={BLOCK}>
			<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />

			<div className={`${BLOCK}__body`}>
				{times(numberposts, n => {
					const { name, content, imageID, imageURL, imageAlt, buttonURL, buttonText } =
						entries[n] || {}

					return (
						<article className={`${BLOCK}__entry`}>
							{imageURL && (
								<figure className={`${BLOCK}__image`}>
									<RichText.Content
										tagName="img"
										src={imageURL}
										alt={imageAlt}
										data-id={imageID}
										className={`${BLOCK}__image`}
									/>
								</figure>
							)}
							<RichText.Content
								tagName="h3"
								className={`${BLOCK}__name`}
								value={name}
							/>
							<RichText.Content
								tagName="p"
								className={`${BLOCK}__content`}
								value={content}
							/>
							{buttonURL && buttonText && (
								<RichText.Content
									tagName="a"
									className={`${BLOCK}__button`}
									value={buttonText}
									href={buttonURL}
								/>
							)}
						</article>
					)
				})}
			</div>
		</div>
	)
}
