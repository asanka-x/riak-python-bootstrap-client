/**
 * Created with JetBrains PhpStorm.
 * User: asanka
 * Date: 2/24/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    var viewModel = function(){
        var self=this;

        this.buckets = ko.observableArray(); // These are the initial options
        this.keys=ko.observableArray();
        this.selectedBucket=ko.observable();
        this.selectedKey=ko.observable("");
        this.content=ko.observable("");
        this.newBucket=ko.observable("");
        this.newKey=ko.observable("");
        this.newContent=ko.observable("");

        this.bucketClicked=ko.computed(function(){
            if(self.selectedBucket()!=undefined){
                console.log("BUCKET "+self.selectedBucket());
                $.ajax({
                    type: "GET",
                    url: 'http://localhost/riak-python-bootstrap-client/deprecated/rest-proxy.php?csurl=http://127.0.0.1:8998/buckets/'+self.selectedBucket()+'/keys?keys=true',
                    dataType:"json",
                    success: function(result) {
                        console.log("SUCCESS! DATA : "+result.keys);
                        self.keys(result.keys);
                    },
                    error: function(e) {
                        console.log("ERROR : "+e);
                    }});
            }
        });

        this.keyClicked=ko.computed(function(){
            if(self.selectedBucket()!=undefined && self.selectedKey()!=undefined){
                console.log("BUCKET : "+self.selectedBucket()+" Key : "+self.selectedKey());
                self.content('');
                var url='http://localhost/riak-python-bootstrap-client/deprecated/rest-proxy.php?csurl=http://127.0.0.1:8998/buckets/'+self.selectedBucket()+'/keys/'+self.selectedKey();
                console.log("URL : "+url);
                $.ajax({
                    type: "GET",
                    url:url,
                    contentType:"text/plain",
                    dataType:"text",
                    success: function(result) {
                        console.log("SUCCESS! DATA : "+result);
                        self.content(result);
                    },
                    error: function(e) {
                        console.log("ERROR : "+e);
                    }});
            }

        });

        this.clearClicked=function(){
            self.newBucket('');
            self.newKey('');
            self.newContent('');
        };

        this.storeClicked=function(){
            var url='http://localhost/riak-python-bootstrap-client/deprecated/rest-proxy.php';
            if(self.newBucket()!=undefined && self.newKey().length==0 && self.newContent()!=undefined){
                console.log('RANDOM KEY STORE');
                var csurl='http://127.0.0.1:8998/riak/'+self.newBucket();
                $.ajax({
                    type: "POST",
                    url:url,
                    contentType:"text/plain",
                    dataType:"text",
                    data:self.newContent(),
                    beforeSend: function(xhr){xhr.setRequestHeader('X_CSURL_HEADER',csurl);},
                    statusCode:{
                        404:function(){
                            alert('Page Not Found!');
                        }
                    },
                    success: function(result) {
                        console.log("SUCCESS! DATA : "+result);
                        self.content(result);
                    },
                    error: function(e) {
                        console.log("ERROR : "+e);
                    }});
            }else{
                if(self.newBucket()!=undefined && self.newKey()!=undefined && self.newContent()!=undefined){
                    var csurl='http://127.0.0.1:8998/riak/'+self.newBucket()+'/'+self.newKey();
                    $.ajax({
                        type: "PUT",
                        url:url,
                        contentType:"text/plain",
                        dataType:"text",
                        data:self.newContent(),
                        beforeSend: function(xhr){xhr.setRequestHeader('X_CSURL_HEADER',csurl);},
                        statusCode:{
                            404:function(){
                                alert('Page Not Found!');
                            }
                        },
                        success: function(result) {
                            console.log("SUCCESS! DATA : "+result);
                            self.content(result);
                        },
                        error: function(e) {
                            console.log("ERROR : "+e);
                        }});
                }else{

                }
            }
            this.getBucketList();
        };

        this.deleteClicked=function(){
            var url='http://localhost/riak-python-bootstrap-client/deprecated/rest-proxy.php';
            if(self.selectedBucket()!=undefined && self.selectedKey()!=undefined){
                console.log("BUCKET : "+self.selectedBucket()+" DELETE Key : "+self.selectedKey());
                var csurl='http://127.0.0.1:8998/riak/'+self.selectedBucket()+'/'+self.selectedKey();
                console.log("DELETE URL : "+csurl);
                $.ajax({
                    type: "DELETE",
                    url:url,
                    contentType:"text/plain",
                    dataType:"text",
                    beforeSend: function(xhr){xhr.setRequestHeader('X_CSURL_HEADER',csurl);},
                    statusCode:{
                        404:function(){
                            alert('Page Not Found!');
                        }
                    },
                    success: function(result) {
                        console.log("DELETE SUCCESS!");
                        self.content(result);
                        this.getBucketList();
                    },
                    error: function(e) {
                        console.log("DELETE ERROR : "+e);
                    }});
            }else{
                //Delete complete bucket

                /*if(self.selectedBucket()!=undefined && self.selectedKey()==undefined){
                 console.log("BUCKET : "+self.selectedBucket()+" DELETE Key : "+self.selectedKey());
                 var csurl='http://127.0.0.1:8998/riak/'+self.selectedBucket();
                 console.log("DELETE URL : "+csurl);
                 $.ajax({
                 type: "DELETE",
                 url:url,
                 contentType:"text/plain",
                 dataType:"text",
                 beforeSend: function(xhr){xhr.setRequestHeader('X_CSURL_HEADER',csurl);},
                 statusCode:{
                 404:function(){
                 alert('Page Not Found!');
                 }
                 },
                 success: function(result) {
                 console.log("SUCCESS! DATA : "+result);
                 self.content(result);
                 },
                 error: function(e) {
                 console.log("ERROR : "+e);
                 }});
                 }*/
            }

        };
        this.getBucketList=function(){
            $.ajax({
                type: "GET",
                url: 'http://localhost/riak-python-bootstrap-client/deprecated/rest-proxy.php?csurl=http://127.0.0.1:8998/buckets?buckets=true',
                dataType:"json",
                success: function(result) {
                    console.log("SUCCESS! DATA : "+result.buckets);
                    self.buckets(result.buckets);
                },
                error: function(e) {
                    console.log("ERROR : "+ e.toString());
                }});
        };

        this.getBucketList();
    };


    ko.applyBindings(new viewModel);




});

function fileSelected() {
    var file = document.getElementById('fileToUpload').files[0];
    var reader=new FileReader();
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                document.getElementById('fileBinary').innerHTML=e.target.result;
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsBinaryString(file);
        //reader.readAsDataURL(file);

        document.getElementById('fileName').innerHTML = file.name;
        document.getElementById('fileSize').innerHTML = fileSize;
        document.getElementById('fileType').innerHTML = file.type;

    }
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    alert(evt.target.responseText);
}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}

function uploadFile() {
    var csurl='http://127.0.0.1:8998/riak/images/'+document.getElementById('fileName').innerHTML;
    var url='http://localhost/riak-python-bootstrap-client/rest-proxy.php';


    console.log("URL : "+csurl);

    $.ajax({
        type: "PUT",
        url:url,
        contentType:document.getElementById('fileType').innerHTML,
        data:document.getElementById('fileBinary').innerHTML,
        beforeSend: function(xhr){xhr.setRequestHeader('X_CSURL_HEADER',csurl);},
        statusCode:{
            404:function(){
                alert('Page Not Found!');
            }
        },
        success: function(result) {
            console.log("SUCCESS! DATA : "+result);
            //self.content(result);
        },
        error: function(e) {
            console.log("ERROR : "+e);
        }});
}


