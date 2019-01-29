"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
var path = require('path')
var morgan = require('morgan');
var request = require('request');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "testPasswort",
  database: "tasklist",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//PROJECTS
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

//Projekt POST
app.post('/api/projects', function(req,res){
connection.query("INSERT INTO projekt (id, title, active, clientId) VALUES ("+req.body.id +",'" + req.body.title + "'," + req.body.active + ",'" + req.body.client_id + "')", function(err, rows, fields) {
connection.end();
  //Send back the body of the added Projekt is the database write was successfull.
  if (!err) {
    console.log('Query successfull.', );

    res.status(200).send(req.body);
  }else {
    //If the database write has failed send back an error.
    console.log('Error while performing Query.', err);
    res.status(404).send("Oh uh, something went wrong");
    }
  });
});

/*
app.post('/api/projects', function(req,res) {

var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects';
var headers = {
  "Content-Type" : 'application/json'
}
console.log(req.body);

  request.post({headers: headers, url: newurl, json : req.body}, function (error, response, body) {
    if(response.statusCode != 200){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    res.send(body);
  });

});



/*
//ISSUES
app.post('/api/projects/project_id/issues', function(req,res) {

var newurl = 'http://zhaw-issue-tracker-api.herokuapp.com/api/projects/'+ req.body.project_id +'/issues';
var headers = {
  "Content-Type" : 'application/json'
}
console.log(req.body);
  request.post({headers: headers, url: newurl, json : req.body}, function (error, response, body) {
/*
    if(response.statusCode != 200){
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
    }
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body', body);
    //res.send(body);
  });

  /* TEMPLATE GET with QUERY 13000
                $.ajax({
                    type: "GET",
                    url: '/api/projects',
                    data: {"id" : 13000},
                    dataType: 'json'
                  }).done(function(data){
                  console.log(data);
                  //this.projects.add(data);
                });

});

*/

app.listen(8080, function(){
  console.log("ready captain.");
});
