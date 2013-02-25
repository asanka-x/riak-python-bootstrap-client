/**
 * Created with JetBrains PhpStorm.
 * User: asanka
 * Date: 2/24/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var viewModel = {
        buckets : ko.observableArray(['France', 'Germany', 'Spain','Sri lanka','America']), // These are the initial options
        keys:ko.observableArray(['France', 'Germany', 'Spain','Sri lanka','America'])
    };

    $.ajax({
        url:'http://192.168.1.2:8998/buckets?buckets=true',
        type:'GET',
        dataType:'jsonp',
        jsonpCallback:'jsonpcallback'
    });
    function jsonpcallback(rtndata){
        console.log("DATA:"+data);
    };

    ko.applyBindings(viewModel);
});