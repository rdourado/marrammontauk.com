<?php
/**
 * Redirect Clippings to Press page
 *
 * @package marram
 */

$press_page = get_page_by_path( 'press' );

if ( ! empty( $press_page ) ) {
	wp_safe_redirect( get_permalink( $press_page ), 302 );
	exit;
}

get_template_part( 'single' );
