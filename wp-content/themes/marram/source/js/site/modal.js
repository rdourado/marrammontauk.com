/**
 * External dependencies
 */
import $ from 'jQuery'

const block = 'mtk-modal'
$(document)
	.on('click.mtk', `.${block}__close`, function() {
		$(this)
			.closest(`.${block}`)
			.remove()
	})
	.on('click.mtk', `.${block}`, function(e) {
		if ($(e.target).hasClass(block)) {
			$(`.${block}__close`, this).trigger('click.mtk')
		}
	})
