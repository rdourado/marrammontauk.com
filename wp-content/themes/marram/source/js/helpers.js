const _$ = (a, b = document) => (isString(a) ? b.querySelector(a) : a)

export const $ = (a, b = document, c) => (c = _$(b)) && c.querySelector(a)

export const $$ = (a, b = document, c) => (c = _$(b)) && c.querySelectorAll(a)

export const $$$ = (a, b = document) =>
	(c => c.iterateNext())(document.evaluate(a, b, null, XPathResult.ANY_TYPE, null))

export const asList = sel =>
	NodeList.prototype.isPrototypeOf(sel) || Array.isArray(sel) ? sel : [sel]

export const createTag = (tagName = 'div', attrs = {}, children = null) => {
	const elem = document.createElement(tagName)
	Object.keys(attrs).forEach(name => elem.setAttribute(name, attrs[name]))
	if (isString(children)) {
		elem.innerHTML = children
	} else if (children) {
		each(filter(asList(children)), el =>
			isString(el) ? (elem.innerHTML += el) : elem.appendChild(el)
		)
	}
	return elem
}

export const each = (arr, fn) => Array.prototype.forEach.call(arr || [], fn)

export const fetchData = (url, body) =>
	new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open(body ? 'POST' : 'GET', url, true)
		if (body) {
			request.setRequestHeader('Content-Type', 'application/json')
		}
		request.onload = () => {
			const response = JSON.parse(request.responseText)
			return request.status >= 200 && request.status < 400
				? resolve(response)
				: reject(response)
		}
		request.onerror = reject
		request.send(body ? JSON.stringify(body) : undefined)
	})

export const filter = (arr, fn = x => !!x) => Array.prototype.filter.call(arr || [], fn)

export const isString = x => Object.prototype.toString.call(x) === '[object String]'

export const map = (arr, fn) => Array.prototype.map.call(arr || [], fn)

export const on = (evt, sel, fn) => each(asList(sel), x => x && x.addEventListener(evt, fn))

export const prepend = (parent, el) => parent.insertBefore(el, parent.firstChild)

export const ready = fn => {
	if (
		document.attachEvent
			? document.readyState === 'complete'
			: document.readyState !== 'loading'
	) {
		fn()
	} else {
		document.addEventListener('DOMContentLoaded', fn)
	}
}

export const siblings = el => Array.prototype.filter.call(el.parentNode.children, x => x !== el)

export const smoothScrollTo = (element, target_, duration_) => {
	const duration = Math.round(duration_)
	if (duration < 0) {
		return Promise.reject('bad duration')
	}

	const target = Math.round(target_)
	if (duration === 0) {
		element.scrollTop = target
		return Promise.resolve()
	}

	const startTime = Date.now()
	const endTime = startTime + duration

	const startTop = element.scrollTop
	const distance = target - startTop

	const smoothStep = (start, end, point) => {
		if (point <= start) {
			return 0
		}
		if (point >= end) {
			return 1
		}
		const x = (point - start) / (end - start)
		return x * x * (3 - 2 * x) // eslint-disable-line no-mixed-operators
	}

	return new Promise((resolve, reject) => {
		let previousTop = element.scrollTop

		const scrollFrame = function() {
			if (element.scrollTop !== previousTop) {
				reject('interrupted')
				return
			}

			const now = Date.now()
			const point = smoothStep(startTime, endTime, now)
			const frameTop = Math.round(startTop + distance * point) // eslint-disable-line no-mixed-operators
			element.scrollTop = frameTop

			if (now >= endTime) {
				resolve()
				return
			}

			if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
				resolve()
				return
			}
			previousTop = element.scrollTop

			setTimeout(scrollFrame, 0)
		}

		setTimeout(scrollFrame, 0)
	})
}

export const unique = arr => arr.filter((value, index) => arr.indexOf(value) === index)
