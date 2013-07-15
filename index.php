<?php

include_once 'includes/session.php';

include 'includes/functions.php';

if(loggedIn()){//

    redirect_to('home.php');

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>
        Login to Shoutout
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    <style type="text/css">
        body {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;
        }

        .form-signin {
            max-width: 300px;
            padding: 19px 29px 29px;
            margin: 0 auto 20px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            box-shadow: 0 1px 2px rgba(0,0,0,.05);
        }
        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }
        .form-signin input[type="text"],
        .form-signin input[type="password"] {
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }

    </style>

</head>

<body data-spy="scroll" data-target=".bs-docs-sidebar">

<div class="row-fluid well">
    <div class="span4 offset4">
        <form class="form-signin" method="post" action="check_login.php">
            <img src="img/logo.png" class="offset1">
            <input type="text" placeholder="User Name" name="username" class="input-block-level" required="">
            <input type="password" placeholder="Password" name="password" class="input-block-level" >
            <button type="submit" class="btn btn-large btn-primary offset4">LOGIN</button>
        </form>
    </div>
</div>

<?php

$error="<div class='alert alert-error' >Invalid combination of login!Try again</div>";

if(isset ($_GET["attempt"])) {

    if($_GET["attempt"] == "0") {
        echo $error;
    }
}

?>

<script src="js/jquery.js"></script>
<script src="js/bootstrap.js"></script>

</body>
</html>
