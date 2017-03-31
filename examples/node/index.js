'use strict';

require('source-map-support').install();
var app = require('./app.instrumented');

app.square('Hello World!');
