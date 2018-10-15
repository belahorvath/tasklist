"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')


app.use(express.static(__dirname + '/../../public'));
app.use(express.static('../../index.html'));
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../index.html'));
});
app.get('/public/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../public/css/style.css'));
});
app.get('/public/css/datepicker.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../public/css/datepicker.css'));
});
app.get('/backend/myapp/server.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/server.js'));
});
app.get('/public/javascript/datepicker.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../public/javascript/datepicker.js'));
});

app.listen(8080, function(){
  console.log("ready captain.");
});
