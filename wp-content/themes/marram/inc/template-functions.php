<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 */

/**
 * Google Tag Manager
 */
function mtk_gtm_head() {
	?>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-NGK7RFD');</script>
	<!-- End Google Tag Manager -->
	<?php
}
function mtk_gtm_body() {
	?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGK7RFD"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	<?php
}
add_action( 'wp_head', 'mtk_gtm_head', 10, 1 );
add_action( 'wp_body_open', 'mtk_gtm_body', 10, 1 );

/**
 * Disable Emojis on Editor
 */
function mtk_disable_emojis_tinymce( $plugins ) {
	return is_array( $plugins ) ? array_diff( $plugins, array( 'wpemoji' ) ) : array();
}

/**
 * Disable Emojis completely
 */
function mtk_disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
	if ( 'dns-prefetch' == $relation_type ) {
		/** This filter is documented in wp-includes/formatting.php */
		$emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
		$urls          = array_diff( $urls, array( $emoji_svg_url ) );
	}
	return $urls;
}

/**
 * Cleaning WP useless features
 */
function mtk_cleanup_wp() {
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); // remove emojis admin scripts
	remove_action( 'admin_print_styles', 'print_emoji_styles' ); // remove emojis admin styles
	remove_action( 'rest_api_init', 'wp_oembed_register_route' ); // remove the oEmbed REST API route
	remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 ); // remove the REST API link from HTTP Headers
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); // remove emojis scripts
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10 ); // remove the REST API link
	remove_action( 'wp_head', 'rsd_link' ); // remove really simple discovery link
	remove_action( 'wp_head', 'wlwmanifest_link' ); // remove wlwmanifest.xml (needed to support windows live writer)
	remove_action( 'wp_head', 'wp_generator' ); // remove WordPress version
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links' ); // remove oEmbed discovery links
	remove_action( 'wp_head', 'wp_oembed_add_host_js' ); // remove oEmbed-specific javascript from front-end / back-end
	remove_action( 'wp_print_styles', 'print_emoji_styles' ); // remove emojis styles
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); // remove emojis from comments feed
	remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 ); // don't filter oEmbed results
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' ); // remove emojis from posts feed
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' ); // remove emojis from emails
	add_filter( 'feed_links_show_comments_feed', '__return_false' ); // remove comments rss feed links
	add_filter( 'tiny_mce_plugins', 'mtk_disable_emojis_tinymce' ); // remove emojis from editor
	add_filter( 'wp_resource_hints', 'mtk_disable_emojis_remove_dns_prefetch', 10, 2 ); // remove emojis prefetch url
}
add_action( 'after_setup_theme', 'mtk_cleanup_wp' );

/**
 *
 */
function mtk_enable_explore_editor() {
	remove_action( 'edit_form_after_title', '_wp_posts_page_notice' );
	add_post_type_support( 'page', 'editor' );
}
add_action( 'edit_form_after_title', 'mtk_enable_explore_editor', 1 );

/**
 *
 */
function mtk_nav_menu_edit_walker() {
	return 'MTK_Walker_Nav_Menu_Edit';
}
add_filter( 'wp_edit_nav_menu_walker', 'mtk_nav_menu_edit_walker' );

/**
 *
 */
function mtk_show_page_for_posts_content( $query ) {
	if ( ! $query->is_admin() && $query->is_home() && $query->is_main_query() ) {
		$page_id = (int) get_option( 'page_for_posts' );
		$query->set( 'p', $page_id );
		$query->set( 'post_type', 'page' );
	}
}
add_action( 'pre_get_posts', 'mtk_show_page_for_posts_content' );

/**
 *
 */
function mtk_add_custom_nav_fields( $menu_item ) {
	$fields = array(
		'reserve'    => '_menu_item_reserve',
		'newsletter' => '_menu_item_newsletter',
		'highlight'  => '_menu_item_highlight',
		'icon'       => '_menu_item_icon',
	);
	foreach ( $fields as $key => $meta_key ) {
		$menu_item->{$key} = get_post_meta( $menu_item->ID, $meta_key, true );
	}
	return $menu_item;
}
add_filter( 'wp_setup_nav_menu_item', 'mtk_add_custom_nav_fields' );

/**
 *
 */
function mtk_update_custom_nav_fields( $menu_id, $menu_item_db_id ) {
	$fields = array(
		'_menu_item_reserve'    => 'menu-item-reserve',
		'_menu_item_newsletter' => 'menu-item-newsletter',
		'_menu_item_highlight'  => 'menu-item-highlight',
		'_menu_item_icon'       => 'menu-item-icon',
	);
	foreach ( $fields as $meta_key => $field ) {
		if ( isset( $_REQUEST[ $field ][ $menu_item_db_id ] ) ) {
			$value = $_REQUEST[ $field ][ $menu_item_db_id ];
			update_post_meta( $menu_item_db_id, $meta_key, $value );
		} else {
			delete_post_meta( $menu_item_db_id, $meta_key );
		}
	}
}
add_action( 'wp_update_nav_menu_item', 'mtk_update_custom_nav_fields', 10, 2 );

