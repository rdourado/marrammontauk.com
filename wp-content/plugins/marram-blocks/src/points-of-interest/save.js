/**
 * External dependencies
 */
import compact from 'lodash/compact'
import map from 'lodash/map'
import times from 'lodash/times'
import uniq from 'lodash/uniq'
/**
 * Internal dependencies
 */
import { BLOCK } from './types'

const { RichText } = wp.editor

export default function save(props) {
	const { attributes } = props
	const { entries, numberposts, title, lead } = attributes
	const groups = uniq(compact(map(entries, 'group')))

	return (
		<div className={BLOCK}>
			<RichText.Content tagName="h2" className={`${BLOCK}__title`} value={title} />
			<RichText.Content tagName="p" className={`${BLOCK}__lead`} value={lead} />
			{!!groups.length && (
				<ul className={`${BLOCK}__groups`}>
					{groups.map((group, i) => (
						<li key={`${group}-${i}`} className={`${BLOCK}__group-item`}>
							<button type="button" className={`${BLOCK}__group-button`}>
								{group}
							</button>
						</li>
					))}
				</ul>
			)}
			<div className={`${BLOCK}__body`}>
				<ul className={`${BLOCK}__list`}>
					{times(numberposts, n => {
						const { name, content, latlng, group, buttonURL, buttonText } =
							entries[n] || {}

						return (
							<li
								className={`${BLOCK}__entry`}
								data-latlng={latlng}
								data-group={group}
							>
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
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
