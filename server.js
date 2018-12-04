"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//Lokale liste auf dem Server
var projects = [];

//Projekte

app.post('/projects', function(req, res) {
  projects = req.body;
});

app.get('/projects', function(req, res) {
  console.log(projects);
  res.json(projects);
});


app.listen(8080, function(){
  console.log("ready captain.");
});
