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
                    dataType:"json",
                    success: function(result) {
                        console.log("SUCCESS! DATA : "+JSON.stringify(result));
                        self.content(JSON.stringify(result));
                    },
                    error: function(e) {
                        console.log("ERROR : "+e);
                    }});
            }

        });

        $.ajax({
            type: "GET",
            url: 'http://localhost/riak-python-bootstrap-client/rest-proxy.php?csurl=http://192.168.1.2:8998/buckets?buckets=true',
            dataType:"json",
            success: function(result) {
                console.log("SUCCESS! DATA : "+result.buckets);
                self.buckets(result.buckets);
            },
            error: function(e) {
                console.log("ERROR : "+e);
            }});
    };

    ko.applyBindings(new viewModel);
});