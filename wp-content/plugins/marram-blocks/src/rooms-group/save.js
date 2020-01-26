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
	const { collapsed, name } = attributes

	return (
		<div
			className={classnames({
				[BLOCK]: true,
				[`${BLOCK}--active`]: !collapsed,
			})}
		>
			<div className={`${BLOCK}__header`}>
				<RichText.Content tagName="h3" className={`${BLOCK}__name`} value={name} />
			</div>
		</div>
	)
}
