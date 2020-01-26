/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const { attributes } = props
	const { quotes } = attributes

	return (
		<div className={BLOCK}>
			{quotes.map(({ value, citation }, index) => (
				<blockquote className={`${BLOCK}__quote`} key={index}>
					<RichText.Content multiline="p" value={value} />
					<RichText.Content
						tagName="cite"
						className={`${BLOCK}__source`}
						value={citation}
					/>
				</blockquote>
			))}
		</div>
	)
}
