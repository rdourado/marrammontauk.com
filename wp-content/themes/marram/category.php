<?php

get_header();

$pagination_args = array(
	'mid_size'  => 2,
	'prev_text' => __( 'Prev', 'marram' ),
	'next_text' => __( 'Next', 'marram' ),
);

mtk_cat_cover();
mtk_cat_menu();
mtk_cat_description();

echo '<div class="mtk-pagination">';
the_posts_pagination( $pagination_args );
echo '</div>';

while ( have_posts() ) {
	the_post();
	mtk_entry_block();
}

echo '<div class="mtk-pagination">';
the_posts_pagination( $pagination_args );
echo '</div>';

mtk_cat_footer();

get_footer();
