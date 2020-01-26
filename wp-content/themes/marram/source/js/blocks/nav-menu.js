/**
 * External dependencies
 */
import $ from 'jQuery'

const nav = $('.mtk-nav-menu')
const holderClass = 'mtk-nav-menu__holder'
const toggleClass = 'mtk-nav-menu__toggle'
const activeClass = 'mtk-nav-menu--active'
const stickyClass = 'mtk-nav-menu--sticky'

if (nav.length) {
	const ref = nav.prev()

	nav.prepend(`<li class="menu-item ${toggleClass}"><a href="#">&nbsp;</a></li>`)
	nav.after(`<div class="${holderClass}" />`)
	nav.on('click', `.${toggleClass}`, event => {
		event.preventDefault()
		nav.toggleClass(activeClass)
	})

	const observer = new IntersectionObserver(
		entries => {
			const entry = entries[0]
			if (!entry.isIntersecting && entry.intersectionRect.top <= 0) {
				nav.addClass(stickyClass)
			} else {
				nav.removeClass(stickyClass)
			}
		},
		{ threshold: 0 }
	)
	observer.observe(ref.get(0))

	$(window).load(() => {
		const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		const target = nav.get(0).getBoundingClientRect().bottom
		if (target > viewHeight) {
			const scrollTop = target - viewHeight
			$('html, body').animate({ scrollTop }, 'slow')
		}
	})
}
