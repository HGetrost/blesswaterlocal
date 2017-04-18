<?php

/*
 * Plugin Name: Cross Browser CSS Normaliser
 * Plugin URI: http://techknowsystems.com.au/wp/plugins/cross-browser
 * Description: Loads in a normaliser CSS file before all other CSS filrs to assis with cross bowser compatability for your website. This uses the 'necolas/normalize.css' project on GitHub
 * Version: 0.1
 * Author: Shaa Taylor, Nicolas Gallagher, Jonathan Neal
 * Author URI: https://github.com/necolas
 * License: GPLv2
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class cbcssNormalise
{

	private static $_this;

	/**
	 * returns the instation of the cbcsNormalise class
	 *
	 * @param   mone
	 * @return  object  cbcssNormalise
	 * @throws  mpme
	 */
	static function this() {

		return self::$_this;

	}

	/**
	 * Enqueues styles using the coreect hook with top priority so they appear before all other styles. Init is not usually the palce to enqueue styles, but for this reset, this is the place!
	 * 
	 * @param   none
	 * @return  object  cbrcssNormalise 
	 * @throws  wp_die  if this lass is instantiated more than once 
	 */
	public function __construct() {

		if (isset(self::$_this)) { wp_die (sprintf (__('%s can only be created once', 'cross-browser-css-normalise'), getclass ($this))); }
		
		self::$_this = $this;
		add_action ('init', array ($this, 'cbcss_enqueue_style'), 1);

	}

	/**
	 * Gete the files to enqueue from the plugin subdirectories
	 * 
	 * @param   none
	 * @return  none
	 * @throws  none
	 */
	public function cbcss_enqueue_style () {

		wp_register_style ('cbcss-normalise', plugin_dir_url (__FILE__) . 'css/normalize.min.css');
		wp_enqueue_style ('cbcss-normalise');

	}

}

new cbcssNormalise();
