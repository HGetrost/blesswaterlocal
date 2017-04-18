<?php
/**
 * Pre-3.4
 *
 * - Change block and wrapper margins to Design Editor values
 * - Convert Media blocks to Slider or Embed blocks
 **/
add_action( 'headway_do_upgrade_34', 'headway_do_upgrade_34' );
function headway_do_upgrade_34() {

	require_once HEADWAY_LIBRARY_DIR . '/maintenance/legacy-classes.php';

	/* Change block and wrapper margins to Design Editor values */
	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'margin-top', HeadwayOption::get( 'wrapper-top-margin', 'general', 30 ) );
	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'margin-bottom', HeadwayOption::get( 'wrapper-bottom-margin', 'general', 30 ) );

	HeadwayElementsData_Upgrade34::set_property( 'default-elements', 'default-block', 'margin-bottom', HeadwayOption::get( 'block-bottom-margin', 'general', 10 ) );

	/* Convert Media blocks to Slider or Embed blocks */
	$media_blocks = HeadwayBlocksData_Upgrade34::get_blocks_by_type( 'media' );

	if ( is_array( $media_blocks ) && count( $media_blocks ) ) {

		foreach ( $media_blocks as $media_block_id => $media_block_layout_id ) {

			$media_block = HeadwayBlocksData_Upgrade34::get_block( $media_block_id );

			$media_block_mode = headway_get( 'mode', $media_block['settings'], 'embed' );

			switch ( $media_block_mode ) {

				case 'embed':

					HeadwayBlocksData_Upgrade34::update_block( $media_block['layout'], $media_block['id'], array(
						'type' => 'embed'
					) );

					break;

				case 'image-rotator':

					$slider_images = array();

					foreach ( headway_get( 'images', $media_block['settings'], array() ) as $media_block_image ) {

						$slider_images[] = array(
							'image' => $media_block_image,
							'image-description' => null,
							'image-hyperlink' => null
						);

					}

					HeadwayBlocksData_Upgrade34::update_block( $media_block['layout'], $media_block['id'], array(
						'type' => 'slider',
						'settings' => array(
							'images' => $slider_images
						)
					) );

					break;

			}

		}

	}

}