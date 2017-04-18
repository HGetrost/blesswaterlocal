<?php

require ('mcSettings.php');
require ('mcMsgs.php');

class MailChimp
{
	
	private $apiKey;
	private $listID;
	private $listName;
	private $email;
	private $mergeFields;
	private $apiUrl = 'https://<dc>.api.mailchimp.com/3.0/';
	
	/** 
	* Create a new instance
	* @param string $mcListName - Optional
	*/
	public function __construct($mcListName = 'UPLIFT')
	{
		// Use the API Key defined in the settings file.
		if (MC_API_KEY) { 
			$this->setApiKey(MC_API_KEY);
		}
		$this->setListID($mcListName);
	}
	
	/** 
	* Method to Set Api Key
	* @param string $apiKey
	*/
	private function setApiKey($apiKey)
	{
		$this->apiKey = $apiKey;
		list(, $datacentre) = explode('-', $this->apiKey);
		$this->apiUrl = str_replace('<dc>', $datacentre, $this->apiUrl);
	}

	/** 
	* Method to Set List ID to work with
	* @param string $mcListID
	*/
	public function setListID($mcListName)
	{
		$this->listName = $mcListName;
		switch ($mcListName) {
			case 'UPLIFT':
				$this->listID = UPLIFT_LIST_ID;
				break;
			case 'Peace':
				$this->listID = PEACE_LIST_ID;
				break;
			case 'Water':
				$this->listID = WATER_LIST_ID;
				break;
			case 'Yoga':
				$this->listID = YOGA_LIST_ID;
				break;
			case 'Global':
				$this->listID = GLOBAL_LIST_ID;
				break;
			case 'YogaAndStress':
				$this->listID = YS_LIST_ID;
				break;
			case 'Bless':
				$this->listID = BTW_LIST_ID;
				break;
			case 'Breathing':
				$this->listID = BREATH_LIST_ID;
				break;
			default:
				$this->listID = UPLIFT_LIST_ID;
				break;
		}
	}

	/** 
	* Method to get the curent list ID, for use with functions that require it
	* @params none
	*/
	public function getListID() {
		return $this->listID;
	}

	/** 
	* Magic Method to request http verb
	* @return array
	*/
	public function __call($method, $arguments)
	{
		$httpVerb = strtoupper($method);
		$allowedHttpVerbs = array('GET', 'POST', 'PATCH', 'DELETE');
		
		//Validate http verb
		if(in_array($httpVerb, $allowedHttpVerbs)){
			$endPoint = $arguments[0];
			$data = isset($arguments[1]) ? $arguments[1] : array();
			return $this->request($httpVerb, $endPoint, $data);
		}
		
		throw new \Exception('Invalid http verb!');
	}
	
	/** 
	* Call MailChimp API
	* @param string $httpVerb
	* @param string $endPoint - (http://kb.mailchimp.com/api/resources)
	* @param array $data - Optional
	* @return array
	*/
	private function request($httpVerb = 'GET', $endPoint, $data = array())
	{
		//validate API
		if(! $this->apiKey){
			throw new \Exception('MailChimp API Key must be set before making request!');
		}
		
		$endPoint = ltrim($endPoint, '/');
		$httpVerb = strtoupper($httpVerb);
		$requestUrl = $this->apiUrl.$endPoint;
		
		return $this->curlRequest($requestUrl, $httpVerb, $data);
	}
	
	/** 
	* Request using curl extension
	* @param string $url
	* @param string $httpVerb
	* @param array $data - Optional
	* @return array
	*/
	private function curlRequest($url, $httpVerb, array $data = array(), $curlTimeout = 15)
	{
		if(function_exists('curl_init') && function_exists('curl_setopt')){
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
			curl_setopt($ch, CURLOPT_USERAGENT, 'VPS/MC-API:3.0');
			curl_setopt($ch, CURLOPT_TIMEOUT, $curlTimeout);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_USERPWD, "user:".$this->apiKey);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $httpVerb);
			
			//Submit data
			if(!empty($data)){
				$jsonData = json_encode($data);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
			}
			
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($ch);
			curl_close($ch);
			
			return $result ? json_decode($result, true) : false;
		}

		throw new \Exception('curl extension is missing!');
	}

	/**
	* Check the Return Status
	* @param string $MCReturn - the MC result
	* @param bool $doPatch - update the member if they already exist
	* @return array
	*/
	private function checkMCStatus($MCResult, $isPatch = false)
	{
		$returnVal['success'] = 'true';
		$returnVal['update'] = ($isPatch) ? 'true' : 'false';
		$returnVal['exists'] = 'false';
		$returnVal['email'] = $this->email;
		$returnVal['message'] = MC_STATUS_SUCCESS;

		// If status is pendin,g all is well, otherwise...
		if (($MCResult['status'] != 'pending') && ($MCResult['status'] != 'subscribed')) {

			// If member aleady existts
			if ($MCResult['title'] == 'Member Exists') {
	  			$returnVal['exists'] = 'true';
	  			$returnVal['message'] = MC_STATUS_EXISTS_NO_UPDATE;

	  		// If there is a problem and they don't already exist, the email must be invalidf
			} else {
				$returnVal['success'] = 'false';
				$returnVal['error'] = 'invalid';
				$returnVal['message'] = MC_STATUS_ERROR_INVALID;
			}
		}

		if ($isPatch) {
	  		$returnVal['exists'] = 'true';
			$returnVal['message'] = MC_STATUS_EXISTS_UPDATED;
		}

		$returnVal['listinfo'] = $this->listName . ',' . $this->listID;
		$returnVal['mergeFields'] = $this->mergeFields;
		return $returnVal;
		//return $return_val ? json_encode($return_val) : false;
	}

	/**
	* Function wrapper to do the sign up process. Paramaeter to check is subscrober is already on the list, then update their details
	* @param string  $email
	* @param string  $fname
	* @param array   $mergeArray  Array of all merge fields aside from FNAME  
	* @param bool    $doUpdate
	* @return array
	*/
	public function doSignup($email, $fName, $mergeArray = array(), $doUpdate = false)
	{
		$this->email = $email;
		
		// Build the merge fields array
		$mergeFields = [];
		if ($fName != 'not set') {
			$mergeFields['FNAME'] = $fName;
		};
		$this->mergeFields = (isset($mergeArray)) ? array_merge($mergeFields, $mergeArray) : $mergeFields;

		// Subscribe the user to the list
		$result = $this->post('/Lists/' . $this->listID . '/members', array(
		    'email_address' => $email,
		    'merge_fields' => $this->mergeFields,
		    'status' => 'pending'
		));

		// Check out the status returned from MailChimp and see if we need to update the MailChimp email
		$status = $this->checkMCStatus($result);
		if (($status['exists'] == "true") && ($doUpdate)) {

			$patchResult = $this->patch('/Lists/' . $this->listID . '/members/' . md5($email), array(
				'email_address' => $email,	
		    	'merge_fields' => $this->mergeFields,
				'status' => 'subscribed'
			));

			// Check and echo the update result
			$patchStatus = $this->checkMCStatus($patchResult, $doUpdate);
			return $patchStatus;

		} else {

			return $status;

		}

	}

}

?>