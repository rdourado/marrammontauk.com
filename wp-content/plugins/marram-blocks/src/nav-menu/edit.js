const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { PanelBody, SelectControl } = wp.components
const { InspectorControls } = wp.editor
const { withSelect } = wp.data

class NavMenuEdit extends Component {
	renderControl = () => {
		const { attributes, setAttributes, menus } = this.props
		const { menuID } = attributes
		const menuOptions = menus.map(x => ({ value: x.id, label: x.name }))

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<SelectControl
						label={__('Menu')}
						value={menuID}
						options={menuOptions}
						onChange={value => setAttributes({ menuID: +value })}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	render() {
		const { attributes, className, menus, menuItems } = this.props
		const { menuID } = attributes
		const currentMenuID = menuID || (menus[0] && menus[0].id) || 0
		const items = menuItems.filter(x => x.nav_menu.indexOf(currentMenuID) >= 0)

		return (
			<Fragment>
				{this.renderControl()}
				<div className={className}>
					<ul className={`${className}__block`}>
						{items.map((x, i) => (
							<li key={x.id || `menu-item-${i}`}>{x.title.raw || `Item ${i}`}</li>
						))}
					</ul>
				</div>
			</Fragment>
		)
	}
}

export default withSelect(select => ({
	menus: select('core').getEntityRecords('taxonomy', 'nav_menu') || [],
	menuItems: select('core').getEntityRecords('postType', 'nav_menu_item', { per_page: -1 }) || [],
}))(NavMenuEdit)
