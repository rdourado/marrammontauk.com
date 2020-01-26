<?php
get_header();

while ( have_posts() ) {
	the_post();

	if ( function_exists( 'yoast_breadcrumb' ) ) {
		yoast_breadcrumb( '<p class="mtk-breadcrumbs">', '</p>' );
	}

	the_content();
}

get_footer();
