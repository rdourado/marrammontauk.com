/**
 * External dependencies
 */
import moment from 'moment'

const { Component } = wp.element

export default class TextModuleEdit extends Component {
	render() {
		const { className } = this.props
		const today = moment().format('MMMM D, YYYY')

		return <time className={className}>{today}</time>
	}
}
