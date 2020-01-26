	<footer class="mtk-footer">
		<?php mtk_menu( 'footer-extra', 'mtk-footer__menu' ); ?>
		<?php mtk_menu( 'footer', 'mtk-footer__menu' ); ?>
		<?php mtk_menu( 'social', 'mtk-footer__menu mtk-footer__menu--social' ); ?>

		<div class="mtk-footer__contact">
			<?php $address = get_theme_mod( 'address' ); ?>
			<?php if ( ! empty( $address ) ) : ?>
				<address class="mtk-footer__address"><?php mtk_theme_mod( 'address' ); ?></address>
			<?php endif; ?>

			<?php $phone = get_theme_mod( 'phone' ); ?>
			<?php if ( ! empty( $phone ) ) : ?>
				<p class="mtk-footer__phone"><?php mtk_theme_mod( 'phone' ); ?></p>
			<?php endif; ?>

			<?php $email = get_theme_mod( 'email' ); ?>
			<?php if ( ! empty( $email ) ) : ?>
				<p class="mtk-footer__email"><?php mtk_theme_mod( 'email' ); ?></p>
			<?php endif; ?>
		</div>

		<?php mtk_menu( 'social', 'mtk-footer__social' ); ?>

		<div class="mtk-footer__logo"><?php echo mtk_svg_inline( 'logomark' ); ?></div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>
