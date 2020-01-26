/**
 * External dependencies
 */
import classnames from 'classnames'
/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor
const { RawHTML } = wp.element

export default function PlaylistSave({ attributes }) {
	const { collapsed, name, description, meta, embed } = attributes

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
				<RichText.Content tagName="p" className={`${BLOCK}__meta`} value={meta} />
				<RichText.Content
					tagName="p"
					className={`${BLOCK}__description`}
					value={description}
				/>
				<div className={`${BLOCK}__embed`}>
					<RawHTML>{embed}</RawHTML>
				</div>
			</div>
		</article>
	)
}
