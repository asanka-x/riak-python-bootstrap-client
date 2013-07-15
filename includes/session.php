<?php
session_start();

function loggedIn(){

    return isset($_SESSION['username']);

}

function confirmLogged(){

    if(!loggedIn()){

        redirect_to('index.php');

    }

}

?>