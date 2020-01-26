/**
 * External dependencies
 */
import { times, get, set } from 'lodash'

const { Component } = wp.element
const { RichText, InspectorControls } = wp.editor
const { PanelBody, RangeControl } = wp.components
const { __ } = wp.i18n

export default class RotatingQuotesEdit extends Component {
	constructor() {
		super(...arguments)

		this.updateQuote = this.updateQuote.bind(this)
		this.renderControls = this.renderControls.bind(this)
	}

	updateQuote(index, prop, value) {
		const { attributes } = this.props
		const quotes = [...attributes.quotes]
		set(quotes, `[${index}].${prop}`, value)
		return { quotes }
	}

	renderControls() {
		const { attributes, setAttributes } = this.props
		const { quotesToShow } = attributes

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<RangeControl
						label={__('Number of quotes', 'marram')}
						value={quotesToShow}
						onChange={value => setAttributes({ quotesToShow: value })}
						min={1}
						max={4}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	render() {
		const { attributes, className, setAttributes } = this.props
		const { quotes, quotesToShow } = attributes

		return (
			<div className={className}>
				{this.renderControls()}
				{times(quotesToShow, num => (
					<blockquote className={`${className}__quote`} key={num}>
						<RichText
							tagName="div"
							multiline="p"
							placeholder={__('Write quote…', 'marram')}
							keepPlaceholderOnFocus
							formattingControls={[]}
							onChange={value => setAttributes(this.updateQuote(num, 'value', value))}
							value={get(quotes, `[${num}].value`)}
						/>
						<RichText
							tagName="cite"
							className={`${className}__source`}
							placeholder={__('Write citation…', 'marram')}
							keepPlaceholderOnFocus
							formattingControls={[]}
							onChange={value =>
								setAttributes(this.updateQuote(num, 'citation', value))
							}
							value={get(quotes, `[${num}].citation`)}
						/>
					</blockquote>
				))}
			</div>
		)
	}
}
