/**
 * External dependencies
 */
import head from 'lodash/head'
import mapValues from 'lodash/mapValues'
import showdown from 'showdown'

const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { InspectorControls } = wp.editor
const { Placeholder, Spinner, PanelBody, RangeControl } = wp.components
const { withSelect } = wp.data

class GalleriesEdit extends Component {
	renderControl = () => {
		const { attributes, setAttributes } = this.props
		const { numberposts } = attributes

		return (
			<InspectorControls>
				<PanelBody title={__('Settings', 'marram')} initialOpen={true}>
					<RangeControl
						label={__('Number of posts', 'marram')}
						value={numberposts}
						onChange={value => setAttributes({ numberposts: value })}
						min={3}
						step={3}
						max={12}
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	renderPost = ({ title, meta, featured_media_url: thumbnail }) => {
		const { className } = this.props
		const converter = new showdown.Converter({ simpleLineBreaks: true })
		const md = str => converter.makeHtml(str).replace(/<\/?p>/g, '')

		return (
			<div className={`${className}__entry`}>
				<figure className={`${className}__thumbnail`}>
					<img className={`${className}__image`} src={thumbnail} alt="" />
				</figure>
				<h2
					className={`${className}__title`}
					dangerouslySetInnerHTML={{ __html: title.rendered }}
				/>
				<p
					className={`${className}__lead`}
					dangerouslySetInnerHTML={{ __html: md(meta.gallery_lead) }}
				/>
				<button
					className={`${className}__button`}
					dangerouslySetInnerHTML={{ __html: meta.gallery_label || 'Go' }}
				/>
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
					{posts
						.map(p => ({ ...p, meta: mapValues(p.meta, head) }))
						.slice(0, 3)
						.map(this.renderPost)}
				</div>
			</Fragment>
		)
	}
}

export default withSelect(select => ({
	posts: select('core').getEntityRecords('postType', 'gallery'),
}))(GalleriesEdit)
