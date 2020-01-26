/* global google */
/**
 * External dependencies
 */
import $ from 'jQuery'
/**
 * Internal dependencies
 */
import styles from './map-styles'

window.initMap = function() {
	const _ = x => document.getElementById(x)
	const mapClass = 'mtk-points-of-interest__map'
	const bodyClass = 'mtk-points-of-interest__body'
	const entryClass = 'mtk-points-of-interest__entry'
	const groupsClass = 'mtk-points-of-interest__groups'
	const currentClass = 'mtk-points-of-interest__group--current'
	const activeClass = entryClass + '--active'
	// const showClass = entryClass + '--show'
	const props = {
		center: { lat: -22.915, lng: -43.197 },
		zoom: 16,
		disableDefaultUI: true,
		styles,
	}

	let map = null
	let marker = null

	$(`.${groupsClass}`)
		.on('click', 'a, button', function(event) {
			event.preventDefault()
			const group = $(this).text()
			$(this)
				.closest('li')
				.addClass(currentClass)
				.siblings()
				.removeClass(currentClass)
			$(this)
				.closest(`.${groupsClass}`)
				.parent()
				.find(`.${entryClass}`)
				.hide()
				.filter(`[data-group="${group}"]`)
				.stop()
				.show()
		})
		.find('a, button')
		.first()
		.trigger('click')

	$(`.${bodyClass}`).each((index, body) => {
		const mapElem = $(`<div class="${mapClass}"><div id="map-${index}" /></div>`)
		const setCenter = (lat, lng) => {
			map.setCenter({ lat: +lat, lng: +lng })
			marker.setPosition({ lat: +lat, lng: +lng })
		}

		$(body).prepend(mapElem)
		map = new google.maps.Map(_(`map-${index}`), props)
		marker = new google.maps.Marker({ map, position: props.center })

		$(`.${entryClass}`, body).on('click.mtk', event => {
			const target = $(event.currentTarget || event.target)
			const [lat, lng] = target.attr('data-latlng').split(',')

			target
				.toggleClass(activeClass)
				.siblings()
				.removeClass(activeClass)

			setCenter(lat, lng)
		})

		const first = $(`.${entryClass}`, body).first()
		setCenter(...first.attr('data-latlng').split(','))
	})
}
