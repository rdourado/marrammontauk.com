/**
 * External dependencies
 */
import React, { Component } from 'react'
import { func, number } from 'prop-types'
import classnames from 'classnames'
import clickOutside from 'react-click-outside'
import times from 'lodash/times'
/**
 * Internal dependencies
 */
import css from './Guests.module.sass'

class Guests extends Component {
	state = {
		isOpen: false,
	}

	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
	}

	handleClickOutside = () => {
		this.setState({ isOpen: false })
	}

	handleSelect = n => event => {
		event.preventDefault()
		this.props.onSelect(n)
	}

	render() {
		const { isOpen } = this.state
		const { selectedValue } = this.props

		return (
			<div
				className={classnames(css.value, css.guests)}
				onClick={this.handleToggle}
				onKeyPress={this.handleToggle}
				role="button"
				tabIndex="0"
			>
				<label htmlFor="guests" className={css.label}>
					Guests:
				</label>
				<input
					id="guests"
					className={css.input}
					type="number"
					min={1}
					max={10}
					step={1}
					value={selectedValue}
					readOnly
				/>
				<ul className={classnames({ [css.list]: true, [css.active]: isOpen })}>
					{times(10, n => (
						<li key={n} className={css.item}>
							<button className={css.number} onClick={this.handleSelect(n + 1)}>
								{n + 1}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

Guests.propTypes = {
	selectedValue: number.isRequired,
	onSelect: func.isRequired,
}

export default clickOutside(Guests)
