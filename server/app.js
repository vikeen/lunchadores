/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
  config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);

// Bootstrap Database
require('./database').connect(function (db) {
  require('./models')(db, function() {
    require('./config/express')(app);
    require('./routes')(app);

    if (config.seedDB) {
      require('./config/seed')();
    }
  });
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
