<?php

use Scri\EvalTimeTracking\Controller\Controller;

require "../vendor/autoload.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$controller = new Controller();
if(isset($_GET['controller'], $_GET['id'])) {
    switch ($_GET['controller']){
        case "detailed":
            $controller->detailedPage($_GET['id']);
            break;
    }
}
else  if (isset($_GET['controller'])) {
    switch ($_GET['controller']){
        case "connexion":
            $controller->connexionPage($_POST);
            break;
        case "inscription":
            $controller->inscriptionPage($_POST);
            break;
    }
}
else {
    $controller->homePage();
}