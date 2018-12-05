"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var request = require('request');

app.get('/api/projects', function(req,res) {
  //modify the url in any way you want
  var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects';
  request(newurl).pipe(res);
});

app.post('/api/projects', function(req,res) {
  //modify the url in any way you want
  var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects';
  
  request.post(newurl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
  });

});

app.listen(8080, function(){
  console.log("ready captain.");
});
