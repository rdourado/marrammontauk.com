/**
 * External dependencies
 */
import $ from 'jQuery'

const header = $('.mtk-header')
const filter = $('.mtk-query-args')
const quotes = $('.mtk-rotating-quotes')
const stickyClass = 'mtk-query-args--sticky'

let obs,
	rootMargin = 0

function createObs(target, margin) {
	if (obs) {
		obs.disconnect()
	}
	obs = new IntersectionObserver(
		entries => {
			const entry = entries[0]
			if (!entry.isIntersecting && entry.intersectionRect.top <= 0) {
				filter.addClass(stickyClass)
			} else {
				filter.removeClass(stickyClass)
			}
		},
		{
			rootMargin: `-${margin}px`,
			threshold: 0,
		}
	)
	obs.observe(target.get(0))
}

if (filter.length && quotes.length) {
	$(window)
		.on('resize', () => {
			if (rootMargin !== header.outerHeight()) {
				rootMargin = header.outerHeight()
				createObs(quotes, rootMargin)
			}
		})
		.trigger('resize')
}
