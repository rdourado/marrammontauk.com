const { Component } = wp.element
const { RichText, InspectorControls } = wp.editor
const { PanelBody, ToggleControl, withNotices } = wp.components
const { __ } = wp.i18n

class RoomTypesEdit extends Component {
	constructor() {
		super(...arguments)

		this.renderControls = this.renderControls.bind(this)
	}

	renderControls() {
		const { attributes, setAttributes } = this.props
		const { collapsed } = attributes
		const toggleHelp = collapsed
			? __('Page will load with room details collapsed.', 'marram')
			: __('Toggle to collapse details on page load.', 'marram')

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<ToggleControl
						label={__('Collapsed', 'marram')}
						checked={!!collapsed}
						onChange={() => setAttributes({ collapsed: !collapsed })}
						help={toggleHelp}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	render() {
		const { attributes, className, setAttributes } = this.props
		const { name } = attributes

		return (
			<div className={className}>
				{this.renderControls()}
				<RichText
					tagName="h3"
					className={`${className}__name`}
					placeholder={__('Add text…', 'marram')}
					keepPlaceholderOnFocus
					formattingControls={[]}
					value={name}
					onChange={value => setAttributes({ name: value })}
				/>
			</div>
		)
	}
}

export default withNotices(RoomTypesEdit)
