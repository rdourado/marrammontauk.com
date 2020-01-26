/* globals jQuery, moment, mtk */
;($ => {
	const $form = $('.mtk-reserve-form')
	const $select = $('.mtk-reserve-form__select')
	const $dates = $('.mtk-reserve-form input[type="date"]')
	const $toggle = $(
		'.mtk-js-toggle-reserve-form > a, .mtk-js-toggle-reserve-form, a[data-title="Reserve"], a[data-title="reserve"], a[data-title="RESERVE"]'
	).first()

	function init() {
		setupSelect()
		setupCalendarDesktop()

		$toggle.on('click', toggleReserve)
		$form.on('submit', bookRoom)
	}

	function setupSelect() {
		$select.select2({
			minimumResultsForSearch: -1,
			dropdownParent: $form,
		})
	}

	function setupCalendarDesktop() {
		const $single = $dates.first()
		const $multiple = $dates.not(':first')
		const dateRangeProps = {
			autoApply: true,
			autoUpdateInput: false,
			drops: 'down',
			locale: {
				daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				firstDay: 1,
			},
			minDate: moment(),
			opens: 'right',
			parentEl: $('.mtk-reserve-form__date-range'),
		}

		$single.attr({
			type: 'text',
			readonly: true,
			value: moment().format('MM/DD/YYYY - MM/DD/YYYY'),
		})
		$multiple.attr({
			type: 'text',
			readonly: true,
			value: moment().format('MM/DD/YYYY'),
		})

		$single.add($multiple.first()).daterangepicker(dateRangeProps, setDateRange)
		$multiple.last().on('focus', () => $multiple.first().trigger('focus'))
	}

	function setDateRange(start, end) {
		$('#mtk-dates').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'))
		$('#mtk-in').val(start.format('MM/DD/YYYY'))
		$('#mtk-out').val(end.format('MM/DD/YYYY'))
	}

	function bookRoom(e) {
		if (e) {
			e.preventDefault()
		}
		const adults = $form.find('select').val()
		const checkin = $('#mtk-in').val()
		const checkout = $('#mtk-out').val()
		window.open(
			mtk.reserveurl + `adults=${adults}&checkin=${checkin}&checkout=${checkout}`,
			'_blank'
		)
	}

	function toggleReserve(e) {
		e.preventDefault()
		$('.mtk-navigation').toggleClass('mtk-navigation--reserve')
	}

	init()
})(jQuery)
