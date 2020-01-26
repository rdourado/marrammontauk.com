/**
 * External dependencies
 */
import React, { Component } from 'react'
import { object } from 'prop-types'
import $ from 'jQuery'
import classnames from 'classnames'
import moment from 'moment'
/**
 * Internal dependencies
 */
import css from './Reserve.module.sass'
import Calendar from './Calendar'
import Guests from './Guests'

class Reserve extends Component {
	state = {
		date: [moment().unix(), moment().unix()],
		guests: 1,
		isOpen: false,
	}

	componentDidMount() {
		const sel = 'mtk-js-toggle-reserve-form'
		$(`a.${sel}, .${sel} > a`).on('click', event => {
			event.preventDefault()
			this.setState({ isOpen: !this.state.isOpen })
		})
	}

	validateDate = momentDate => momentDate.isSameOrAfter(moment(), 'day')

	handleSubmit = event => {
		event.preventDefault()

		const id = 15941
		const adults = this.state.guests
		const [inDate, outDate] = this.state.date.map(moment.unix)
		const checkin = inDate.format('MM/DD/YYYY')
		const checkout = outDate.format('MM/DD/YYYY')

		window.open(
			`https://res.windsurfercrs.com/ibe/index.aspx?nono=1&propertyID=${id}&adults=${adults}&checkin=${checkin}&checkout=${checkout}`,
			'_blank'
		)
	}

	render() {
		const { date, guests, isOpen } = this.state

		return (
			<form
				className={classnames({ [css.main]: true, [css.active]: isOpen })}
				onSubmit={this.handleSubmit}
			>
				<Calendar
					validateDate={this.validateDate}
					selectedValue={date}
					onSelect={value => this.setState({ date: value })}
				/>
				<Guests
					selectedValue={guests}
					onSelect={value => this.setState({ guests: value })}
				/>
				<button type="submit" className={css.button}>
					Check Availability
				</button>
			</form>
		)
	}
}

Reserve.propTypes = {
	css: object,
}

export default Reserve
