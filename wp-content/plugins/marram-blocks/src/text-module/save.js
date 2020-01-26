/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const {
		attributes: { content },
	} = props

	return <RichText.Content tagName="p" className={BLOCK} value={content} />
}
