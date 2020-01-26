/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const {
		attributes: { title, content, portion, price },
	} = props

	return (
		<section className={BLOCK}>
			<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />
			<RichText.Content tagName="p" className={`${BLOCK}__content`} value={content} />
			<RichText.Content tagName="p" className={`${BLOCK}__portion`} value={portion} />
			<RichText.Content tagName="p" className={`${BLOCK}__price`} value={price} />
		</section>
	)
}
