var path    = require("path");
var express = require("express");
var app     = express();
var router =  express.Router();


app.post('/',function(req,res){
    console.log('posting');
    res.send('create a resource');
});

app.get('/',function(req,res){
    console.log('get');
    res.send('send a resource');
});

app.use(express.static(__dirname + '/public'));

app.get('/index',function(req,res){
    res.sendFile(path.join(__dirname+'/public/_index.html'));
});

app.listen(4000);

console.log("Running at Port 4000");