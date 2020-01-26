/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const {
		attributes: { title, lead },
	} = props

	return (
		<section className={BLOCK}>
			<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />
			<RichText.Content tagName="p" className={`${BLOCK}__lead`} value={lead} />
			<div />
		</section>
	)
}
