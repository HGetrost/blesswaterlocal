<?php
/**
 * Pre-3.2.3
 *
 * Change the old wrapper-horizontal-padding and wrapper-vertical-padding to design editor values
 **/
add_action( 'headway_do_upgrade_323', 'headway_do_upgrade_323' );
function headway_do_upgrade_323() {

	require_once HEADWAY_LIBRARY_DIR . '/maintenance/legacy-classes.php';

	$horizontal_padding = HeadwayOption::get( 'wrapper-horizontal-padding', 'general', 15 );
	$vertical_padding = HeadwayOption::get( 'wrapper-vertical-padding', 'general', 15 );

	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'padding-top', $vertical_padding );
	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'padding-bottom', $vertical_padding );

	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'padding-left', $horizontal_padding );
	HeadwayElementsData_Upgrade34::set_property( 'structure', 'wrapper', 'padding-right', $horizontal_padding );

}