<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Marram_Blocks' ) ) :

	class Marram_Blocks {

		protected $handle;

		function __construct() {

			$this->handle = 'marram-blocks';

			add_filter( 'block_categories', array( $this, 'custom_category' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ) );

		}

		function custom_category( $categories ) {

			$category = array(
				'slug'  => 'marram',
				'title' => __( 'Marram Exclusive', 'marram' ),
			);

			return array_merge( array( $category ), $categories );

		}

		function block_editor_assets() {

			$src = plugins_url( 'build/index.js', dirname( __FILE__ ) );
			$ver = filemtime( plugin_dir_path( __DIR__ ) . 'build/index.js' );

			wp_enqueue_script( $this->handle, $src, array(), $ver, true );

		}

		function render_event_form_block( $attributes, $content ) {

			$types = plugin_dir_path( __DIR__ ) . 'src/event-form/types.js';
			$types = file_get_contents( $types );
			preg_match( '/BLOCK.*?\'(.*?)\'/i', $types, $matches );
			$block = end( $matches );

			ob_start();
			?>
			<form action="" method="post" class="<?php echo $block; ?>__form">
				<div className="<?php echo $block; ?>__side">
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="full_name" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Full Name:', 'marram' ); ?>" aria-lable="<?php _e( 'Full Name', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="company" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Company:', 'marram' ); ?>" aria-lable="<?php _e( 'Company', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="address" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Address:', 'marram' ); ?>" aria-lable="<?php _e( 'Address', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="city" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'City:', 'marram' ); ?>" aria-lable="<?php _e( 'City', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="state" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'State:', 'marram' ); ?>" aria-lable="<?php _e( 'State', 'marram' ); ?>">
						<input type="text" name="zip" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'ZIP:', 'marram' ); ?>" aria-lable="<?php _e( 'ZIP', 'marram' ); ?>">
					</div>
				</div>
				<div className="<?php echo $block; ?>__side">
					<div class="<?php echo $block; ?>__field">
						<input type="email" name="email" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Email:', 'marram' ); ?>" aria-lable="<?php _e( 'Email', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="phone" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Phone:', 'marram' ); ?>" aria-lable="<?php _e( 'Phone', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="date" name="event_dates" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Event Dates:', 'marram' ); ?>" aria-lable="<?php _e( 'Event Dates', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<select name="event_type" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Event Type:', 'marram' ); ?>" aria-lable="<?php _e( 'Event Type', 'marram' ); ?>">
					</div>
					<div class="<?php echo $block; ?>__field">
						<input type="text" name="number_guests" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Number of Guests:', 'marram' ); ?>" aria-lable="<?php _e( 'Number of Guests', 'marram' ); ?>">
					</div>
				</div>
				<div class="<?php echo $block; ?>__wide_field">
					<input type="text" name="about" class="<?php echo $block; ?>__input" required placeholder="<?php _e( 'Tell us about your event...:', 'marram' ); ?>" aria-lable="<?php _e( 'About', 'marram' ); ?>">
				</div>
				<Button type="button" name="submit" class="<?php echo $block; ?>__button" aria-lable="<?php _e( 'Submit', 'marram' ); ?>">Inquire About Your Event</Button>
			</form>
			<?php
			$output  = ob_get_clean();
			$content = str_replace( '<div></div>', $output, $content );

			return $content;

		}

	}

	new Marram_Blocks();

endif;
