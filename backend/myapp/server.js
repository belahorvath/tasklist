"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();

app.use(morgan('dev'));
app.use(express.static('../index.html'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var todos = [];

app.post('/todos', function(req, res) {
  todos.push(req.body.todo);

  res.format({
    'application/json': function() {
      res.status(200).json({'todo': req.body.todo});
    },
    'text/html': function() {
      res.redirect(301, '/');
    }});
});

app.get('/todos', function(req, res) {
  res.status(200).json({'todos': todos});
});

app.listen(8080, function(){
  console.log("ready captain.");
});
