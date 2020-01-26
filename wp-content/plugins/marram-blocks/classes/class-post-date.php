<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Post_Date' ) ) :

	class Post_Date {

		protected $handle;

		function __construct() {

			add_action( 'init', array( $this, 'register_block' ) );

		}

		function register_block() {

			register_block_type(
				'marram/post-date',
				array(
					'render_callback' => array( $this, 'render_block' ),
				)
			);

		}

		function render_block( $attributes, $content ) {

			global $post;

			$types = plugin_dir_path( __DIR__ ) . 'src/post-date/types.js';
			$types = file_get_contents( $types );
			preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
			$block   = end( $matches );
			$content = sprintf(
				'<time class="%s" datetime="%s">%s</time>',
				$block,
				get_the_time( 'c', $post ),
				get_the_time( 'F j, Y', $post )
			);

			return $content;

		}

	}

	new Post_Date();

endif;
