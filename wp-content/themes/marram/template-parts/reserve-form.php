<form action="<?php echo home_url( '/' ); ?>" method="get" class="mtk-reserve-form">

	<div class="mtk-reserve-form__date-range">
		<label for="mtk-dates" class="mtk-reserve-form__field mtk-reserve-form__field--dates">
			<span class="mtk-reserve-form__label"><?php _e( 'Dates:', 'marram' ); ?></span>
			<input type="date" name="mtk-dates" id="mtk-dates" class="mtk-reserve-form__text" autocomplete="off">
		</label>

		<label for="mtk-in" class="mtk-reserve-form__field mtk-reserve-form__field--in">
			<span class="mtk-reserve-form__label"><?php _e( 'Check in:', 'marram' ); ?></span>
			<input type="date" name="mtk-in" id="mtk-in" class="mtk-reserve-form__text" autocomplete="off">
		</label>

		<label for="mtk-out" class="mtk-reserve-form__field mtk-reserve-form__field--out">
			<span class="mtk-reserve-form__label"><?php _e( 'Check out:', 'marram' ); ?></span>
			<input type="date" name="mtk-out" id="mtk-out" class="mtk-reserve-form__text" autocomplete="off">
		</label>
	</div>

	<label for="mtk-guests" class="mtk-reserve-form__field mtk-reserve-form__field--guests">
		<span class="mtk-reserve-form__label"><?php _e( 'Guests:', 'marram' ); ?></span>
		<select name="mtk-guests" id="mtk-guests" class="mtk-reserve-form__select">
			<?php for ( $i = 1; $i <= 10; $i++ ) : ?>
				<option
					<?php echo 2 === $i ? 'selected' : ''; ?>
					value="<?php echo $i; ?>"
				><?php echo $i; ?></option>
			<?php endfor; ?>
		</select>
	</label>

	<button type="submit" class="mtk-reserve-form__submit">
		<?php _e( 'Check availability', 'marram' ); ?>
	</button>

</form>
