<?php

/**
 *
 */
function mtk_setup_theme() {
	// Make theme available for translation.
	load_theme_textdomain( 'marram', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 1000, 4000 );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus(
		array(
			'header'        => __( 'Primary', 'marram' ),
			'footer'        => __( 'Footer Menu', 'marram' ),
			'footer-extra'  => __( 'Footer Extra', 'marram' ),
			'social'        => __( 'Social Networks', 'marram' ),
			'explore'       => __( 'Explore', 'marram' ),
		)
	);

	// Switch default core markup to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'gallery',
			'caption',
		)
	);

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	// Add support for editor styles.
	add_theme_support( 'editor-styles' );

	// Enqueue editor styles.
	add_editor_style( 'assets/css/style-editor.css' );

	// Add support for responsive embedded content.
	add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'mtk_setup_theme' );

/**
 *
 */
function mtk_theme_init( $new_name ) {
	update_option( 'thumbnail_crop', 1 );
	update_option( 'thumbnail_size_w', 1472 );
	update_option( 'thumbnail_size_h', 1472 );
	update_option( 'medium_size_w', 2560 );
	update_option( 'medium_size_h', 2560 );
	update_option( 'large_size_w', 3840 );
	update_option( 'large_size_h', 3840 );
}
add_action( 'after_switch_theme', 'mtk_theme_init' );

/**
 *
 */
function mtk_theme_styles() {
	// Styles
	$src = '//s3.amazonaws.com/icomoon.io/114779/Socicon/style.css?u8vidh';
	wp_register_style( 'socicon', $src, array(), null );

	$file = '/assets/css/style.css';
	$src  = get_template_directory_uri() . $file;
	$path = get_template_directory() . $file;
	$ver  = file_exists( $path ) ? filemtime( $path ) : false;
	wp_enqueue_style( 'marram', $src, array( 'socicon' ), $ver );
}
add_action( 'wp_enqueue_scripts', 'mtk_theme_styles' );

/**
 *
 */
function mtk_theme_scripts() {
	// SlickJS
	$src = '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
	wp_register_script( 'slick', $src, array( 'jquery' ), null, true );

	// Theme Script
	$file = '/assets/js/bundle.js';
	$src  = get_template_directory_uri() . $file;
	$path = get_template_directory() . $file;
	$ver  = file_exists( $path ) ? filemtime( $path ) : false;
	wp_enqueue_script( 'marram', $src, array( 'jquery', 'slick' ), $ver, true );

	$data = array(
		'ajax_url'   => admin_url( 'admin-ajax.php' ),
		'reserveurl' => 'https://res.windsurfercrs.com/ibe/index.aspx?nono=1&propertyID=15941&',
	);
	wp_localize_script( 'marram', 'mtk', $data );

	// Google Maps API
	$key = (string) file_get_contents( '.key' );
	$src = '//maps.googleapis.com/maps/api/js?key=' . trim( $key ) . '&callback=window.initMap';
	wp_enqueue_script( 'gmaps', $src, array( 'jquery', 'marram' ), null, true );
}
add_action( 'wp_enqueue_scripts', 'mtk_theme_scripts' );

/**
 * Enqueue supplemental block editor styles.
 */
function mtk_blocks_editor_assets() {
	wp_enqueue_style(
		'mtk_blocks_editor_asset',
		get_template_directory_uri() . '/assets/css/style-blocks.css',
		array( 'wp-edit-blocks' ),
		filemtime( get_template_directory() . '/assets/css/style-blocks.css' )
	);
}
add_action( 'enqueue_block_editor_assets', 'mtk_blocks_editor_assets' );

/**
 * Custom Nav Menu Edit Walker template.
 */
require get_template_directory() . '/classes/class-mtk-walker-nav-menu-edit.php';

/**
 * Custom Nav Menu Walker template.
 */
require get_template_directory() . '/classes/class-mtk-walker-nav-menu.php';

/**
 * Enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Custom template tags for the theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Shortcodes
 */
require get_template_directory() . '/inc/shortcodes.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';
