"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')


app.use(express.static(__dirname + '/../../public'));
app.use(express.static('../../index.html'));

app.use(express.static(path.join(__dirname,'../../index.html')));
app.use('/public', express.static(path.join(__dirname,'/../../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../../index.html'));
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
