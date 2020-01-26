<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Happenings' ) ) :

	class Happenings {

		protected $transient;

		public function __construct() {

			$this->transient = 'mtk-happenings';

			add_action( 'save_post', array( $this, 'clear_transient' ) );
			add_action( 'init', array( $this, 'custom_post_type' ), 0 );
			add_action( 'init', array( $this, 'custom_taxonomy' ), 0 );
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
		function clear_transient( $post_id ) {

			if ( ! wp_is_post_revision( $post_id ) ) {
				delete_transient( $this->transient );
				delete_transient( $this->transient . '-sounds' ); // TODO: Clear transients for all categories
				delete_transient( $this->transient . '-general' );
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
				'happening_meta_box',
				__( 'Happening Additional Info', 'marram' ),
				array( $this, 'render_metabox' ),
				'happening',
				'advanced',
				'default'
			);

		}

		/**
		 *
		 */
		public function register_block() {

			register_block_type(
				'marram/happenings',
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
				'happening',
				'meta',
				array(
					'schema'       => null,
					'get_callback' => function( $post ) {
						return get_post_meta( $post['id'] );
					},
				)
			);

			register_rest_field(
				'happening',
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

			$nonce_name   = isset( $_POST['happening_nonce'] ) ? $_POST['happening_nonce'] : null;
			$nonce_action = 'happening_nonce_action';

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
			$happening_date = isset( $_POST['happening_date'] )
				? sanitize_text_field( $_POST['happening_date'] ) : '';
			$happening_link = isset( $_POST['happening_link'] )
				? sanitize_url( $_POST['happening_link'] ) : '';

			// Update the meta field in the database.
			update_post_meta( $post_id, 'happening_date', $happening_date );
			update_post_meta( $post_id, 'happening_link', $happening_link );

		}

		/**
		 *
		 */
		public function render_metabox( $post ) {

			// Add nonce for security and authentication.
			wp_nonce_field( 'happening_nonce_action', 'happening_nonce' );

			// Retrieve an existing value from the database.
			$happening_date = get_post_meta( $post->ID, 'happening_date', true );
			$happening_link = get_post_meta( $post->ID, 'happening_link', true );

			// Set default values.
			if ( empty( $happening_date ) ) {
				$happening_date = '';
			}
			if ( empty( $happening_link ) ) {
				$happening_link = '';
			}

			// Form fields.
			?>
			<table class="form-table">
				<tr>
					<th>
						<label for="happening_date" class="happening_date_label"><?php _e( 'Date and time', 'marram' ); ?></label>
					</th>
					<td>
						<input type="text" id="happening_date" name="happening_date" class="regular-text" value="<?php echo esc_attr( $happening_date ); ?>">
					</td>
				</tr>
				<tr>
					<th>
						<label for="happening_link" class="happening_link_label"><?php _e( 'URL (Learn More)', 'marram' ); ?></label>
					</th>
					<td>
						<input type="url" id="happening_link" name="happening_link" class="regular-text" value="<?php echo esc_attr( $happening_link ); ?>">
					</td>
				</tr>
			</table>
			<?php

		}

		/**
		 *
		 */
		public function custom_post_type() {

			$labels = array(
				'name'                  => _x( 'Happenings', 'Post Type General Name', 'marram' ),
				'singular_name'         => _x( 'Happening', 'Post Type Singular Name', 'marram' ),
				'menu_name'             => __( 'Happenings', 'marram' ),
				'name_admin_bar'        => __( 'Happening', 'marram' ),
				'archives'              => __( 'Happening Archives', 'marram' ),
				'attributes'            => __( 'Happening Attributes', 'marram' ),
				'parent_item_colon'     => __( 'Parent Happening:', 'marram' ),
				'all_items'             => __( 'All Happenings', 'marram' ),
				'add_new_item'          => __( 'Add New Happening', 'marram' ),
				'add_new'               => __( 'Add New', 'marram' ),
				'new_item'              => __( 'New Happening', 'marram' ),
				'edit_item'             => __( 'Edit Happening', 'marram' ),
				'update_item'           => __( 'Update Happening', 'marram' ),
				'view_item'             => __( 'View Happening', 'marram' ),
				'view_items'            => __( 'View Happenings', 'marram' ),
				'search_items'          => __( 'Search Happening', 'marram' ),
				'not_found'             => __( 'Not found', 'marram' ),
				'not_found_in_trash'    => __( 'Not found in Trash', 'marram' ),
				'featured_image'        => __( 'Featured Image', 'marram' ),
				'set_featured_image'    => __( 'Set featured image', 'marram' ),
				'remove_featured_image' => __( 'Remove featured image', 'marram' ),
				'use_featured_image'    => __( 'Use as featured image', 'marram' ),
				'insert_into_item'      => __( 'Insert into happening', 'marram' ),
				'uploaded_to_this_item' => __( 'Uploaded to this happening', 'marram' ),
				'items_list'            => __( 'Happenings list', 'marram' ),
				'items_list_navigation' => __( 'Happenings list navigation', 'marram' ),
				'filter_items_list'     => __( 'Filter happenings list', 'marram' ),
			);
			$args   = array(
				'label'               => __( 'Happening', 'marram' ),
				'description'         => __( 'Happenings', 'marram' ),
				'labels'              => $labels,
				'supports'            => array( 'title', 'editor', 'thumbnail' ),
				'taxonomies'          => array( 'happening_category' ),
				'hierarchical'        => false,
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-calendar',
				'show_in_admin_bar'   => true,
				'show_in_nav_menus'   => true,
				'can_export'          => true,
				'has_archive'         => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => true,
				'capability_type'     => 'post',
				'show_in_rest'        => true,
			);
			register_post_type( 'happening', $args );

		}

		/**
		 *
		 */
		public function custom_taxonomy() {

			$labels = array(
				'name'                       => _x( 'Categories', 'Taxonomy General Name', 'marram' ),
				'singular_name'              => _x( 'Category', 'Taxonomy Singular Name', 'marram' ),
				'menu_name'                  => __( 'Categories', 'marram' ),
				'all_items'                  => __( 'All Categories', 'marram' ),
				'parent_item'                => __( 'Parent Category', 'marram' ),
				'parent_item_colon'          => __( 'Parent Category:', 'marram' ),
				'new_item_name'              => __( 'New Category Name', 'marram' ),
				'add_new_item'               => __( 'Add New Category', 'marram' ),
				'edit_item'                  => __( 'Edit Category', 'marram' ),
				'update_item'                => __( 'Update Category', 'marram' ),
				'view_item'                  => __( 'View Category', 'marram' ),
				'separate_items_with_commas' => __( 'Separate categories with commas', 'marram' ),
				'add_or_remove_items'        => __( 'Add or remove categories', 'marram' ),
				'choose_from_most_used'      => __( 'Choose from the most used', 'marram' ),
				'popular_items'              => __( 'Popular Categories', 'marram' ),
				'search_items'               => __( 'Search Categories', 'marram' ),
				'not_found'                  => __( 'Not Found', 'marram' ),
				'no_terms'                   => __( 'No categories', 'marram' ),
				'items_list'                 => __( 'Categories list', 'marram' ),
				'items_list_navigation'      => __( 'Categories list navigation', 'marram' ),
			);
			$args   = array(
				'labels'            => $labels,
				'hierarchical'      => true,
				'public'            => true,
				'show_ui'           => true,
				'show_admin_column' => true,
				'show_in_nav_menus' => true,
				'show_tagcloud'     => false,
				'show_in_rest'      => true,
			);
			register_taxonomy( 'happening_category', array( 'happening' ), $args );

		}

		/**
		 *
		 */
		public function render_block( $attributes, $content ) {

			global $post;

			$transient = $this->transient;
			if ( ! empty( $attributes['category'] ) ) {
				$transient .= '-' . $attributes['category'];
			}
			$output = get_transient( $transient );

			if ( false === $output ) {

				$types = plugin_dir_path( __DIR__ ) . 'src/happenings/types.js';
				$types = file_get_contents( $types );
				preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
				$block = end( $matches );
				$args  = array(
					'post_type'      => 'happening',
					'orderby'        => 'meta_value',
					'order'          => 'ASC',
					'posts_per_page' => 6,
				);
				if ( ! empty( $attributes['numberposts'] ) ) {
					$args['posts_per_page'] = intval( $attributes['numberposts'] );
				}
				if ( ! empty( $attributes['category'] ) ) {
					$args['tax_query'] = array(
						array(
							'taxonomy' => 'happening_category',
							'field'    => 'slug',
							'terms'    => $attributes['category'],
						),
					);
				}
				$query  = new WP_Query( $args );
				$output = $this->render_output( $query, $block );

				set_transient( $transient, $output, YEAR_IN_SECONDS );
			}

			return empty( $output ) ? '' : str_replace( '<div></div>', $output, $content );

		}

		/**
		 *
		 */
		public function render_output( $query, $block ) {

			global $post;

			if ( ! $query->have_posts() ) {
				return null;
			}

			ob_start();
			?>
			<div class="<?php echo $block; ?>__body">
				<?php
				$i = 0;
				while ( ! $i++ && $query->have_posts() ) :
					$query->the_post();
					?>
					<figure class="<?php echo $block; ?>__preview">
						<?php the_post_thumbnail( 'post-thumbnail', array( 'class' => $block . '__image' ) ); ?>
					</figure>
					<?php
				endwhile;
				$query->rewind_posts();
				?>
				<ol class="<?php echo $block; ?>__list">
					<?php
					while ( $query->have_posts() ) :
						$query->the_post();
						$format = 'l, n/j/y \a\t g:i a';
						$date   = get_post_meta( $post->ID, 'happening_date', true );
						$link   = esc_url( get_post_meta( $post->ID, 'happening_link', true ) );
						?>
						<li class="<?php echo $block; ?>__event" data-thumbnail="<?php echo esc_attr( get_the_post_thumbnail_url( $post->ID ) ); ?>">
							<span class="<?php echo $block; ?>__date"><?php mtk_markdown_line( $date ); ?></span>
							<h3 class="<?php echo $block; ?>__name"><?php the_title(); ?></h3>
							<div class="<?php echo $block; ?>__content">
								<?php the_content(); ?>
							</div>
							<?php if ( ! empty( $link ) ) : ?>
								<a class="<?php echo $block; ?>__button" href="<?php echo $link; ?>" target="_blank"><?php _e( 'Learn more', 'marram' ); ?></a>
							<?php endif; ?>
						</li>
						<?php
					endwhile;
					wp_reset_postdata();
					?>
				</ol>
			</div>
			<?php

			return ob_get_clean();

		}

	}

	new Happenings();

endif;
