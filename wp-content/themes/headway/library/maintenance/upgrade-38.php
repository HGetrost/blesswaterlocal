<?php
/**
 * 3.8
 *
 * Fixed database for WordPress 4.2
 */
add_action( 'headway_do_upgrade_38', 'headway_do_upgrade_38' );
function headway_do_upgrade_38() {

	/* Alter MySQL schema */
	Headway::mysql_dbdelta();

}