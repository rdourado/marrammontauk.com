/**
 * External dependencies
 */
import React, { Component } from 'react'
import { arrayOf, func, number } from 'prop-types'
import classnames from 'classnames'
import clickOutside from 'react-click-outside'
import moment from 'moment'
import times from 'lodash/times'
/**
 * Internal dependencies
 */
import css from './Calendar.module.sass'

const sortDates = (dates = []) =>
	dates.sort((a, b) => {
		if (a.isAfter(b, 'day')) return 1
		return a.isBefore(b, 'day') ? -1 : 0
	})

class Calendar extends Component {
	state = {
		hoverDate: null,
		isPicking: false,
		months: this.props.selectedValue.map(moment.unix),
		selectedValue: this.props.selectedValue.map(moment.unix),
		isMobileDisplay: false,
		isOpen: false,
	}

	componentDidMount() {
		this.componentDidUpdate(this.props)
		this.monitorScreenSize()
		window.addEventListener('resize', this.monitorScreenSize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.monitorScreenSize)
	}

	monitorScreenSize = () => {
		const { isMobileDisplay } = this.state
		if (window.innerWidth < 1020 && !isMobileDisplay) {
			this.setState({ isMobileDisplay: true })
		}
		if (window.innerWidth >= 1020 && isMobileDisplay) {
			this.setState({ isMobileDisplay: false })
		}
	}

	componentDidUpdate(prevProps) {
		const [prevStart, prevEnd] = prevProps.selectedValue.map(moment.unix)
		const [start, end] = this.props.selectedValue.map(moment.unix)
		const [monthA, monthB] = this.state.months

		if (!prevStart.isSame(start, 'day') || !prevEnd.isSame(end, 'day')) {
			this.setState({
				months: start.isSame(end, 'month')
					? [start, moment(end).add(1, 'month')]
					: [start, end],
				selectedValue: [start, end],
			})
		} else if (monthA.isSame(monthB, 'month')) {
			this.setState({ months: [monthA, moment(monthB).add(1, 'month')] })
		}
	}

	updateMonth = (dir = 1) => () => {
		const { months: state } = this.state
		const months = state.map(m => moment(m).add(dir, 'M'))

		this.setState({ months })
	}

	selectDate = date => () => {
		const {
			isPicking,
			selectedValue: [first],
		} = this.state
		const selectedValue = sortDates([!isPicking ? date : first, date])

		this.setState(
			{
				selectedValue,
				isPicking: !isPicking,
				hoverDate: !isPicking ? date : null,
				isOpen: !isPicking,
			},
			() => {
				const { onSelect } = this.props
				const [firstDate, lastDate] = selectedValue
				onSelect([firstDate.unix(), lastDate.unix()])
			}
		)
	}

	setHoverDate = hoverDate => () => {
		const { isPicking } = this.state

		if (isPicking) this.setState({ hoverDate })
	}

	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	handleClickOutside = () => {
		this.setState({ isOpen: false })
	}

	renderHeader = (cal = 0) => {
		const { months } = this.state

		return (
			<caption>
				<div className={css.header}>
					<button type="button" className={css.prev} onClick={this.updateMonth(-1)}>
						«
					</button>
					<strong className={css.month}>{months[cal].format('MMMM YYYY')}</strong>
					<button type="button" className={css.next} onClick={this.updateMonth(1)}>
						»
					</button>
				</div>
			</caption>
		)
	}

	renderWeekDays = () => (
		<thead>
			<tr>{times(7, this.renderWeekDay)}</tr>
		</thead>
	)

	renderWeekDay = weekday => {
		const day = moment().weekday(weekday)

		return (
			<th key={day.format('ddd')} scope="col" className={css.weekdayname}>
				{day.format('ddd').substr(0, 1)}
			</th>
		)
	}

	renderWeeks = (cal = 0) => {
		const { months } = this.state
		const firstDay = moment(months[cal])
			.startOf('M')
			.weekday(0)

		return <tbody>{times(6, this.renderWeek(firstDay, cal))}</tbody>
	}

	renderWeek = (firstDay, cal = 0) => count => {
		const firstWeekDay = moment(firstDay).add(count, 'week')

		return <tr key={firstWeekDay.valueOf()}>{times(7, this.renderDate(firstWeekDay, cal))}</tr>
	}

	renderDate = (firstWeekDay, cal = 0) => count => {
		const {
			months,
			hoverDate,
			selectedValue: [first, last],
		} = this.state
		const { validateDate } = this.props
		const day = moment(firstWeekDay).add(count, 'day')
		const month = months[cal]
		const [firstDate, lastDate] = sortDates([first, hoverDate || last])

		return (
			<td
				key={day.unix()}
				className={classnames({
					[css.day]: true,
					[css.today]: day.isSame(moment(), 'day'),
					[css.sunday]: day.weekday() === 0,
					[css.saturday]: day.weekday() === 6,
					[css.inrange]: day.isBetween(firstDate, lastDate),
					[css.firstday]: day.isSame(firstDate, 'day'),
					[css.lastday]: day.isSame(lastDate, 'day'),
					[css.firstvalidday]: !moment(day)
						.add(-1, 'day')
						.isSame(month, 'M'),
					[css.lastvalidday]: !moment(day)
						.add(1, 'day')
						.isSame(month, 'M'),
					[css.out]: !day.isSame(month, 'M'),
					[css.invalid]: !validateDate(day),
				})}
			>
				<button
					type="button"
					className={css.cellbtn}
					onMouseOver={this.setHoverDate(day)}
					onFocus={this.setHoverDate(day)}
					onClick={this.selectDate(day)}
				>
					{day.format('D')}
				</button>
			</td>
		)
	}

	renderValues = () => {
		const {
			selectedValue: [first, last],
			isMobileDisplay,
		} = this.state

		return (
			<>
				<div
					className={classnames(css.value, css.checkin)}
					onClick={this.handleToggle}
					onKeyPress={this.handleToggle}
					role="button"
					tabIndex="0"
				>
					<label htmlFor="first-date" className={css.label}>
						{isMobileDisplay ? 'Dates:' : 'Check in:'}
					</label>
					<input
						id="first-date"
						className={css.input}
						type="text"
						value={
							isMobileDisplay
								? first.format('MM/DD/YY') + ' – ' + last.format('MM/DD/YY')
								: first.format('MM/DD/YY')
						}
						readOnly
					/>
				</div>
				{!isMobileDisplay && (
					<div
						className={classnames(css.value, css.checkout)}
						onClick={this.handleToggle}
						onKeyPress={this.handleToggle}
						role="button"
						tabIndex="0"
					>
						<label htmlFor="last-date" className={css.label}>
							Check out:
						</label>
						<input
							id="last-date"
							className={css.input}
							type="text"
							value={last.format('MM/DD/YY')}
							readOnly
						/>
					</div>
				)}
			</>
		)
	}

	render() {
		const { months, isOpen } = this.state

		return (
			<div className={css.main}>
				{this.renderValues()}
				{times(months.length, m => (
					<div
						key={m}
						className={classnames({ [css.calendar]: true, [css.active]: isOpen })}
					>
						<table className={css.table}>
							{this.renderHeader(m)}
							{this.renderWeekDays()}
							{this.renderWeeks(m)}
						</table>
					</div>
				))}
			</div>
		)
	}
}

Calendar.propTypes = {
	onSelect: func,
	selectedValue: arrayOf(number),
	validateDate: func,
}
Calendar.defaultProps = {
	onSelect: () => {},
	selectedValue: [moment().unix(), moment().unix()],
	validateDate: () => true,
}

export default clickOutside(Calendar)
