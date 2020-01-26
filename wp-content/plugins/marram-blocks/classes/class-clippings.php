<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Clippings' ) ) :

	/**
	 * Undocumented class
	 */
	class Clippings {

		/**
		 * Undocumented variable
		 *
		 * @var [type]
		 */
		protected $transient;

		/**
		 * Undocumented function
		 */
		public function __construct() {

			$this->transient = 'mtk-clippings';

			add_action( 'init', array( $this, 'custom_post_type' ), 0 );
			add_action( 'init', array( $this, 'register_block' ) );
			add_action( 'save_post', array( $this, 'clear_transient' ) );
			add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );

			if ( is_admin() ) {
				add_action( 'load-post.php', array( $this, 'init_metabox' ) );
				add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );
			}

		}

		/**
		 * Undocumented function
		 *
		 * @return void
		 */
		public function custom_post_type() {

			$labels = array(
				'name'                  => _x( 'Clippings', 'Post Type General Name', 'marram' ),
				'singular_name'         => _x( 'Clipping', 'Post Type Singular Name', 'marram' ),
				'menu_name'             => __( 'Clippings', 'marram' ),
				'name_admin_bar'        => __( 'Clipping', 'marram' ),
				'archives'              => __( 'Clipping Archives', 'marram' ),
				'attributes'            => __( 'Clipping Attributes', 'marram' ),
				'parent_item_colon'     => __( 'Parent Clipping:', 'marram' ),
				'all_items'             => __( 'All Clippings', 'marram' ),
				'add_new_item'          => __( 'Add New Clipping', 'marram' ),
				'add_new'               => __( 'Add New', 'marram' ),
				'new_item'              => __( 'New Clipping', 'marram' ),
				'edit_item'             => __( 'Edit Clipping', 'marram' ),
				'update_item'           => __( 'Update Clipping', 'marram' ),
				'view_item'             => __( 'View Clipping', 'marram' ),
				'view_items'            => __( 'View Clippings', 'marram' ),
				'search_items'          => __( 'Search Clipping', 'marram' ),
				'not_found'             => __( 'Not found', 'marram' ),
				'not_found_in_trash'    => __( 'Not found in Trash', 'marram' ),
				'featured_image'        => __( 'Featured Image', 'marram' ),
				'set_featured_image'    => __( 'Set featured image', 'marram' ),
				'remove_featured_image' => __( 'Remove featured image', 'marram' ),
				'use_featured_image'    => __( 'Use as featured image', 'marram' ),
				'insert_into_item'      => __( 'Insert into clipping', 'marram' ),
				'uploaded_to_this_item' => __( 'Uploaded to this clipping', 'marram' ),
				'items_list'            => __( 'Clippings list', 'marram' ),
				'items_list_navigation' => __( 'Clippings list navigation', 'marram' ),
				'filter_items_list'     => __( 'Filter clippings list', 'marram' ),
			);
			$args   = array(
				'label'               => __( 'Clipping', 'marram' ),
				'description'         => __( 'Clippings', 'marram' ),
				'labels'              => $labels,
				'supports'            => array( 'title', 'thumbnail' ),
				'taxonomies'          => array(),
				'hierarchical'        => false,
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'menu_position'       => 5,
				'menu_icon'           => 'dashicons-paperclip',
				'show_in_admin_bar'   => true,
				'show_in_nav_menus'   => true,
				'can_export'          => true,
				'has_archive'         => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => true,
				'capability_type'     => 'post',
				'show_in_rest'        => true,
			);
			register_post_type( 'clipping', $args );

		}

		/**
		 * Undocumented function
		 *
		 * @return void
		 */
		public function register_block() {

			register_block_type( 'marram/clippings', array( 'render_callback' => array( $this, 'render_block' ) ) );

		}

		/**
		 * Undocumented function
		 *
		 * @param [type] $post_id
		 * @return void
		 */
		public function clear_transient( $post_id ) {

			if ( ! wp_is_post_revision( $post_id ) ) {
				delete_transient( $this->transient );
			}

		}

		/**
		 * Undocumented function
		 *
		 * @return void
		 */
		public function register_rest_fields() {

			register_rest_field(
				'clipping',
				'meta',
				array(
					'schema'       => null,
					'get_callback' => function( $post ) {
						return get_post_meta( $post['id'] );
					},
				)
			);

			register_rest_field(
				'clipping',
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
		 * Undocumented function
		 *
		 * @return void
		 */
		public function init_metabox() {

			add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
			add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

		}

		/**
		 * Undocumented function
		 *
		 * @return void
		 */
		public function add_metabox() {

			add_meta_box(
				'clipping_meta_box',
				__( 'Clipping Info', 'marram' ),
				array( $this, 'render_metabox' ),
				'clipping',
				'advanced',
				'default'
			);

		}

		/**
		 * Undocumented function
		 *
		 * @param [type] $post_id
		 * @param [type] $post
		 * @return void
		 */
		public function save_metabox( $post_id, $post ) {

			$nonce_action = 'clipping_nonce_action';
			$nonce_name   = sanitize_text_field( wp_unslash( $_POST['clipping_nonce'] ?? null ) );

			// Check if a nonce is set and valid.
			if ( empty( $nonce_name ) || ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
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
			$clipping_excerpt = sanitize_text_field( wp_unslash( $_POST['clipping_excerpt'] ?? null ) );
			$clipping_link    = esc_url_raw( wp_unslash( $_POST['clipping_link'] ?? null ) );

			// Update the meta field in the database.
			update_post_meta( $post_id, 'clipping_excerpt', $clipping_excerpt );
			update_post_meta( $post_id, 'clipping_link', $clipping_link );

		}

		/**
		 * Undocumented function
		 *
		 * @param [type] $post
		 * @return void
		 */
		public function render_metabox( $post ) {

			// Add nonce for security and authentication.
			wp_nonce_field( 'clipping_nonce_action', 'clipping_nonce' );

			// Retrieve an existing value from the database.
			$clipping_excerpt = get_post_meta( $post->ID, 'clipping_excerpt', true );
			$clipping_link    = get_post_meta( $post->ID, 'clipping_link', true );

			// Set default values.
			if ( empty( $clipping_excerpt ) ) {
				$clipping_excerpt = '';
			}
			if ( empty( $clipping_link ) ) {
				$clipping_link = '';
			}

			// Form fields.
			?>
			<table class="form-table">
				<tr>
					<th>
						<label for="clipping_excerpt" class="clipping_excerpt_label"><?php esc_html_e( 'Excerpt', 'marram' ); ?></label>
					</th>
					<td>
						<textarea name="clipping_excerpt" id="clipping_excerpt" cols="40" rows="4" class="large-text"><?php echo esc_textarea( $clipping_excerpt ); ?></textarea>
					</td>
				</tr>
				<tr>
					<th>
						<label for="clipping_link" class="clipping_link_label"><?php esc_html_e( 'URL (Read More)', 'marram' ); ?></label>
					</th>
					<td>
						<input type="url" id="clipping_link" name="clipping_link" class="large-text code" value="<?php echo esc_attr( $clipping_link ); ?>">
					</td>
				</tr>
			</table>
			<?php

		}

		/**
		 * Undocumented function
		 *
		 * @param [type] $attributes
		 * @param [type] $content
		 * @return void
		 */
		public function render_block( $attributes, $content ) {

			global $post;

			$transient = $this->transient;
			delete_transient( $transient );
			$output = get_transient( $transient );

			if ( false === $output ) {

				$types = plugin_dir_path( __DIR__ ) . 'src/clippings/types.js';
				$types = file_get_contents( $types ); // phpcs:ignore WordPress.WP.AlternativeFunctions

				preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
				$block = end( $matches );
				$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
				$order = get_query_var( 'order' );
				$args  = array(
					'post_type'      => 'clipping',
					'posts_per_page' => 6,
					'orderby'        => 'date',
					'order'          => $order,
					'paged'          => $paged,
				);
				if ( ! empty( $attributes['numberposts'] ) ) {
					$args['posts_per_page'] = intval( $attributes['numberposts'] );
				}
				$query  = new WP_Query( $args );
				$output = $this->render_output( $query, $block );

				set_transient( $transient, $output, YEAR_IN_SECONDS );
			}

			return empty( $output ) ? '' : str_replace( '<div></div>', $output, $content );

		}

		/**
		 * Undocumented function
		 *
		 * @param [type] $query
		 * @param [type] $block
		 * @return void
		 */
		public function render_output( $query, $block ) {

			global $post;

			if ( ! $query->have_posts() ) {
				return null;
			}

			ob_start();
			?>
			<div class="<?php echo esc_attr( "${block}__body" ); ?>">

				<nav class="<?php echo esc_attr( 'mtk-query-args' ); ?>">
					<div class="<?php echo esc_attr( 'mtk-query-args__wrapper' ); ?>">
						<strong class="<?php echo esc_attr( 'mtk-query-args__title' ); ?>">
							<?php esc_html_e( 'Filter by:', 'marram' ); ?>
						</strong>

						<?php
						global $wp;
						$current_url = home_url( add_query_arg( array(), $wp->request ) );
						$order_asc   = add_query_arg( 'order', 'asc', $current_url );
						$order_desc  = add_query_arg( 'order', 'desc', $current_url );
						$order       = get_query_var( 'order' );
						?>
						<ul class="<?php echo esc_attr( 'mtk-query-args__params' ); ?>">
							<li class="<?php echo esc_attr( 'mtk-query-args__order' . ( 'DESC' === $order ? ' mtk-query-args__order--current' : null ) ); ?>">
								<a href="<?php echo esc_url( $order_desc ); ?>"><?php esc_html_e( 'Newest first', 'marram' ); ?></a>
							</li>
							<li class="<?php echo esc_attr( 'mtk-query-args__order' . ( 'ASC' === $order ? ' mtk-query-args__order--current' : null ) ); ?>">
								<a href="<?php echo esc_url( $order_asc ); ?>"><?php esc_html_e( 'Oldest first', 'marram' ); ?></a>
							</li>
						</ul>
					</div>

					<div class="<?php echo esc_attr( 'mtk-query-args__pagination' ); ?>">
						<?php
						$big  = 999999999; // need an unlikely integer.
						$args = array(
							'base'      => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
							'format'    => '?paged=%#%',
							'current'   => max( 1, get_query_var( 'paged' ) ),
							'prev_text' => __( 'Back', 'marram' ),
							'next_text' => __( 'Next', 'marram' ),
							'total'     => $query->max_num_pages,
						);
						echo wp_kses_post( paginate_links( $args ) );
						?>
					</div>
				</nav>

				<ol class="<?php echo esc_attr( "${block}__entries-list" ); ?>">
					<?php
					while ( $query->have_posts() ) :
						$query->the_post();
						$excerpt = get_post_meta( $post->ID, 'clipping_excerpt', true );
						$link    = get_post_meta( $post->ID, 'clipping_link', true );
						?>
						<li class="<?php echo esc_attr( "${block}__entry" ); ?>">

							<figure class="<?php echo esc_attr( "${block}__preview" ); ?>">
								<?php the_post_thumbnail( 'post-thumbnail', array( 'class' => "${block}__image" ) ); ?>
								<figcaption class="<?php echo esc_attr( "${block}__caption" ); ?>">
									<?php the_title(); ?>
								</figcaption>
							</figure>

							<blockquote class="<?php echo esc_attr( "${block}__excerpt" ); ?>">
								<?php mtk_markdown_line( $excerpt ); ?>
							</blockquote>

							<?php if ( ! empty( $link ) ) { ?>
								<a href="<?php echo esc_url( $link ); ?>" class="<?php echo esc_attr( "${block}__button" ); ?>" target="_blank">
									<?php esc_html_e( 'Read more', 'marram' ); ?>
								</a>
							<?php } ?>

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

	new Clippings();

endif;
