<header class="mtk-header">
	<?php if ( ! empty( get_header_textcolor() ) ) : ?>
		<style>.mtk-header__logo { color: #<?php echo get_header_textcolor(); ?> }</style>
	<?php endif; ?>

	<div class="mtk-header__splash">
		<div class="mtk-header__logo"><?php mtk_svg_inline( 'logotype' ); ?></div>
		<?php echo get_header_image_tag( array( 'class' => 'custom-header' ) ); ?>
	</div>

	<div class="mtk-navigation">
		<h1 class="mtk-header__site-name"><?php mtk_svg_inline( 'logotype' ); ?></h1>
		<?php mtk_main_menu(); ?>
		<?php get_template_part( 'template-parts/reserve', 'form' ); ?>
	</div>

</header>
