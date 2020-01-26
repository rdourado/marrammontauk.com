<footer class="mtk-footer">
	<?php mtk_footer_menu(); ?>

	<?php $address = get_theme_mod( 'address' ); ?>
	<?php if ( ! empty( $address ) ) : ?>
		<address class="mtk-footer__address"><?php echo nl2br( $address ); ?></address>
	<?php endif; ?>

	<div class="custom-logo"><?php mtk_svg_inline( 'logomark' ); ?></div>
</footer>

<?php get_template_part( 'template-parts/newsletter' ); ?>
