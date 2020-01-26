/**
 * Internal dependencies
 */
import { classAttr } from '..'
/**
 * External dependencies
 */
import map from 'lodash/map'
import get from 'lodash/get'
import times from 'lodash/times'
import uniq from 'lodash/uniq'

const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, URLInput, InspectorControls } = wp.editor
const { Dashicon, IconButton, PanelBody, RangeControl, TextControl } = wp.components

export default class FiftyFiftyEdit extends Component {
	className = (suffix = '') => {
		const [block, ...names] = this.props.className.split(' ')
		const blockElement = suffix.replace(/\&/g, block)
		const className = blockElement + ' ' + names.join(' ')

		return { className }
	}

	setAttrs = index => attrs => {
		const { attributes, setAttributes } = this.props
		const { entries, numberposts } = attributes

		setAttributes({
			entries: times(numberposts, n => {
				const entry = entries[n] || {}
				return n === index ? { ...entry, ...attrs } : entry
			}),
		})
	}

	renderControls = () => {
		const { attributes, setAttributes } = this.props
		const { numberposts, entries } = attributes

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
						<RangeControl
							label={__('Number of posts', 'marram')}
							value={numberposts}
							onChange={value => setAttributes({ numberposts: value })}
							min={1}
							step={1}
							max={30}
						/>
						{times(numberposts, n => (
							<Fragment key={`poi-${n}`}>
								<TextControl
									label={__('Group', 'marram')}
									help={get(entries, `[${n}].name`)}
									value={get(entries, `[${n}].group`)}
									onChange={value => this.setAttrs(n)({ group: value })}
								/>
								<TextControl
									label={__('Latitude/Longitude', 'marram')}
									help={get(entries, `[${n}].name`)}
									value={get(entries, `[${n}].latlng`)}
									onChange={value =>
										this.setAttrs(n)({
											latlng: value.replace(/[^0-9\.\,\-]/gi, ''),
										})
									}
								/>
							</Fragment>
						))}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		)
	}

	renderTitle = () => {
		const { attributes, className, setAttributes } = this.props
		const { title } = attributes

		return (
			<RichText
				tagName="h2"
				{...classAttr(className, '&__title')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ title: value })}
				value={title}
			/>
		)
	}

	renderLead = () => {
		const { attributes, className, setAttributes } = this.props
		const { lead } = attributes

		return (
			<RichText
				tagName="p"
				{...classAttr(className, '&__lead')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => setAttributes({ lead: value })}
				value={lead}
			/>
		)
	}

	renderGroups = () => {
		const { attributes, className } = this.props
		const groups = uniq(map(attributes.entries, 'group'))

		return (
			<ul {...classAttr(className, '&__groups')}>
				{groups.map((x, i) => (
					<li key={`${x}-${i}`}>{x}</li>
				))}
			</ul>
		)
	}

	renderName = i => {
		const { attributes, className } = this.props
		const name = get(attributes, `entries[${i}].name`)

		return (
			<RichText
				tagName="h3"
				{...classAttr(className, '&__name')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={[]}
				onChange={value => this.setAttrs(i)({ name: value })}
				value={name}
			/>
		)
	}

	renderContent = i => {
		const { attributes, className } = this.props
		const content = get(attributes, `entries[${i}].content`)

		return (
			<RichText
				tagName="p"
				{...classAttr(className, '&__content')}
				placeholder={__('Add text…', 'marram')}
				keepPlaceholderOnFocus
				formattingControls={['italic', 'bold', 'link']}
				onChange={value => this.setAttrs(i)({ content: value })}
				value={content}
			/>
		)
	}

	renderButton = i => {
		const { attributes, className } = this.props
		const buttonText = get(attributes, `entries[${i}].buttonText`)

		return (
			<Fragment>
				<RichText
					tagName="div"
					{...classAttr(className, '&__button')}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					onChange={value => this.setAttrs(i)({ buttonText: value })}
					value={buttonText}
				/>
				{this.renderURLInput(i)}
			</Fragment>
		)
	}

	renderURLInput = i => {
		const { attributes, isSelected } = this.props
		const { entries } = attributes
		const { buttonURL } = entries[i] || {}

		return (
			isSelected && (
				<form
					className="block-library-button__inline-link"
					onSubmit={event => event.preventDefault()}
				>
					<Dashicon icon="admin-links" />
					<URLInput
						value={buttonURL}
						autoFocus={false} // eslint-disable-line jsx-a11y/no-autofocus
						onChange={value => this.setAttrs(i)({ buttonURL: value })}
					/>
					<IconButton icon="editor-break" label={__('Apply')} type="submit" />
				</form>
			)
		)
	}

	render() {
		const { attributes, className } = this.props
		const { numberposts } = attributes

		return (
			<Fragment>
				{this.renderControls()}
				<div className={className}>
					<div {...classAttr(className, '&__block')}>
						{this.renderTitle()}
						{this.renderLead()}
						{this.renderGroups()}
						<div {...classAttr(className, '&__body')}>
							<div {...classAttr(className, '&__map')} />
							<ul {...classAttr(className, '&__list')}>
								{times(numberposts, i => (
									<li
										key={`points-of-interest-${i}`}
										{...classAttr(className, '&__entry')}
									>
										{this.renderName(i)}
										{this.renderContent(i)}
										{this.renderButton(i)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}
