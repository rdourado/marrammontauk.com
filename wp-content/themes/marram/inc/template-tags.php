<?php
/**
 * Custom template tags for this theme
 */

function mtk_highlighted_menu_items() {
	$menu_location = 'header';
	$locations     = get_nav_menu_locations();
	$menus         = wp_get_nav_menus();
	if ( isset( $locations[ $menu_location ] ) ) {
		$menu_index = array_search( $locations[ $menu_location ], array_column( $menus, 'term_id' ) );
	}
	if ( is_int( $menu_index ) && isset( $menus[ $menu_index ] ) ) {
		$items   = array_filter(
			wp_get_nav_menu_items( $menus[ $menu_index ] ),
			function( $item ) {
				return isset( $item->highlight ) && '1' === $item->highlight;
			}
		);
		$args    = (object) array(
			'container'   => null,
			'fallback_cb' => false,
			'walker'      => new MTK_Walker_Nav_Menu(),
		);
		$content = walk_nav_menu_tree( $items, 1, $args );
		$content = preg_replace( '/(\/|<)li/i', '$1p', $content );
		$content = str_replace( 'menu-item-', 'menu-item menu-item-', $content );
		echo $content;
	}
}

/**
 *
 */
function mtk_logo() {
	$url  = home_url( '/' );
	$logo = mtk_svg_inline( 'logotype' );
	$atts = is_front_page() ? ' aria-current="page"' : '';
	printf( '<a href="%s"%s>%s</a>', $url, $atts, $logo );
}

/**
 *
 */
function mtk_menu( $theme_location, $menu_class ) {
	$args = array(
		'container'      => null,
		'depth'          => 1,
		'fallback_cb'    => false,
		'menu_class'     => $menu_class,
		'theme_location' => $theme_location,
		'walker'         => new MTK_Walker_Nav_Menu(),
	);
	wp_nav_menu( $args );
}

/**
 *
 */
function mtk_cat_menu() {
	$args = array(
		'current_category' => get_query_var( 'cat' ),
		'title_li'         => '',
	);

	echo '<ul class="mtk-nav-menu">';
	wp_nav_menu(
		array(
			'container'      => false,
			'items_wrap'     => '%3$s',
			'theme_location' => 'explore',
			'fallback_cb'    => function() use ( $args ) {
				wp_list_categories( $args );
			},
		)
	);
	echo '</ul>';
}

/**
 *
 */
function mtk_svg_inline( $filename ) {
	$filepath = get_template_directory() . '/assets/img/' . $filename . '.svg';
	if ( ! file_exists( $filepath ) ) {
		return '';
	}
	$content = file_get_contents( $filepath );
	$content = preg_replace(
		'/(aria-label)="(.+?)">/i',
		'role="img" $1="$2"><title>$2</title>',
		$content
	);
	return $content;
}

/**
 *
 */
function mtk_theme_mod( $name, $class_name = '' ) {
	$value = get_theme_mod( $name );
	if ( 'email' === $name && ! empty( $value ) ) {
		$link = esc_url( sprintf( 'mailto:%s', antispambot( $value ) ), array( 'mailto' ) );
		// $siteurl = parse_url( home_url() );
		// $host    = $siteurl['host'];
		$host  = 'marrammontauk';
		$value = preg_replace( '/(@|\.)/', ' $1 ', $value );
		$value = false === strpos( $value, $host ) ? antispambot( $value ) : preg_replace_callback(
			'/^(.*?)(' . $host . ')(.*?)$/i',
			function( $matches ) {
				$matches = array_map( 'antispambot', $matches );
				return $matches[1] . '<b>' . $matches[2] . '</b>' . $matches[3];
			},
			$value
		);
	} elseif ( 'phone' === $name && ! empty( $value ) ) {
		require_once get_template_directory() . '/vendor/autoload.php';
		$phone_util = \libphonenumber\PhoneNumberUtil::getInstance();
		$value      = esc_html( 0 === strpos( $value, '+' ) ? $value : '+' . $value );
		$link       = esc_url( sprintf( 'tel:%s', $value ), array( 'tel' ) );
		try {
			$phone = $phone_util->parse( $value, 'US' );
			$phone = $phone_util->format( $phone, \libphonenumber\PhoneNumberFormat::NATIONAL );
			$value = preg_replace( '/\((.+?)\) (.+?)\-(.+)$/', '$1 — $2 — $3', $phone );
		} catch ( \libphonenumber\NumberParseException $e ) {
		}
	} elseif ( 'address' === $name && ! empty( $value ) ) {
		$link  = esc_url( get_theme_mod( 'googlemap' ) );
		$value = nl2br( $value );
	}

	if ( isset( $link ) && ! empty( $link ) ) {
		printf(
			'<a href="%s" target="%s"%s>%s</a>',
			$link,
			'_blank',
			empty( $class_name ) ? '' : 'class="' . $class_name . '"',
			$value
		);
	} else {
		echo $value;
	}
}

