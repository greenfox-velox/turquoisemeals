'use strict';

var newApp = require('./server');
var connect = require('./connect');

var app = newApp(connect.connection);

app.listen(3000);
