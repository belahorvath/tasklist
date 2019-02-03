"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
var path = require('path')
var morgan = require('morgan');
var request = require('request');
var db = require('./database.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//GET ALL PROJECTS
app.get('/api/projects', function(req,res) {
  db.getAllProject(function(projects){
    res.status(200).send(projects);
  });
});

//UPDATE PROJECT ACTIVE
app.put('/api/projects/:projektId', function(req,res) {
  db.updateProject(req.params.projektId, function(project){
    res.status(200).send(project);
  });
});

//CREATE A NEW PROJECT
app.post('/api/projects', function(req,res){
connection.query("INSERT INTO projekt (title, active, clientId) VALUES ('" + req.body.title + "'," + req.body.active + ",'" + req.body.client_id + "')", function(err, rows, fields) {

  //Send back the body of the added Projekt is the database write was successfull.
  if (!err) {
    console.log('Query successfull.');
    connection.query("SELECT * FROM projekt WHERE clientId ='" + req.body.client_id+"'", function(err, results, fields){
    if(!err){
      console.log('Inner Query successfull.', );

      //Default active is false, check if Project is active and set "true".
      var active = false;
      if(results[0].active == 1){active = true};

      var tempProject = {
        "id" : results[0].id,
        "client_id": results[0].clientId,
        "title" : results[0].title,
        "active" : active
      };
      res.status(200).send(tempProject);
    }else{
      console.log('Error while performing the inner Query.', err);
      res.status(404).send("Ops, something went wrong! Now fuck off!");
      }
    });
  }else {
    //If the database write has failed send back an error.
    console.log('Error while performing the outer Query.', err);
    res.status(404).send("Ops, something went wrong! Now fuck off!");
    }
  });
});


//GET ISSUES FOR A PROJECT
app.get('/api/projects/:projektId/issues', function(req,res) {
  console.log(req.params.projektId)
  db.getIssues(req.params.projektId, function(issues){
    res.status(200).send(issues);
  });
  /*
  connection.query("SELECT * FROM issue WHERE projektID ='" + req.params.projektId + "'", function(err, results, fields){
    if(!err){
      console.log('Query successfull.');

    }else{
      console.log('Error while performing the Query.', err);
      res.status(404).send("Ops, something went wrong! Now fuck off!");
    }
  });
  */
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
  db.open();
  console.log("ready captain.");
});
