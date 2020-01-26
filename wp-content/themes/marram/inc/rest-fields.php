<?php

function mtk_rest_api_featured_media_init() {

	$post_types = get_post_types( array( 'public' => true ), 'objects' );
	foreach ( $post_types as $post_type ) {
		$show_in_rest       = isset( $post_type->show_in_rest ) && $post_type->show_in_rest;
		$supports_thumbnail = post_type_supports( $post_type->name, 'thumbnail' );
		if ( $show_in_rest && $supports_thumbnail ) {
			register_rest_field(
				$post_type->name,
				'featured_media_obj',
				array(
					'get_callback' => 'mtk_rest_api_featured_media',
					'schema'       => null,
				)
			);
		}
	}

}
add_action( 'init', 'mtk_rest_api_featured_media_init' );

function mtk_rest_api_featured_media( $object, $field_name, $request ) {

	if ( ! empty( $object['featured_media'] ) ) {
		$image_id = (int) $object['featured_media'];
	} else {
		return null;
	}

	$image = get_post( $image_id );
	if ( ! $image ) {
		return null;
	}

	$featured_media                  = array( 'id' => $image_id );
	$featured_media['post']          = $image->post_parent ? intval( $image->post_parent ) : null;
	$featured_media['alt_text']      = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
	$featured_media['media_type']    = wp_attachment_is_image( $image_id ) ? 'image' : 'file';
	$featured_media['media_details'] = wp_get_attachment_metadata( $image_id );
	$featured_media['source_url']    = wp_get_attachment_url( $image_id );

	if (
		isset( $featured_media['media_details']['sizes'] )
		&& ! empty( $featured_media['media_details']['sizes'] )
	) {
		foreach ( $featured_media['media_details']['sizes'] as $size => &$size_data ) {
			$image_src = wp_get_attachment_image_src( $image_id, $size );
			if ( $image_src ) {
				$size_data['source_url'] = reset( $image_src );
			}
		}
	}

	return $featured_media;

}
