const header = document.querySelector('.mtk-header')
const toggle = document.querySelector('.mtk-header__toggle')
const hasSubNav = document.querySelector('.mtk-nav-menu') !== null

if (hasSubNav) {
	header.classList.add('mtk-header--normal')
} else {
	const observer = new IntersectionObserver(
		entries => {
			if (entries[0].isIntersecting) {
				header.classList.remove('mtk-header--sticky')
			} else {
				header.classList.add('mtk-header--sticky')
			}
		},
		{ threshold: 1 }
	)
	observer.observe(document.body)
}

toggle.addEventListener('click', () => {
	document.body.classList.toggle('mtk--freeze-mobile')
	document.querySelector('.mtk-nav').classList.toggle('mtk-nav--active')
	document.querySelector('.mtk-header').classList.toggle('mtk-header--active')
})
