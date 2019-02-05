const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path'),
      morgan = require('morgan'),
      request = require('request'),
      db = require('./database.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//CREATE A NEW PROJECT
app.post('/api/projects', function(req,res){
  db.insertProject(req.body, function(err, project){
    if(err == 200){
      res.status(200).send(project);
    }else{
      res.status(404).send("Something went wrong", err);
    }
  });
});

//DELETE A PROJECTS
app.delete('/api/projects', function(req, res){
  var title = req.body.title;
  db.removeProject(req.body.clientId, function(err, project){
    if(err == 200){
      res.status(200).send(title);
    }else{
      res.status(404).send("Something went wrong", err);
    }
  });
});


//GET ALL PROJECTS
app.get('/api/projects', function(req,res) {
  db.getAllProject(function(err,projects){
    if(err == 200){
      res.status(200).send(projects);
    }else{
      res.status(404).send("Something went wrong", err);
    }
  });
});

//UPDATE PROJECT ACTIVE
app.put('/api/projects/:projektId/:active', function(req,res) {
  db.updateProject(req.params.projektId,req.params.active, function(err,project){
    if(err == 200){
      res.status(200).send(project);
    }else{
      res.status(404).send("Something went wrong", err);
    }
  });
});

//GET ISSUES FOR A PROJECT
app.get('/api/projects/:projektId/issues', function(req,res) {
  db.getIssues(req.params.projektId, function(err,issues){
    if(err == 200){
      res.status(200).send(issues);
    }
    else{
      res.status(404).send("Operation failed!", err);
    }
  });
});

app.listen(8080, function(){
  db.open();
  console.log("ready captain.");
});
