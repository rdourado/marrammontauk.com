<?php

require get_template_directory() . '/vendor/autoload.php';

get_header();

$output  = '';
$first   = 0;
$post_id = ! empty( $_GET['post'] )
	? url_to_postid( urldecode( $_GET['post'] ) )
	: 0;

if ( $post_id ) {
	$output .= '<header class="mtk-close-up__header">';
	$output .= sprintf(
		'<h1 class="mtk-close-up__title">%s</h1>',
		get_the_title( $post_id )
	);
	$output .= sprintf(
		'<a href="%s" class="mtk-close-up__close">%s</a>',
		get_permalink( $post_id ),
		__( 'Go back to the gallery', 'marram' )
	);
	$output .= '</header>';
}

$output .= '<div class="mtk-close-up">';

if ( $post_id ) {
	$md      = new Parsedown();
	$content = get_the_content( null, false, $post_id );
	$blocks  = parse_blocks( $content );
	$key     = array_search( 'core/gallery', array_column( $blocks, 'blockName' ) );

	if ( isset( $blocks[ $key ] ) ) {
		$block = $blocks[ $key ];
		$ids   = isset( $block['attrs']['ids'] ) ? $block['attrs']['ids'] : array();

		foreach ( $ids as $index => $id ) {
			$image   = wp_get_attachment_image( $id, 'large' );
			$title   = get_the_title( $id );
			$caption = wp_get_attachment_caption( $id );
			$output .= sprintf(
				'<figure>%s<figcaption><strong>%s </strong>%s</figcaption></figure>',
				$image,
				$title,
				$md->line( $caption )
			);
			if ( get_the_ID() === $id ) {
				$first = $index;
			}
		}
	}
} else {
	while ( have_posts() ) {
		the_post();
		$image   = wp_get_attachment_image( get_the_ID(), 'large' );
		$title   = get_the_title( $id );
		$caption = wp_get_attachment_caption( get_the_ID() );
		$output .= sprintf(
			'<figure>%s<figcaption><strong>%s</strong> %s</figcaption></figure>',
			$image,
			$title,
			$md->line( $caption )
		);
	}
}

$output .= '</div>';
$output .= '<script>var slickParams = { initialSlide: ' . $first . ' }</script>';

echo $output;

get_footer();
