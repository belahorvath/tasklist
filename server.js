"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


/** FÜR MILESTONE 3

var projects = [];

app.post('/projects', function(req, res) {
  projects.push(req.body.project);
res.status(201).json({'project': projects});
    
  
   
});


app.get('/projects', function(req, res) {
  res.status(200).json({'project': projects});
}); 

**/
app.listen(8080, function(){
  console.log("ready captain.");
});
