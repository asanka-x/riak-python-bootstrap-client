<?php
include "db/DBConnect.php";

function redirect_to( $location = NULL ) {
    if ($location != NULL) {
        header("Location: {$location}");
        exit;
    }

}

function authenticate_user($username,$password){
    $dbConnect=new DBConnect();

    if($dbConnect->authenticateUser($username,$password)){
        return TRUE;
    }else{
        return FALSE;
    }
}

?>