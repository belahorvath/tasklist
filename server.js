"use strict";
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
        var path = require('path')

app.use(express.static('public'));

app.listen(8080, function(){
  console.log("ready captain.");
});
