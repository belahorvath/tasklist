"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var request = require('request');

app.get('/api/projects/', function(req,res) {

  var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + req.query.id;

  request.get(newurl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);

    //Send data from get request as response back.
    res.send(body);
  });

});

app.post('/api/projects', function(req,res) {

  var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects';
console.log(req.body);
  request.post(newurl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log(res.body);
  });

});

app.listen(8080, function(){
  console.log("ready captain.");
});
