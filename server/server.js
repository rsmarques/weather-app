var gzippo  = require('gzippo');
var express = require('express');
var morgan  = require('morgan');
var app     = express();

// loading routes
require('./routes')(app);

// loading angular project
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/../dist"));
app.listen(process.env.PORT || 5000);