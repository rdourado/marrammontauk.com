<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Stay_In_Touch' ) ) :

	class Stay_In_Touch {

		protected $transient;

		function __construct() {

			$this->transient = 'mtk-stay-in-touch';

			add_action( 'init', array( $this, 'register_block' ) );
			add_action( 'save_post', array( $this, 'clear_transient' ) );
			add_action( 'wp_ajax_stay_in_touch_modal', array( $this, 'stay_in_touch_modal' ) );
			add_action( 'wp_ajax_nopriv_stay_in_touch_modal', array( $this, 'stay_in_touch_modal' ) );

		}

		function register_block() {

			register_block_type(
				'marram/stay-in-touch',
				array(
					'render_callback' => array( $this, 'render_block' ),
				)
			);

		}

		function clear_transient( $post_id ) {

			if ( ! wp_is_post_revision( $post_id ) ) {
				delete_transient( $this->transient );
			}

		}

		function render_block( $attributes, $content ) {

			$links = get_transient( $this->transient );

			if ( false === $links ) {
				$types = plugin_dir_path( __DIR__ ) . 'src/stay-in-touch/types.js';
				$types = file_get_contents( $types );
				preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
				$block   = end( $matches );
				$privacy = get_page_by_path( 'privacy-policy' );
				$terms   = get_page_by_path( 'terms-of-service' );

				ob_start();
				?>
				<ul class="<?php echo $block; ?>__links">
					<?php if ( $privacy ) : ?>
						<li class="<?php echo $block; ?>__link">
							<a href="<?php echo get_permalink( $privacy ); ?>"><?php echo get_the_title( $privacy ); ?></a>
						</li>
					<?php endif; ?>
					<?php if ( $terms ) : ?>
						<li class="<?php echo $block; ?>__link">
							<a href="<?php echo get_permalink( $terms ); ?>"><?php echo get_the_title( $terms ); ?></a>
						</li>
					<?php endif; ?>
				</ul>
				<?php
				$links = ob_get_clean();

				set_transient( $this->transient, $links, YEAR_IN_SECONDS );
			}

			ob_start();
			?>
			<div class="mc_embed_signup">
				<form action="https://atlanticterrace.us7.list-manage.com/subscribe/post?u=8b1b8eff94af8086756582f90&amp;id=818bc94e2d" method="post" name="mc-embedded-subscribe-form" class="mtk-stay-in-touch__form mc-embedded-subscribe-form validate" target="_blank" novalidate>
					<div class="mtk-stay-in-touch__field">
						<input type="email" name="EMAIL" id="mce-EMAIL" class="mtk-stay-in-touch__input required email" required placeholder="<?php esc_attr_e( 'Please enter your Email Address', 'marram' ); ?>" aria-label="<?php esc_attr_e( 'Email Address', 'marram' ); ?>">
						<input type="text" name="MMERGE5" id="mce-MMERGE5" class="mtk-stay-in-touch__input" placeholder="<?php esc_attr_e( 'Zip Code (Optional)', 'marram' ); ?>" aria-label="<?php esc_attr_e( 'Zip Code', 'marram' ); ?>" maxlength="10">
						<input type="submit" value="<?php esc_attr_e( 'Submit', 'marram' ); ?>" name="subscribe" class="mtk-stay-in-touch__button mc-embedded-subscribe button">
					</div>
					<div class="mtk-stay-in-touch__responses mce-responses">
						<div class="mtk-stay-in-touch__response mce-error-response" style="display:none"></div>
						<div class="mtk-stay-in-touch__response mce-success-response" style="display:none"></div>
					</div>
					<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
					<div style="position: absolute; left: -5000px;" aria-hidden="true">
						<input type="text" name="b_8b1b8eff94af8086756582f90_818bc94e2d" tabindex="-1" value="">
					</div>
				</form>
			</div>
			<?php
			$form = ob_get_clean();

			$output  = trim( $form ) . $links;
			$content = str_replace( '<div></div>', $output, $content );

			return $content;

		}

		function stay_in_touch_modal() {

			$content = '<section class="wp-block-marram-stay-in-touch mtk-stay-in-touch"><h2 class="mtk-stay-in-touch__title">Stay in touch</h2><p class="mtk-stay-in-touch__lead">There’s always something going on here. Stay in the loop for events, experiences and more.</p><div></div></section>';

			echo $this->render_block( array(), $content );

			wp_die();

		}

	}

	new Stay_In_Touch();

endif;
