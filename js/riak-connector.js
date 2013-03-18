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
                    url: 'http://localhost/riak-python-bootstrap-client/rest-proxy.php?csurl=http://192.168.1.2:8998/buckets/'+self.selectedBucket()+'/keys?keys=true',
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
                var url='http://localhost/riak-python-bootstrap-client/rest-proxy.php?csurl=http://192.168.1.2:8998/buckets/'+self.selectedBucket()+'/keys/'+self.selectedKey();
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
            var url='http://localhost/riak-python-bootstrap-client/rest-proxy.php';
            if(self.newBucket()!=undefined && self.newKey().length==0 && self.newContent()!=undefined){
                console.log('RANDOM KEY STORE');
                var csurl='http://192.168.1.2:8998/riak/'+self.newBucket();
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
                    var csurl='http://192.168.1.2:8998/riak/'+self.newBucket()+'/'+self.newKey();
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

        };

        $.ajax({
            type: "GET",
            url: 'http://localhost/riak-python-bootstrap-client/rest-proxy.php?csurl=http://192.168.1.2:8998/buckets?buckets=true',
            dataType:"json",
            success: function(result) {
                console.log("SUCCESS! DATA : "+result.buckets);
                self.buckets(result.buckets);
            },
            error: function(e) {
                console.log("ERROR : "+ e.toString());
            }});
    };

    ko.applyBindings(new viewModel);
});