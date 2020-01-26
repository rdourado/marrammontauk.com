/**
 * External dependencies
 */
import get from 'lodash/get'
import head from 'lodash/head'
import mapValues from 'lodash/mapValues'

const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText, InspectorControls } = wp.editor
const { Placeholder, Spinner, PanelBody, RangeControl, SelectControl } = wp.components
const { withSelect } = wp.data

class ClippingsEdit extends Component {
	renderControl = () => {
		const { attributes, categories, setAttributes } = this.props
		const { numberposts, category } = attributes
		const menuOptions = [
			{ value: 0, label: __('None', 'marram') },
			...categories.map(x => ({ value: x.slug, label: x.name })),
		]

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<RangeControl
						label={__('Number of posts', 'marram')}
						value={numberposts}
						onChange={value => setAttributes({ numberposts: value })}
						min={1}
						max={10}
					/>
					<SelectControl
						label={__('Category')}
						value={category}
						options={menuOptions}
						onChange={value => setAttributes({ category: value })}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	renderList = () => {
		const {
			attributes: { numberposts },
			className,
			posts,
		} = this.props
		const data = posts.map(p => ({ ...p, meta: mapValues(p.meta, head) })).slice(0, numberposts)
		const thumbnail = get(posts.find(p => !!p.featured_media_url), 'featured_media_url')

		return (
			<div className={`${className}__body`}>
				<figure className={`${className}__preview`}>
					<img className={`${className}__image`} src={thumbnail} alt="" />
				</figure>
				<ol className={`${className}__list`}>
					{data.map(post => (
						<li key={post.id} className={`${className}__event`}>
							<span className={`${className}__date`}>{post.meta.clipping_date}</span>
							<p
								className={`${className}__name`}
								dangerouslySetInnerHTML={{ __html: post.title.rendered }}
							/>
						</li>
					))}
				</ol>
			</div>
		)
	}

	render() {
		const { posts, className } = this.props

		return !posts ? (
			<Placeholder label={__('Loading…', 'marram')}>
				<Spinner />
			</Placeholder>
		) : (
				<Fragment>
					{this.renderControl()}
					<div className={className}>
						<div className={`${className}__block`}>
							{this.renderList()}
						</div>
					</div>
				</Fragment>
			)
	}
}

export default withSelect(select => ({
	posts: select('core').getEntityRecords('postType', 'clipping'),
	categories: select('core').getEntityRecords('taxonomy', 'clipping_category') || [],
}))(ClippingsEdit)
