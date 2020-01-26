<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Galleries' ) ) :

	class Galleries {

		public function __construct() {

			add_action( 'init', array( $this, 'custom_post_type' ), 0 );
			add_action( 'init', array( $this, 'register_block' ) );
			add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );

			if ( is_admin() ) {
				add_action( 'load-post.php', array( $this, 'init_metabox' ) );
				add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );
			}

		}

		/**
		 *
		 */
		public function init_metabox() {

			add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
			add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

		}

		/**
		 *
		 */
		public function add_metabox() {

			add_meta_box(
				'gallery_meta_box',
				__( 'Listing blocks content', 'marram' ),
				array( $this, 'render_metabox' ),
				'gallery',
				'side',
				'default'
			);

		}

		/**
		 *
		 */
		public function register_block() {

			register_block_type(
				'marram/galleries',
				array(
					'render_callback' => array( $this, 'render_block' ),
				)
			);

		}

		/**
		 *
		 */
		public function register_rest_fields() {

			register_rest_field(
				'gallery',
				'meta',
				array(
					'schema'       => null,
					'get_callback' => function( $post ) {
						return get_post_meta( $post['id'] );
					},
				)
			);

			register_rest_field(
				'gallery',
				'featured_media_url',
				array(
					'schema'       => null,
					'get_callback' => function( $post ) {
						return get_the_post_thumbnail_url( $post['id'] );
					},
				)
			);

		}

		/**
		 *
		 */
		public function save_metabox( $post_id, $post ) {

			$nonce_name   = isset( $_POST['gallery_nonce'] ) ? $_POST['gallery_nonce'] : null;
			$nonce_action = 'gallery_nonce_action';

			// Check if a nonce is set and valid.
			if ( ! isset( $nonce_name ) || ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
				return;
			}

			// Check if the user has permissions to save data.
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}

			// Check if it's not an autosave nor a revision.
			if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
				return;
			}

			// Sanitize user input.
			$gallery_label = isset( $_POST['gallery_label'] )
				? sanitize_text_field( $_POST['gallery_label'] ) : '';

			// Update the meta field in the database.
			update_post_meta( $post_id, 'gallery_label', $gallery_label );

		}

		/**
		 *
		 */
		public function render_metabox( $post ) {

			// Add nonce for security and authentication.
			wp_nonce_field( 'gallery_nonce_action', 'gallery_nonce' );

			// Retrieve an existing value from the database.
			$gallery_label = get_post_meta( $post->ID, 'gallery_label', true );

			// Set default values.
			if ( empty( $gallery_label ) ) {
				$gallery_label = __( 'View gallery', 'marram' );
			}

			// Form fields.
			?>
			<div class="components-base-control">
				<div class="components-base-control__field">
					<label for="gallery_label" class="components-base-control__label"><?php _e( 'Button label', 'marram' ); ?></label>
					<input type="text" id="gallery_label" name="gallery_label" class="components-text-control__input" aria-describedby="gallery_label__help" value="<?php echo esc_attr( $gallery_label ); ?>">
					<p id="gallery_label__help" class="components-base-control__help"><?php _e( 'Used only on Gallery page', 'marram' ); ?></p>
				</div>
			</div>
			<?php

		}

		/**
		 *
		 */
		public function custom_post_type() {

			$labels = array(
				'name'                  => _x( 'Galleries', 'Post Type General Name', 'marram' ),
				'singular_name'         => _x( 'Gallery', 'Post Type Singular Name', 'marram' ),
				'menu_name'             => __( 'Galleries', 'marram' ),
				'name_admin_bar'        => __( 'Gallery', 'marram' ),
				'archives'              => __( 'Gallery Archives', 'marram' ),
				'attributes'            => __( 'Gallery Attributes', 'marram' ),
				'parent_item_colon'     => __( 'Parent Gallery:', 'marram' ),
				'all_items'             => __( 'All Galleries', 'marram' ),
				'add_new_item'          => __( 'Add New Gallery', 'marram' ),
				'add_new'               => __( 'Add New', 'marram' ),
				'new_item'              => __( 'New Gallery', 'marram' ),
				'edit_item'             => __( 'Edit Gallery', 'marram' ),
				'update_item'           => __( 'Update Gallery', 'marram' ),
				'view_item'             => __( 'View Gallery', 'marram' ),
				'view_items'            => __( 'View Galleries', 'marram' ),
				'search_items'          => __( 'Search Gallery', 'marram' ),
				'not_found'             => __( 'Not found', 'marram' ),
				'not_found_in_trash'    => __( 'Not found in Trash', 'marram' ),
				'featured_image'        => __( 'Featured Image', 'marram' ),
				'set_featured_image'    => __( 'Set featured image', 'marram' ),
				'remove_featured_image' => __( 'Remove featured image', 'marram' ),
				'use_featured_image'    => __( 'Use as featured image', 'marram' ),
				'insert_into_item'      => __( 'Insert into gallery', 'marram' ),
				'uploaded_to_this_item' => __( 'Uploaded to this gallery', 'marram' ),
				'items_list'            => __( 'Galleries list', 'marram' ),
				'items_list_navigation' => __( 'Galleries list navigation', 'marram' ),
				'filter_items_list'     => __( 'Filter galleries list', 'marram' ),
			);
			$args   = array(
				'label'               => __( 'Gallery', 'marram' ),
				'description'         => __( 'Image galleries', 'marram' ),
				'labels'              => $labels,
				'supports'            => array( 'title', 'editor', 'thumbnail' ),
				'hierarchical'        => false,
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-format-gallery',
				'show_in_admin_bar'   => true,
				'show_in_nav_menus'   => true,
				'can_export'          => true,
				'has_archive'         => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => true,
				'capability_type'     => 'post',
				'show_in_rest'        => true,
			);
			register_post_type( 'gallery', $args );

		}

		/**
		 *
		 */
		private function render_body( $block_class, $content ) {
			$blocks = parse_blocks( $content );
			$index  = array_search( 'marram/page-heading', array_column( $blocks, 'blockName' ) );
			$block  = substr( $blocks[ $index ]['innerHTML'], 60, -7 );
			$block  = str_replace( 'mtk-page-heading', $block_class, $block );
			$block  = str_replace( 'h1', 'h2', $block );

			echo $block;
		}

		/**
		 *
		 */
		public function render_block( $attributes, $content ) {

			global $post;

			$types = plugin_dir_path( __DIR__ ) . 'src/galleries/types.js';
			$types = file_get_contents( $types );
			preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
			$block      = end( $matches );
			$thumb_attr = array( 'class' => $block . '__image' );

			$query = new WP_Query(
				array(
					'post_type'      => 'gallery',
					'post__not_in'   => array( get_the_ID() ),
					'posts_per_page' => isset( $attributes['numberposts'] )
						? intval( $attributes['numberposts'] )
						: 3,
				)
			);

			if ( ! is_page() ) {
				$page = get_page_by_path( 'gallery' );
				if ( ! $page ) {
					$page = get_page_by_path( 'galleries' );
				}
			}

			ob_start();
			?>
			<div class="<?php echo $block; ?>">
				<?php
				if ( ! empty( $page ) ) :
					$link  = get_permalink();
					$label = get_post_meta( $page->ID, 'gallery_label', true );
					if ( empty( $label ) ) {
						$label = __( 'View gallery', 'marram' );
					}
					if ( has_post_thumbnail( $page ) ) :
						?>
						<div class="<?php echo $block; ?>__entry">
							<figure class="<?php echo $block; ?>__thumbnail">
								<a href="<?php echo $link; ?>">
									<?php echo get_the_post_thumbnail( $page, 'post-thumbnail', $thumb_attr ); ?>
								</a>
							</figure>
							<?php $this->render_body( $block, get_the_content( null, false, $page ) ); ?>
							<a class="<?php echo $block; ?>__button" href="<?php echo $link; ?>"><?php echo $label; ?></a>
						</div>
						<?php
					endif;
				endif;

				while ( $query->have_posts() ) :
					$query->the_post();
					$link  = get_permalink();
					$label = get_post_meta( $post->ID, 'gallery_label', true );
					if ( empty( $label ) ) {
						$label = __( 'View gallery', 'marram' );
					}
					$blocks = parse_blocks( get_the_content() );
					$index  = array_search( 'marram/page-heading', array_column( $blocks, 'blockName' ) );
					if ( has_post_thumbnail() ) :
						?>
						<div class="<?php echo $block; ?>__entry">
							<figure class="<?php echo $block; ?>__thumbnail">
								<a href="<?php echo $link; ?>">
									<?php the_post_thumbnail( 'post-thumbnail', $thumb_attr ); ?>
								</a>
							</figure>
							<?php $this->render_body( $block, get_the_content( $post ) ); ?>
							<a class="<?php echo $block; ?>__button" href="<?php echo $link; ?>"><?php echo $label; ?></a>
						</div>
						<?php
					endif;
				endwhile;
				wp_reset_postdata();
				?>
			</div>
			<?php
			$content = ob_get_clean();

			return $content;

		}

	}

	new Galleries();

endif;
