<?php

require ('mcApiCall.php');

class mcForm 
{
	private $email;
	private $fName;
	private $mergeFields = array();
	private $originalList;
	private $signupList;
	private $updateIfExists;
	private $redirectURI;
	private $redirectPageTitle;
	private $mcResult;

	/** 
	* Create a new instance of the form being processed and sets attributes from the HTML form
	* @param object $form
	*/
	public function __construct($form)
	{
		// Get all the values from the form being processed
		$this->fName = (isset($form['fname'])) ? strtolower(strip_tags($form['fname'])) : 'not set';
		$this->email = (isset($form['email'])) ? strtolower(strip_tags($form['email'])) : 'not set';
		$this->mergeFields['DIGEST'] = (isset($form['digest'])) ? strip_tags($form['digest']) : 'No';
		$this->mergeFields['UPLIFT'] = (isset($form['uplift'])) ? strip_tags($form['uplift']) : 'No';
		$this->mergeFields['UNIFY'] = (isset($form['unify'])) ? strip_tags($form['unify']) : 'No';
		$this->originalList = (isset($form['list'])) ? strip_tags($form['list']) : 'not set';
//		$this->signupList = ($this->digest == 'Yes') ? 'UPLIFT' : $this->originalList;
		$this->signupList = ($this->mergeFields['DIGEST'] == 'Yes') ? 'UPLIFT' : $this->originalList;
		$this->updateIfExists = (isset($form['updateIfExists'])) ? strip_tags($form['updateIfExists']) : true;

		// Split out the redirect into the URL & Page Title if it is set
		If (isset($form['redirect'])) {
			list($URI, $PageTitle) = explode(';', strip_tags($form['redirect']));
			$this->redirectURI = $URI;
			$this->redirectPageTitle = $PageTitle;
		} else {
			$this->redirectURI = $this->redirectPageTitle = 'not set';
		}

	}

	/** 
	* Processes the form instance by posting to the Mailchimp API
	* @param bool $updateIfExists
	* @return array
	*/
	public function doPost()
	{
		$mc = new MailChimp($this->signupList);
		$this->mcResult = $mc->doSignup($this->email, $this->fName, $this->mergeFields, $this->updateIfExists);
		$this->mcResult['redirectURI'] = $this->redirectURI;
		$this->mcResult['redirectPageTitle'] = $this->redirectPageTitle;
		return json_encode($this->mcResult);
	}

}
