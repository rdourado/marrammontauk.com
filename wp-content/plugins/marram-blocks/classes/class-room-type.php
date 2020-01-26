<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Room_Type' ) ) :

	class Room_Type {

		protected $handle;

		function __construct() {

			add_action( 'init', array( $this, 'register_block' ) );

		}

		function register_block() {

			register_block_type(
				'marram/room-type',
				array(
					'render_callback' => array( $this, 'render_block' ),
				)
			);

		}

		function render_block( $attributes, $content ) {

			$link_header = sprintf(
				'<a href="%s" class="%s" target="%s">%s</a>',
				'https://res.windsurfercrs.com/ibe/index.aspx?nono=1&propertyID=15941&',
				'mtk-room-type__button',
				'_blank',
				__( 'Reserve', 'marram' )
			);

			$link_footer = sprintf(
				'<a href="%s" class="%s" target="%s">%s</a>',
				'https://res.windsurfercrs.com/ibe/index.aspx?nono=1&propertyID=15941&',
				'mtk-room-type__button',
				'_blank',
				__( 'Reserve this room', 'marram' )
			);

			$content = str_replace( '</header>', $link_header . '</header>', $content );
			$content = str_replace( '</article>', $link_footer . '</article>', $content );
			$content = str_replace( 'src=', 'data-lazy=', $content );

			return $content;

		}

	}

	new Room_Type();

endif;
