<?php

header('Access-Control-Allow-Origin: *');

/*
* AjaxAccess.php
* Handles all the AJAX requests from the home.php
* Usually responds with XML
*/


//obtain the database connection
include_once 'includes/session.php';
include_once 'db/DBConnect.php';


$dbConnect=new DBConnect();

$method=$_GET['method'];

if(strcmp($method,"addUserBucketKeyMapping")==0){
    $status=$dbConnect->addUserBucketKeyMapping($_SESSION['username'],$_GET['bucket'],$_GET['key']);
    if($status)
        echo 'User Bucket-Key Mapping Added';
    else
        echo 'User Bucket-Key Mapping Error';
}
else{
    if(strcmp($method,"getUserBuckets")==0){
        $bucketList=$dbConnect->getUserBuckets($_SESSION['username']);
        echo json_encode($bucketList);
    }else{
        if(strcmp($method,"getUserBucketKeys")==0){
            $keyList=$dbConnect->getUserBucketKeys($_SESSION['username'],$_GET['bucket']);
            echo json_encode($keyList);
        }else{

        }
    }
}

?>