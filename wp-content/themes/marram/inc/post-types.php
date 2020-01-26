<?php

function mtk_happenings_post_type() {

	$labels = array(
		'name'                  => _x( 'Happenings', 'Post Type General Name', 'marram' ),
		'singular_name'         => _x( 'Happening', 'Post Type Singular Name', 'marram' ),
		'menu_name'             => __( 'Happenings', 'marram' ),
		'name_admin_bar'        => __( 'Happening', 'marram' ),
		'archives'              => __( 'Item Archives', 'marram' ),
		'attributes'            => __( 'Item Attributes', 'marram' ),
		'parent_item_colon'     => __( 'Parent Happening:', 'marram' ),
		'all_items'             => __( 'All Happenings', 'marram' ),
		'add_new_item'          => __( 'Add New Happening', 'marram' ),
		'add_new'               => __( 'New Happening', 'marram' ),
		'new_item'              => __( 'New Item', 'marram' ),
		'edit_item'             => __( 'Edit Happening', 'marram' ),
		'update_item'           => __( 'Update Happening', 'marram' ),
		'view_item'             => __( 'View Happening', 'marram' ),
		'view_items'            => __( 'View Items', 'marram' ),
		'search_items'          => __( 'Search happenings', 'marram' ),
		'not_found'             => __( 'No happenings found', 'marram' ),
		'not_found_in_trash'    => __( 'No happenings found in Trash', 'marram' ),
		'featured_media'        => __( 'Featured Image', 'marram' ),
		'set_featured_media'    => __( 'Set featured image', 'marram' ),
		'remove_featured_media' => __( 'Remove featured image', 'marram' ),
		'use_featured_media'    => __( 'Use as featured image', 'marram' ),
		'insert_into_item'      => __( 'Insert into item', 'marram' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'marram' ),
		'items_list'            => __( 'Items list', 'marram' ),
		'items_list_navigation' => __( 'Items list navigation', 'marram' ),
		'filter_items_list'     => __( 'Filter items list', 'marram' ),
	);
	$args   = array(
		'label'               => __( 'Happening', 'marram' ),
		'description'         => __( 'Activities and happenings', 'marram' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-calendar',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'show_in_rest'        => true,
	);
	register_post_type( 'happening', $args );

}
// add_action( 'init', 'mtk_happenings_post_type', 0 );
