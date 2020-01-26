<?php

add_shortcode( 'posts', 'mtk_posts_shortcode' );

function mtk_posts_shortcode( $atts ) {

	global $post;

	// Attributes
	$pairs = array(
		'posts_per_page' => 0,
		'taxonomy'       => '',
		'tax_slug'       => '',
	);
	$atts  = shortcode_atts( $pairs, $atts, 'posts' );
	$paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;

	$transient = 'mtk-post-shortcode-' . $paged . '-' . json_encode( $atts );
	$output    = get_transient( $transient );

	if ( false === $output ) {
		$output = '';
		$args   = array(
			'post_type'      => 'post',
			'posts_per_page' => intval( $atts['posts_per_page'] ),
			'paged'          => $paged,
		);
		if ( ! empty( $atts['taxonomy'] ) && ! empty( $atts['tax_slug'] ) ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => $atts['taxonomy'],
					'field'    => 'slug',
					'terms'    => $atts['tax_slug'],
				),
			);
		}
		$query = new WP_Query( $args );

		if ( $query->have_posts() ) :

			$big             = 999999999; // need an unlikely integer
			$translated      = __( 'Page', 'marram' );
			$pagination_args = array(
				array(
					'base'               => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
					'format'             => '?paged=%#%',
					'current'            => $paged,
					'total'              => $query->max_num_pages,
					'before_page_number' => '<span class="screen-reader-text">' . $translated . ' </span>',
					'prev_next'          => true,
					'prev_text'          => __( 'Prev', 'marram' ),
					'next_text'          => __( 'Next', 'marram' ),
				),
			);

			$output .= '<div class="mtk-pagination">' . paginate_links( $pagination_args ) . '</div>';

			while ( $query->have_posts() ) {
				$query->the_post();

				$content = sprintf( '<!-- wp:marram/fifty-fifty --><article class="wp-block-marram-fifty-fifty mtk-fifty-fifty"><div class="mtk-fifty-fifty__body"><h2 class="mtk-fifty-fifty__title">%1$s</h2><p class="mtk-fifty-fifty__content">%2$s</p><a class="mtk-fifty-fifty__button" href="%3$s">%4$s</a></div><figure class="mtk-fifty-fifty__image">%5$s</figure></article><!-- /wp:marram/fifty-fifty -->', get_the_title( $post ), get_the_excerpt( $post ), get_permalink( $post ), __( 'Read the full story', 'marram' ), get_the_post_thumbnail( $post, 'thumbnail' ) );

				$output .= implode( "\n", array_map( 'render_block', parse_blocks( $content ) ) );
			}

			$output .= '<div class="mtk-pagination">' . paginate_links( $pagination_args ) . '</div>';

		endif;
		wp_reset_postdata();

		set_transient( $transient, $output, YEAR_IN_SECONDS );
	}

	return $output;

}
