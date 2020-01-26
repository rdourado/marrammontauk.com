<?php
/**
 * Plugin Name: Marram Gutenberg Blocks
 * Plugin URI: https://www.marrammontauk.com/
 * Description: Marram Gutenberg Blocks
 * Author: Rafael Dourado <rafael.dourado@parafernalia.net.br
 * Author URI: https://rafaeldourado.com.br/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'classes/class-marram-blocks.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-happenings.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-clippings.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-stay-in-touch.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-galleries.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-nav-menu.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-room-type.php';
require_once plugin_dir_path( __FILE__ ) . 'classes/class-post-date.php';
