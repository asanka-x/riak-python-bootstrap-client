<?php

function redirect_to( $location = NULL ) {
    if ($location != NULL) {
        header("Location: {$location}");
        exit;
    }

}

session_start();

$_SESSION=array();

if(isset($_COOKIE[session_name()])){

    setcookie(session_name(),'',0,'/');

}

session_destroy();

redirect_to("index.php");

?>