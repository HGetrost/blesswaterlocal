<?php

require ('php/mcForm.php');

$form = new mcForm($_POST);
echo $form->doPost(); 

?>