/**
 *
 */
function mtk_category_add_form_fields( $term_obj ) {
	$term_id      = $term_obj->term_id;
	$thumbnail_id = (int) get_term_meta( $term_id, 'thumbnail_id', true );
	?>
	<div class="form-field term-thumbnail_id-wrap">
		<label for="thumbnail_id"><?php _e( 'Thumbnail ID', 'marram' ); ?></label>
		<input name="thumbnail_id" id="thumbnail_id" type="number" min="0" value="<?php echo esc_attr( $thumbnail_id ); ?>">
	</div>
	<?php
}
function mtk_category_edit_form_fields( $term_obj ) {
	$term_id      = $term_obj->term_id;
	$thumbnail_id = (int) get_term_meta( $term_id, 'thumbnail_id', true );
	?>
	<tr class="form-field term-thumbnail_id-wrap">
		<th scope="row"><label for="thumbnail_id"><?php _e( 'Thumbnail ID', 'marram' ); ?></label></th>
		<td><input name="thumbnail_id" id="thumbnail_id" type="number" min="0" value="<?php echo esc_attr( $thumbnail_id ); ?>"></td>
	</tr>
	<?php
}
add_action( 'category_add_form_fields', 'mtk_category_add_form_fields' );
add_action( 'category_edit_form_fields', 'mtk_category_edit_form_fields' );

/**
 *
 */
function mtk_category_save_fields( $term_id ) {
	if ( isset( $_POST['thumbnail_id'] ) ) {
		update_term_meta( $term_id, 'thumbnail_id', $_POST['thumbnail_id'] );
	}
}
add_action( 'edited_category', 'mtk_category_save_fields' );
add_action( 'created_category', 'mtk_category_save_fields' );

/**
 * Change default jQuery
 */
function mtk_jquery_cdn() {
	if ( ! is_admin() ) {
		wp_deregister_script( 'jquery' );
		wp_deregister_script( 'jquery-core' );
		wp_deregister_script( 'jquery-migrate' );

		wp_register_script( 'jquery', 'https://cdn.jsdelivr.net/combine/npm/jquery@3.4.1,npm/jquery-migrate@3.1.0,npm/jquery-form@4.2.2,npm/jquery-validation@1.19.1', array(), null, true );
	}
}
add_action( 'wp_enqueue_scripts', 'mtk_jquery_cdn', 1 );

/**
 *
 */
function mtk_highlight_brand_name( $content ) {
	$name    = 'Mostrador Marram|Marram';
	$content = preg_replace( '/(' . $name . ')(?=[^>]*(<|$))/i', '<b>$1</b>', $content );
	return $content;
}
add_filter( 'the_content', 'mtk_highlight_brand_name' );

/**
 *
 */
function mtk_show_entity_in_rest( $args, $name ) {

	if ( in_array( $name, array( 'nav_menu', 'nav_menu_item' ) ) ) {
		$args['show_in_rest'] = true;
	}

	return $args;

}
add_filter( 'register_taxonomy_args', 'mtk_show_entity_in_rest', 10, 2 );
add_filter( 'register_post_type_args', 'mtk_show_entity_in_rest', 10, 2 );

/**
 * Contact Form 7
 */
add_filter( 'wpcf7_autop_or_not', '__return_false' );
add_filter( 'wpcf7_load_css', '__return_false' );

/**
 * WP SEO Breadcrumb
 */
function mtk_wpseo_breadcrumb( $links ) {

	array_shift( $links );
	return count( $links ) <= 1 ? array() : $links;

}
add_filter( 'wpseo_breadcrumb_links', 'mtk_wpseo_breadcrumb' );

/**
 *
 */
function mtk_redirect_category() {
	if ( is_category() ) {
		$term = get_queried_object();
		$page = get_page_by_path( 'explore/' . $term->slug );
		if ( $page ) {
			wp_redirect( get_permalink( $page ) );
			exit;
		}
	}
}
add_action( 'template_redirect', 'mtk_redirect_category' );

/**
 *
 */
function mtk_body_class( $classes ) {
	global $post;
	if ( is_singular() ) {
		$slug      = $post->post_name;
		$classes[] = 'mtk-page-' . $slug;
	}
	return $classes;
}
add_filter( 'body_class', 'mtk_body_class' );
