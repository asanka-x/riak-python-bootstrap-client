<?php
/**
 * Author : Asanka Nissanka
 * Date   : 3/15/13
 * Time   : 4:59 PM
 */
class DBConnect{
    //Database connection parameters
    protected $host = "127.0.0.1:3306";
    protected $username = "root";
    protected $password = "";
    protected $db = "riak-file-store";

    protected $con;

    function __construct(){
        //echo "In BaseClass constructor";
        $this->con=mysql_connect($this->host,$this->username,$this->password);
        if(!$this->con){
            //echo "Database connection failed !";
        }else{
            $dbSel= mysql_select_db($this->db,$this->con);
            if(!$dbSel){
                //echo "Database selection failed !";
            }
        }

    }

    public function authenticateUser($username,$password){
        $query="select * from users where username='".$username."' and password=sha1('".$password."') and status=1";
        //echo "Query :".$query;
        $rs=mysql_query($query,$this->con);
        if(mysql_num_rows($rs)!=0){
            return TRUE;
        }else{
            while($row=mysql_fetch_assoc($rs)){
                $t_user=$row["user_name"];
                $t_pass=$row["password"];
                if(($username==$t_user) && (sha1($password)==$t_pass)){
                    return TRUE;
                }else{
                    return FALSE;
                }
            }
        }
    }

    public function addUserBucketKeyMapping($username,$bucket,$key){
        $currentDate=date("Y-m-d");
        $query="INSERT INTO `riak-file-store`.`user_key_mappings` (`id`, `username`, `bucket_name`, `bucket_key`, `last_modified`) VALUES (NULL, '".$username."', '".$bucket."', '".$key."', '".$currentDate."')";
        if(!mysql_query($query,$this->con)){
            return FALSE;
        }else{
            return TRUE;
        }
    }

    public function updateUserUsage($username,$size){
        $query="UPDATE `users` SET used=used+".floatval($size)." WHERE username='".$username."'";
        if(!mysql_query($query,$this->con)){
            return FALSE;
        }else{
            return TRUE;
        }
    }



    public function removeUserBucketKeyMapping($username,$bucket,$key){
        $query="DELETE FROM `user_key_mappings` WHERE username='".$username."' AND bucket_name='".$bucket."' AND bucket_key='".$key."'";
        if(!mysql_query($query,$this->con)){
            return FALSE;
        }else{
            return TRUE;
        }
    }

    public function getUserBuckets($username){
        $query="SELECT DISTINCT(bucket_name) FROM `user_key_mappings` WHERE username='".$username."'";
        $rs=mysql_query($query,$this->con);
        $json=array();
        if(mysql_num_rows($rs)==0){

        }else{

            while($row=mysql_fetch_assoc($rs)){
                array_push($json,$row['bucket_name']);
            }
        }
        return array("buckets"=>$json);
    }

    public function getUserBucketKeys($username,$bucket){
        $query="SELECT bucket_key FROM `user_key_mappings` WHERE username='".$username."' AND bucket_name='".$bucket."'";
        $rs=mysql_query($query,$this->con);
        $json=array();
        if(mysql_num_rows($rs)==0){

        }else{

            while($row=mysql_fetch_assoc($rs)){
                array_push($json,$row['bucket_key']);
            }
        }
        return array("keys"=>$json);
    }

}



?>