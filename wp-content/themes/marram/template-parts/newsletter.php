<aside id="newsletter" class="mtk-modal mtk-modal--newsletter">
	<div class="mtk-modal__wrap">
		<button class="mtk-modal__close"><?php _e( 'Close', 'marram' ); ?></button>

		<form action="" method="get" class="mtk-form-newsletter">
			<fieldset class="mtk-form-newsletter__wrap">
				<legend class="mtk-form-newsletter__heading"><?php _e( 'Stay In Touch', 'marram' ); ?></legend>
				<p class="mtk-form-newsletter__lead"><?php _e( 'There’s always something going on here. Stay in the loop for events, experiences and more.', 'marram' ); ?></p>

				<div class="mtk-form-newsletter__field">
					<label for="news-email" class="mtk-form-newsletter__label"><?php _e( 'Please enter your Email Address', 'marram' ); ?></label>
					<input type="email" name="email" id="news-email" class="mtk-form-newsletter__input" placeholder="<?php esc_attr_e( 'Please enter your Email Address', 'marram' ); ?>" required>
					<button type="submit" class="mtk-form-newsletter__submit"><?php _e( 'Sign Up', 'marram' ); ?></button>
				</div>

				<?php
				$links = mtk_get_policy_links();
				if ( ! empty( $links ) ) :
					?>
					<ul class="mtk-form-newsletter__all-links">
						<?php foreach ( $links as $page ) : ?>
							<li class="mtk-form-newsletter__link">
								<a href="<?php echo get_permalink( $page ); ?>"><?php echo get_the_title( $page ); ?></a>
							</li>
						<?php endforeach; ?>
					</ul>
					<?php
				endif;
				?>
			</fieldset>
		</form>

		<!-- <div class="mtk-form-newsletter">
			<h4 class="mtk-form-newsletter__heading"><?php _e( 'Thank You', 'marram' ); ?></h4>
			<p class="mtk-form-newsletter__lead"><?php _e( 'We look forward to keeping you in the loop. Stay tuned for a confirmation email.', 'marram' ); ?></p>
			<a href="#" class="mtk-form-newsletter__button"><?php _e( 'Back to site', 'marram' ); ?></a>
		</div> -->

	</div>
</aside>
