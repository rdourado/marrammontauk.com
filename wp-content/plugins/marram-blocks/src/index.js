/**
 * External dependencies
 */
import ElementQueries from 'css-element-queries/src/ElementQueries'
/**
 * Internal dependencies
 */
import './wp'
// import './featured-meal'
import './fifty-fifty'
import './product'
import './happenings'
import './clippings'
// import './galleries'
import './nav-menu'
import './page-heading'
import './room-type'
import './rooms-group'
import './rotating-quotes'
import './special-offer'
import './stay-in-touch'
import './text-module'
import './post-date'
import './highlights'
import './points-of-interest'
import './playlist'

ElementQueries.listen()

export const classAttr = (classNames, suffix = '') => {
	const [block, ...names] = classNames.split(' ')
	const blockElement = suffix.replace(/\&/g, block)
	const className = `${blockElement} ` + names.join(' ')

	return { className }
}
