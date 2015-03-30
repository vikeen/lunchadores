/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    orm = require("orm"),
    config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);

// Bootstrap Database
orm.connect(config.postgres.uri, function(err, db) {
  if (err) {
    return console.error('Connection error: ' + err);
  } else {
    require('./models')(db);
    require('./config/express')(app);
    require('./routes')(app);

    if (config.seedDB) {
      require('./config/seed');
    }
  }
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
