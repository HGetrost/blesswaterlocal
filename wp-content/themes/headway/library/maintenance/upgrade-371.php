<?php
/**
 * 3.7.1
 *
 * Change wrapper instance IDs and change MySQL collate and charset
 */
add_action('headway_do_upgrade_371', 'headway_do_upgrade_371');
function headway_do_upgrade_371() {

	global $wpdb;

	/* Alter MySQL schema */
	Headway::mysql_dbdelta();

	/* Loop through installed Templates and fix wrapper instance IDs */
	$templates = HeadwayTemplates::get_all(true, true);

	foreach ( $templates as $template_id => $template ) {

		$template_design_settings = get_option( 'headway_|template=' . $template_id . '|_option_group_design', array() );

		if ( !empty($template_design_settings) ) {

			$template_design_settings = headway_preg_replace_json( "/-layout-[\w-]*/", '', $template_design_settings );
			update_option( 'headway_|template=' . $template_id . '|_option_group_design', $template_design_settings );

		}

	}

}