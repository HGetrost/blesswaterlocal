<?php
/**
 * 3.8.2
 *
 * Responsive Grid defaults to enabled now
 */
add_action('headway_do_upgrade_382', 'headway_do_upgrade_382');
function headway_do_upgrade_382() {

    /* Alter MySQL schema */
    Headway::mysql_dbdelta();

    /* If responsive grid isn't enabled then set the option */
    if ( HeadwaySkinOption::get('enable-responsive-grid', false, false) === false ) {
        HeadwaySkinOption::set('enable-responsive-grid', false);
    }

}