function mtk_cat_cover() {
	if ( is_category() ) {
		$cat_id       = (int) get_query_var( 'cat' );
		$cat_key      = 'thumbnail_id';
		$cat          = get_category( $cat_id );
		$thumbnail_id = get_term_meta( $cat_id, $cat_key, true );

		if ( ! empty( $thumbnail_id ) ) {
			$thumbnail_url = wp_get_attachment_image_url( $thumbnail_id, 'large' );
			$content       = sprintf( '<!-- wp:cover {"url":"%1$s","id":77,"dimRatio":0,"align":"wide"} --><div class="wp-block-cover alignwide" style="background-image:url(%1$s)"><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"center","placeholder":"Write title…"} --><p style="text-align:center">%2$s</p><!-- /wp:paragraph --></div></div><!-- /wp:cover -->', $thumbnail_url, $cat->cat_name );

			echo implode( "\n", array_map( 'render_block', parse_blocks( $content ) ) );
		}
	}
}

function mtk_cat_description() {
	if ( is_category() ) {
		$cat_id    = (int) get_query_var( 'cat' );
		$transient = 'mtk_cat_description_' . $cat_id;
		$value     = get_transient( $transient );

		if ( false === $value ) {
			$cat         = get_category( $cat_id );
			$description = isset( $cat->description ) ? $cat->description : '';

			if ( ! empty( $description ) ) {
				include_once get_template_directory() . '/vendor/autoload.php';

				$md      = new Parsedown();
				$content = sprintf( '<!-- wp:marram/text-module --><p class="wp-block-marram-text-module mtk-text-module">%s</p><!-- /wp:marram/text-module -->', $md->line( $description ) );

				$value = implode( "\n", array_map( 'render_block', parse_blocks( $content ) ) );
			}

			set_transient( $transient, $value, YEAR_IN_SECONDS );
		}

		echo $value;
	}
}

function mtk_markdown_line( $value ) {
	include_once get_template_directory() . '/vendor/autoload.php';
	$md = new Parsedown();
	echo $md->line( $value );
}

function mtk_cat_footer() {
	$transient = 'mtk_cat_footer';
	$value     = get_transient( $transient );

	if ( false === $value ) {
		$page_id = get_option( 'page_on_front' );
		$content = get_the_content( null, false, $page_id );
		$blocks  = parse_blocks( $content );
		$length  = count( $blocks );
		$blocks  = array_filter(
			$blocks,
			function( $value, $key ) use ( $length ) {
				return 'marram/stay-in-touch' === $value['blockName'] || $key + 1 === $length;
			},
			ARRAY_FILTER_USE_BOTH
		);

		$value = implode( "\n", array_map( 'render_block', $blocks ) );

		set_transient( $transient, $value, YEAR_IN_SECONDS );
	}

	echo $value;
}

function mtk_entry_block() {
	global $post;

	$transient = 'mtk_entry_block_' . get_the_ID();
	$value     = get_transient( $transient );

	if ( false === $value ) {
		$content = sprintf( '<!-- wp:marram/fifty-fifty --><article class="wp-block-marram-fifty-fifty mtk-fifty-fifty"><div class="mtk-fifty-fifty__body"><h2 class="mtk-fifty-fifty__title">%1$s</h2><p class="mtk-fifty-fifty__content">%2$s</p><a class="mtk-fifty-fifty__button" href="%3$s">%4$s</a></div><figure class="mtk-fifty-fifty__image">%5$s</figure></article><!-- /wp:marram/fifty-fifty -->', get_the_title( $post ), get_the_excerpt( $post ), get_permalink( $post ), __( 'Read the full story', 'marram' ), get_the_post_thumbnail( $post, 'thumbnail' ) );

		$value = implode( "\n", array_map( 'render_block', parse_blocks( $content ) ) );

		set_transient( $transient, $value, YEAR_IN_SECONDS );
	}

	echo $value;
}
