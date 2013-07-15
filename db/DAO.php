<?php
/**
 * Author : Asanka Nissanka
 * Date   : 3/15/13
 * Time   : 5:23 PM
 */
include 'DBConnect.php';

class DAO
{
    public function authenticateUser($username,$password){
        $dbConnect=new DBConnect();
        $dbConn=$dbConnect->getDBConn();
        $query="select * from User_List where user_name='"+$username+"' and password=sha1('"+$password+"')";
        $rs=mysql_query($query,$dbConn);
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
}
?>