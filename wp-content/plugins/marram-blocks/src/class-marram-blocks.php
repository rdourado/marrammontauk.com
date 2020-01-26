<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Marram_Blocks' ) ) :

	class Marram_Blocks {

		protected $handle;

		function __construct() {
			$this->handle = 'marram-blocks';

			add_filter( 'block_categories', array( $this, 'custom_category' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ) );
		}

		function custom_category( $categories ) {
			$category = array(
				'slug'  => 'marram',
				'title' => __( 'Marram Exclusive', 'marram' ),
			);
			return array_merge( array( $category ), $categories );
		}

		function block_editor_assets() {
			$src = plugins_url( 'build/index.js', dirname( __FILE__ ) );
			$ver = filemtime( plugin_dir_path( __DIR__ ) . 'build/index.js' );
			wp_enqueue_script( $this->handle, $src, $deps, $ver, true );
		}

	}

	new Marram_Blocks();

endif;
