<?php
require_once('simplesaml/lib/_autoload.php');
$as = new \SimpleSAML\Auth\Simple('default-sp');
$as->requireAuth();
$attributes = $as->getAttributes();
$session = \SimpleSAML\Session::getSessionFromRequest();
$session->cleanup();

?>

