'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require("express"),
    winston = require("winston"),
    config = require('./config/environment')();

// Setup server
var app = express();
var server = require('http').createServer(app);

// Bootstrap Database
var db = require('./app/models');
require('./config/express')(app);
require('./app/routes')(app);

if (config.seedDB) {
    require('./config/seed')();
}

// Config Logging
winston.level = config.logging;

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
