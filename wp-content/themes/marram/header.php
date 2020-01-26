<!DOCTYPE html>
<html <?php language_attributes( 'html' ); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<?php function_exists( 'wp_body_open' ) ? wp_body_open() : do_action( 'wp_body_open' ); ?>

	<header class="mtk-header">
		<?php if ( is_front_page() ) : ?>
			<h1 class="mtk-header__logo"><?php mtk_logo(); ?></h1>
		<?php else : ?>
			<div class="mtk-header__logo"><?php mtk_logo(); ?></div>
		<?php endif; ?>
		<?php mtk_highlighted_menu_items(); ?>
		<button type="button" class="mtk-header__toggle">
			<?php _e( 'Toggle menu', 'marram' ); ?>
			<span></span>
			<span></span>
			<span></span>
		</button>
		<nav class="mtk-nav">
			<div class="mtk-nav__body">
				<?php mtk_menu( 'header', 'mtk-nav__menu' ); ?>
				<aside class="mtk-nav__footer">
					<div class="mtk-nav__logo"><?php echo mtk_svg_inline( 'logomark' ); ?></div>
					<h5 class="mtk-nav__title"><?php _e( 'Connect with us', 'marram' ); ?></h5>
					<?php mtk_theme_mod( 'email', 'mtk-nav__email' ); ?>
					<br>
					<?php mtk_theme_mod( 'phone', 'mtk-nav__phone' ); ?>
				</aside>
			</div>
		</nav>
	</header>
