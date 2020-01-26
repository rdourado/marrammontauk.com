<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Nav_Menu' ) ) :

	class Nav_Menu {

		protected $handle;

		function __construct() {

			add_action( 'init', array( $this, 'register_block' ) );

		}

		function register_block() {

			register_block_type(
				'marram/nav-menu',
				array(
					'render_callback' => array( $this, 'render_block' ),
				)
			);

		}

		function render_block( $attributes, $content ) {

			include_once get_template_directory() . '/classes/class-mtk-walker-nav-menu.php';

			$types = plugin_dir_path( __DIR__ ) . 'src/nav-menu/types.js';
			$types = file_get_contents( $types );
			preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
			$block   = end( $matches );
			$content = wp_nav_menu(
				array(
					'container'   => null,
					'depth'       => 1,
					'fallback_cb' => false,
					'menu_class'  => $block,
					'menu'        => isset( $attributes['menuID'] ) ? $attributes['menuID'] : null,
					'walker'      => new MTK_Walker_Nav_Menu(),
					'echo'        => false,
				)
			);

			return $content;

		}

	}

	new Nav_Menu();

endif;
