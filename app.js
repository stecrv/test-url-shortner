var path    = require("path");
var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// micro library for to manage short link
var shortner = require("./shortner");

app.post('/',function(req,res){
    console.log('posting',/*req.params, req.headers,*/ req.body);
    shortner.addURL(req.body.url);
    res.send('create a resource');
    console.log(shortner.data);
});

app.get('/',function(req,res){
    console.log('get',req);
    res.send('send a resource');
});

app.use(express.static(__dirname + '/public'));

app.get('/index',function(req,res){
    res.sendFile(path.join(__dirname+'/public/_index.html'));
});

app.listen(4000);

console.log("Running at Port 4000");