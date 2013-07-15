<?php
/**
 * Author : Asanka Nissanka
 * Date   : 3/31/13
 * Time   : 10:51 AM
 */

include "DBConnect.php";

$dbConnect=new DBConnect();

$user="demo";
$pass="dem2o";

echo "User demo".$dbConnect->authenticateUser($user,$pass);
?>