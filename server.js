"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
var path = require('path')
var request = require('request');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/projects/', function(req,res) {

  var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + req.query.id;

  request.get(newurl, function (error, response, body) {
    if(response.statusCode != 200){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    res.send(body);

  });

});

app.post('/api/projects', function(req,res) {

var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects';
var headers = {
  "Content-Type" : 'application/json'
}

  request.post({headers: headers, url: newurl, json : req.body}, function (error, response, body) {
    if(response.statusCode != 200){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    res.send(body);
  });

});

app.listen(8080, function(){
  console.log("ready captain.");
});
