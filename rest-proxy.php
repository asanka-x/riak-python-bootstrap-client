<?php
/**
 * Created by JetBrains PhpStorm.
 * User: asanka
 * Date: 3/14/13
 * Time: 1:58 AM
 *
 * SHOUTOUT REST PROXY
 */

if(isset($_GET['csurl'])){

    //HANDLING GET MESSAGES

    //set GET variables
    $url = $_GET['csurl'];
    unset($_get['csurl']);

    //open connection
    $ch = curl_init();
    //set the url
    curl_setopt($ch,CURLOPT_URL,$url);

    //execute get
    $result = curl_exec($ch);
    //close connection
    curl_close($ch);


}elseif(isset($_POST['csurl'])){

    //HANDLING POST MESSAGES

    //set POST variables
    $url = $_POST['csurl'];
    unset($_POST['csurl']);
    //JSON object
    $content=$_POST['content'];
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_CUSTOMREQUEST,"PUT");
    curl_setopt($ch,CURLOPT_POSTFIELDS,http_build_query($content));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    //execute post
    $result = curl_exec($ch);
    //close connection
    curl_close($ch);

    echo $result;
}

?>