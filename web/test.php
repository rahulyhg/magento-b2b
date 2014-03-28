<?php

require 'bootstrap.php';

try 
{
	$fwc = FastWayConnector::getConnector(FactoryAbastract::service('Courier')->get(3));
	$suburbArray = $fwc->getListOfDeliverySuburbs('MEL');
	
	foreach($suburbArray as $suburb)
	{
		var_dump('Town :' . $suburb->Town);
		var_dump('PostCode :' . $suburb->Postcode);
		var_dump('State :' . $suburb->State);
		var_dump('Label :' . $suburb->label);
		var_dump('---------------------');
	}
}
catch(Exception $ex)
{
	var_dump($ex->getMessage());
}




// $wsdl = 'http://hairdemo.websiteforyou.com.au/api/v2_soap/?wsdl';
// $options = array('exceptions' => true, 'encoding'=>'utf-8', 'compression' => SOAP_COMPRESSION_ACCEPT | SOAP_COMPRESSION_GZIP);
// $options = array_merge($options, array('proxy_host' => "proxy.bytecraft.internal",'proxy_port' => 3128));
// $client = new SoapClient($wsdl, $options);
// $functions = $client->__getFunctions();
// var_dump($functions);

// $session = $client->login('B2BUser', 'B2BUser');
// var_dump($session);

// $filter = array('filter' => array(
//                     'key' => 'created_at',
//                     'value' => '2014-03-21 12:12:07',
//                 )
// );
// try {
// $result = $client->salesOrderList($session, $filter);
// }
// catch(Exception $ex)
// {
// 	$client->
// 	var_dump($ex->getMessage());
// }
//var_dump($result);
