<?php

function mtk_add_setting( $wp_customize, $args ) {
	$defaults = array(
		'type'    => 'text',
		'default' => '',
	);
	$args     = wp_parse_args( $args, $defaults );

	$wp_customize->add_setting(
		$args['id'],
		array(
			'default'   => $args['default'],
			'type'      => 'theme_mod',
			'transport' => 'refresh',
		)
	);
	$wp_customize->add_control(
		'marram_' . $args['id'],
		array(
			'label'    => $args['label'],
			'section'  => $args['section'],
			'settings' => $args['id'],
			'type'     => $args['type'],
		)
	);
}

function mtk_customize_register( $wp_customize ) {

	$section = 'marram_options';

	$wp_customize->add_section(
		$section,
		array(
			'title'       => __( 'Contact', 'marram' ),
			'description' => __( 'Define hotel’s contact forms', 'marram' ),
			'priority'    => 35,
		)
	);

	mtk_add_setting(
		$wp_customize,
		array(
			'label'   => __( 'Email', 'marram' ),
			'id'      => 'email',
			'type'    => 'email',
			'section' => $section,
			'default' => 'hello@marramontauk.com',
		)
	);
	mtk_add_setting(
		$wp_customize,
		array(
			'label'   => __( 'Phone', 'marram' ),
			'id'      => 'phone',
			'type'    => 'tel',
			'section' => $section,
			'default' => '+16316682050',
		)
	);
	mtk_add_setting(
		$wp_customize,
		array(
			'label'   => __( 'Address', 'marram' ),
			'id'      => 'address',
			'type'    => 'textarea',
			'section' => $section,
			'default' => "21 Oceanview Terrace\nMontauk, NY 11954",
		)
	);
	mtk_add_setting(
		$wp_customize,
		array(
			'label'   => __( 'Google Map URL', 'marram' ),
			'id'      => 'googlemap',
			'type'    => 'url',
			'section' => $section,
			'default' => 'https://goo.gl/maps/UB5zosbXrRC2',
		)
	);

}
add_action( 'customize_register', 'mtk_customize_register' );
