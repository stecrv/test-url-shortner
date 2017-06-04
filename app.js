var path    = require("path");
var express = require("express");
var app     = express();
var bodyParser = require('body-parser');

// micro library for to manage short link
var shortner = require("./shortner");


// POST, create a resource
function defaultContentTypeMiddleware (req, res, next) {
    req.headers['content-type'] = 'application/json';
    //req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
};

app.use(defaultContentTypeMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/',function(req,res){
    //console.log('gepost',req.headers, req.params, req.body);
    res.send(shortner.addURL(req.body.url));
});
//END POST

// GET, get the resource and redirect
app.use(express.static(__dirname + '/public'));
app.get('/*',function(req,res){
    //console.log('get',req.headers, req.params, req.body);

    // test data
    // shortner.data.push({"short_url":"/91eklx","url":"http://www.farmdrop.com"});

    if(req.params && req.params[0] ){
        if(req.params[0]=='index'){ //Front end page
            res.sendFile(path.join(__dirname+'/public/index.html'));
        }else if(l = shortner.getURL("/" + req.params[0].toString() )) {
            res.redirect(301, l);
        }else{
            res.status(404);
            res.send('page not found (1)');
        }
    }else {
        res.status(404);
        res.send('page not found (2)');
    }
});
//END GET

app.listen(4000);

console.log("Running at Port 4000");