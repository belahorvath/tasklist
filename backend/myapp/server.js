"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();
        var path = require('path')



app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'../../index.html')));
app.use('/public', express.static(path.join(__dirname,'/../../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../../index.html'));
});

app.listen(8080, function(){
  console.log("ready captain.");
});
