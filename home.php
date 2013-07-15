<?php

include_once 'includes/session.php';

include 'includes/functions.php';

confirmLogged();

?>

<!DOCTYPE html>
<html>
<head>
    <title>Object Storage for Work & Play</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet" media="screen">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet" media="screen">
</head>
<body>
<script src="js/jquery-1.9.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/knockout-2.2.1.js"></script>
<script src="js/jquery.knob.js"></script>
<script src="js/jquery-knob-settings.js"></script>
<script src="js/riak-connector.js"></script>

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="brand" href="#">Object Storage for Work & Play</a>
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <!--                    <li class="active"><a href="#">Home</a></li>
                                        <li><a href="#about">About</a></li>
                                        <li><a href="#contact">Contact</a></li>-->
                </ul>
            </div>
            <form method="post" action="logout.php">
                <p class="navbar-text pull-right">
                    Logged in as <a href="#" class="navbar-link"><?php echo $_SESSION['username'];?></a>&nbsp;
                    <button type="submit" class="btn btn-small" id="logout"><i class="icon-signout icon-large"></i></button>
                </p>

            </form>
        </div>
    </div>
</div>

<div class="tabbable tabs-left" style="margin-top: 50px;">
    <ul class="nav nav-tabs">
        <!--        <li class="active"><a href="#lA" data-toggle="tab"><i class="icon-envelope-alt icon-3x"></i></a></li>
                <li><a href="#lB" data-bind="click:animateKnob" data-toggle="tab"><i class="icon-group icon-3x"></i></a></li>
                <li><a href="#lC" data-toggle="tab"><i class="icon-bar-chart icon-3x"></i></a></li>-->
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="lA">

            <div class="span4 well well-large" id="send-message">
                <h3>Key Value Store</h3>
                <input type="text" data-bind="value:newBucket" placeholder="Enter Bucket Name Here..."><br>
                <input type="text" data-bind="value:newKey" placeholder="Enter key Here..."><br>
                <textarea rows="4" data-bind="value:newContent" placeholder="Enter Content Here..."></textarea><br>
                <button type="submit" class="btn btn-primary" data-bind="click:storeClicked"><i class="icon-hdd icon-white"></i> Store</button>
                <button type="button" class="btn" data-bind="click:clearClicked">Clear</button>
                <br>
                <br>


                <h3>File Store</h3>

                <input type="file" id="files" name="files[]" multiple />

                <div>
                    Size : <span id="fileSize"></span>
                </div>
                <div>
                    Type : <span id="fileType"></span>
                </div>
                <br>
                <button type="submit" class="btn btn-primary" data-bind=""><i class="icon-hdd icon-white"></i> Upload</button>
                <button type="button" class="btn" data-bind="">Clear</button>
                <output id="list"></output>


            </div>

            <div class="well span10">
                <div class="row-fluid">
                    <div class="span11" data-bind="visible:showBuckets">
                        <!-- ko foreach: buckets -->
                        <div class="span1" data-bind="click:$parent.bucketClicked">
                            <i class="icon-folder-close icon-3x"></i><br><span data-bind="text: $data"></span>
                        </div>
                        <!-- /ko -->
                    </div>
                    <div class="span11" data-bind="visible:showKeys">
                        <label><strong data-bind="text:selectedBucket"></strong> Contents</label>
                        <!-- ko foreach: keys -->
                        <div class="span2" data-bind="click:$parent.keyClicked">
                            <i class="icon-file icon-3x"></i><br><span data-bind="text: $data"></span>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>
                <div class="row-fluid" data-bind="visible:showContent">
                    <div class="span11">
                        <label>Key <strong data-bind="text:selectedKey"></strong> Content</label>
                        <textarea rows="5" data-bind="value:content" style="width: 100%"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary"><i class="icon-edit icon-white"></i> Update</button>
                    <button type="submit" class="btn btn-primary" data-bind="click:deleteClicked"><i class="icon-trash icon-white"></i> Delete</button>
                </div>

            </div>

        </div>

        <!--Under construction-->
        <div class="tab-pane" id="lB">


            <input class="knob" data-thickness=".4" data-readOnly=true value="0">

        </div>
        <div class="tab-pane" id="lC">

        </div>
    </div>
</div>
</body>
</html>