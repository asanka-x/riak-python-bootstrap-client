/**
 * Created with JetBrains PhpStorm.
 * User: asanka
 * Date: 2/24/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
var viewModel = function(){
    var self=this;
    var serviceUrl="http://localhost/riak-python-bootstrap-client/AjaxAccess.php";
    var proxyUrl="http://localhost/riak-python-bootstrap-client/rest-proxy.php";

    this.buckets = ko.observableArray(); // These are the initial options
    this.keys=ko.observableArray();
    this.selectedBucket=ko.observable();
    this.selectedKey=ko.observable("");
    this.content=ko.observable("");
    this.newBucket=ko.observable("");
    this.newKey=ko.observable("");
    this.newContent=ko.observable("");
    this.showBuckets=ko.observable(true);
    this.showKeys=ko.observable(false);
    this.showContent=ko.observable(false);

    this.bucketClicked=function(data){

        self.showBuckets(false);
        self.showKeys(true);
        self.showContent(false);
        console.log("BUCKET "+data);
        self.selectedBucket(data);
        /*        $.ajax({
         type: "GET",
         url: proxyUrl+'?csurl=http://127.0.0.1:8998/buckets/'+data+'/keys?keys=true',
         dataType:"json",
         success: function(result) {
         console.log("SUCCESS! DATA : "+result.keys);
         self.keys(result.keys);
         },
         error: function(e) {
         console.log("ERROR : "+ e);
         }}
         );*/

        $.ajax({
                type: "GET",
                url: serviceUrl+'?method=getUserBucketKeys&bucket='+data,
                dataType:'json',
                success: function(result) {
                    console.log("SUCCESS! DATA : "+result.keys);
                    self.keys(result.keys);
                },
                error: function(e) {
                    console.log("ERROR : "+ e);
                }}
        );
    };

    this.keyClicked=function(key){

        self.showBuckets(false);
        self.showKeys(false);
        self.showContent(true);
        console.log("BUCKET : "+self.selectedBucket()+" Key : "+key);
        self.content('');
        self.selectedKey(key);
        var url=proxyUrl+'?csurl=http://127.0.0.1:8998/buckets/'+self.selectedBucket()+'/keys/'+key;
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
                }}
        );


    };

    this.clearClicked=function(){
        self.newBucket('');
        self.newKey('');
        self.newContent('');
    };

    this.storeClicked=function(){
        if(self.newBucket()!=undefined && self.newKey().length==0 && self.newContent()!=undefined){
            console.log('RANDOM KEY STORE');
            var csurl='http://127.0.0.1:8998/riak/'+self.newBucket();
            $.ajax({
                type: "POST",
                url:proxyUrl,
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
                    url:proxyUrl,
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


                //Add User-Bucket-Key Mapping
                $.ajax({
                    type:'GET',
                    url:serviceUrl+'?method=addUserBucketKeyMapping&username=asanka&bucket='+self.newBucket()+'&key='+self.newKey(),
                    contentType:'application/json',
                    success:function(data){
                        console.log("Store Mapping :"+data);

                    },
                    error:function(e){
                        console.log("Store Mapping :"+e.message);
                    }
                });
            }else{

            }
        }
        this.getBucketList();
    };

    this.deleteClicked=function(){
        if(self.selectedBucket()!=undefined && self.selectedKey()!=undefined){
            console.log("BUCKET : "+self.selectedBucket()+" DELETE Key : "+self.selectedKey());
            var csurl='http://127.0.0.1:8998/riak/'+self.selectedBucket()+'/'+self.selectedKey();
            console.log("DELETE URL : "+csurl);
            $.ajax({
                type: "DELETE",
                url:proxyUrl,
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
                    self.getBucketList();
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
        self.showBuckets(true);
        self.showKeys(false);
        self.showContent(false);
        /*        $.ajax({
         type: 'GET',
         url: proxyUrl+'?csurl=http://127.0.0.1:8998/buckets?buckets=true',
         dataType:'json',
         success: function(result) {
         console.log("SUCCESS! DATA : "+result.buckets);
         self.buckets(result.buckets);
         },
         error: function(e) {
         console.log("ERROR : "+ e.toString());
         }}
         );*/

        $.ajax({
                type: "GET",
                url: serviceUrl+'?method=getUserBuckets',
                dataType:'json',
                success: function(result) {
                    self.buckets(result.buckets);
                    console.log("SUCCESS! USER BUCKETS : "+ result.buckets);
                },
                error: function(e) {
                    console.log("ERROR! USER BUCKETS : "+ e.toString());
                }}
        );
    };
};

var handleFileSelect=function(evt){
    var file = evt.target.files[0]; // FileList object

    // Loop through the FileList
    //for (var i = 0, f; f = files[i]; i++) {

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            // Print the contents of the file
            var span = document.createElement('span');
            span.innerHTML = ['<p>',e.target.result,'</p>'].join('');
            document.getElementById('list').insertBefore(span, null);
        };
    })(file);

    var fileSize = 0;
    if (file.size > 1024 * 1024)
        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

    document.getElementById('fileSize').innerHTML = fileSize;
    document.getElementById('fileType').innerHTML = file.type;

    // Read in the file
    //reader.readAsDataText(f,UTF-8);
    //reader.readAsDataURL(f);
    reader.readAsText(file);
    //}
};

$(document).ready(function(){
    var vm=new viewModel();
    ko.applyBindings(vm);

    vm.getBucketList();

    document.getElementById('files').addEventListener('change', handleFileSelect, false);
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
                //document.getElementById('fileBinary').innerHTML=e.target.result;
                console.log(e.target.result);
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
            }}
    );
}


