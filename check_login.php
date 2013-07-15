<?php

include_once 'includes/session.php';

include 'includes/functions.php';

//**when user has logged to the system he can't log him again until logout.so here navigate again to the guider's page at that time
if(loggedIn()){//

    redirect_to('home.php');

}

$log = $_POST;//get the logging data...

$name = $log["username"];

$pass = $log["password"];

$url = 'home.php';//to send some data to the next page when correct logged occer//here no need due to sessions...

$condition=FALSE;

if(authenticate_user($name,$pass)) {//match the combination...

    $_SESSION['username'] = $name;//create a session variables...

    $_SESSION['userId'] = "S01";

    redirect_to( $url );

    $condition = TRUE;

}

if(!$condition){

    redirect_to('index.php?attempt=0');//when get fail loggin

}

?>



