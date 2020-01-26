/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const {
		attributes: { title, headline },
	} = props

	return (
		<div className={BLOCK}>
			<RichText.Content tagName="h1" className={`${BLOCK}__title`} value={title} />
			<RichText.Content tagName="p" className={`${BLOCK}__headline`} value={headline} />
		</div>
	)
}
